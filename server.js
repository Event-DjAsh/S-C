// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  const DATA_DIR = path.join(__dirname, "data");
  const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  app.get("/api/content", (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const fileContent = fs.readFileSync(CONTENT_FILE, "utf-8");
        return res.json(JSON.parse(fileContent));
      }
      return res.json(null);
    } catch (err) {
      console.error("Error reading published site-content.json:", err);
      return res.status(500).json({ error: "Failed to read published content" });
    }
  });
  app.post("/api/content", (req, res) => {
    try {
      const newContent = req.body;
      if (!newContent) {
        return res.status(400).json({ error: "No content payload received" });
      }
      const publishedTimestamp = (/* @__PURE__ */ new Date()).toISOString();
      const payload = {
        ...newContent,
        lastPublishedAt: publishedTimestamp
      };
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(payload, null, 2), "utf-8");
      console.log(`[CMS] Content successfully published to live website at ${publishedTimestamp}`);
      return res.json({ success: true, lastPublishedAt: publishedTimestamp });
    } catch (err) {
      console.error("Error writing to site-content.json:", err);
      return res.status(500).json({ error: "Failed to save published content" });
    }
  });
  app.post("/api/inquiries", (req, res) => {
    try {
      const inquiry = req.body;
      let currentContent = {};
      if (fs.existsSync(CONTENT_FILE)) {
        try {
          currentContent = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
        } catch (e) {
          currentContent = {};
        }
      }
      const inquiries = currentContent.inquiries || [];
      inquiries.unshift({
        ...inquiry,
        id: inquiry.id || "inq_" + Date.now(),
        submittedAt: inquiry.submittedAt || (/* @__PURE__ */ new Date()).toLocaleString(),
        status: "new"
      });
      currentContent.inquiries = inquiries;
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(currentContent, null, 2), "utf-8");
      return res.json({ success: true });
    } catch (err) {
      console.error("Error writing inquiry:", err);
      return res.status(500).json({ error: "Failed to record inquiry" });
    }
  });
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sound & Celebration full-stack server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
