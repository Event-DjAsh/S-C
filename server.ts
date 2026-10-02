import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  
  // High body-parser limit (50MB) to allow multiple high-resolution photos
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Ensure data directory exists
  const DATA_DIR = path.join(__dirname, 'data');
  const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // GET /api/content - Returns published website content
  app.get('/api/content', (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const fileContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
        return res.json(JSON.parse(fileContent));
      }
      return res.json(null);
    } catch (err) {
      console.error('Error reading published site-content.json:', err);
      return res.status(500).json({ error: 'Failed to read published content' });
    }
  });

  // POST /api/content - Publishes updated website content to live visitors
  app.post('/api/content', (req, res) => {
    try {
      const newContent = req.body;
      if (!newContent) {
        return res.status(400).json({ error: 'No content payload received' });
      }

      const publishedTimestamp = new Date().toISOString();
      const payload = {
        ...newContent,
        lastPublishedAt: publishedTimestamp
      };

      fs.writeFileSync(CONTENT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
      console.log(`[CMS] Content successfully published to live website at ${publishedTimestamp}`);
      return res.json({ success: true, lastPublishedAt: publishedTimestamp });
    } catch (err) {
      console.error('Error writing to site-content.json:', err);
      return res.status(500).json({ error: 'Failed to save published content' });
    }
  });

  // POST /api/inquiries - Captures booking leads from customer inquiry form
  app.post('/api/inquiries', (req, res) => {
    try {
      const inquiry = req.body;
      let currentContent: any = {};
      if (fs.existsSync(CONTENT_FILE)) {
        try {
          currentContent = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
        } catch (e) {
          currentContent = {};
        }
      }
      const inquiries = currentContent.inquiries || [];
      inquiries.unshift({
        ...inquiry,
        id: inquiry.id || 'inq_' + Date.now(),
        submittedAt: inquiry.submittedAt || new Date().toLocaleString(),
        status: 'new'
      });
      currentContent.inquiries = inquiries;
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(currentContent, null, 2), 'utf-8');
      return res.json({ success: true });
    } catch (err) {
      console.error('Error writing inquiry:', err);
      return res.status(500).json({ error: 'Failed to record inquiry' });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sound & Celebration full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
