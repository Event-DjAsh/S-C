/**
 * Utility to process, optimize, and resize photos uploaded directly from the laptop.
 * Converts raw camera/phone photos (often 5MB - 20MB) into high-fidelity,
 * web-optimized Data URLs (~120KB - 250KB) so multiple photos can be saved
 * without exceeding browser storage quotas or causing slowdowns.
 */

export interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function optimizeImageFromLaptop(
  file: File, 
  options: OptimizeOptions = {}
): Promise<string> {
  const { maxWidth = 1600, maxHeight = 1200, quality = 0.85 } = options;

  // Read file as base64 data url first
  const rawDataUrl = await readFileAsDataURL(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate constrained dimensions preserving aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      // Draw onto canvas for compression
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback to raw data url if canvas not supported
        resolve(rawDataUrl);
        return;
      }

      // High quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as web-friendly JPEG
      const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(optimizedDataUrl);
    };

    img.onerror = () => {
      reject(new Error(`Failed to process image: ${file.name}`));
    };

    img.src = rawDataUrl;
  });
}

/**
 * Optimizes a list of Files selected from laptop in parallel with safety checks
 */
export async function optimizeMultiplePhotos(
  files: FileList | File[],
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> {
  const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
  const total = fileArray.length;
  let completed = 0;

  const results: string[] = [];

  for (const file of fileArray) {
    try {
      const optimized = await optimizeImageFromLaptop(file);
      results.push(optimized);
    } catch (err) {
      console.error('Error optimizing photo:', err);
    }
    completed++;
    if (onProgress) {
      onProgress(completed, total);
    }
  }

  return results;
}
