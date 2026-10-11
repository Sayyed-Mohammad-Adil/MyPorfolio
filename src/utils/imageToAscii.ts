/**
 * Client-side implementation matching the `image-to-ascii` specification.
 * Converts image pixels into full RGB colored ASCII art using Canvas pixel matrix.
 */

export interface ImageToAsciiOptions {
  size?: {
    width?: number;
    height?: number;
  };
  chars?: string | string[];
  colored?: boolean;
  contrast?: number;
}

export interface AsciiPixel {
  c: string;
  col: string;
}

const DEFAULT_CHARS = " .'`,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

/**
 * Converts an image URL to an ASCII pixel matrix matching the `image-to-ascii` format
 */
export async function imageToAscii(
  imgSource: string | HTMLImageElement,
  options: ImageToAsciiOptions = {}
): Promise<AsciiPixel[][]> {
  return new Promise((resolve, reject) => {
    const img = typeof imgSource === 'string' ? new Image() : imgSource;
    if (typeof imgSource === 'string') {
      img.crossOrigin = 'Anonymous';
      img.src = imgSource;
    }

    const process = () => {
      try {
        const width = options.size?.width || 50;
        // In monospace fonts, character aspect ratio is ~0.55
        const aspect = img.height / img.width;
        const height = options.size?.height || Math.round(width * aspect * 0.55);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context not available');
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        const chars = options.chars || DEFAULT_CHARS;
        const matrix: AsciiPixel[][] = [];

        for (let y = 0; y < height; y++) {
          const row: AsciiPixel[] = [];
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Perceived luminance
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const charIdx = Math.floor((lum / 255) * (chars.length - 1));
            const char = chars[charIdx] || ' ';
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

            row.push({
              c: char,
              col: hex,
            });
          }
          matrix.push(row);
        }

        resolve(matrix);
      } catch (err) {
        reject(err);
      }
    };

    if (img.complete && img.naturalWidth !== 0) {
      process();
    } else {
      img.onload = () => process();
      img.onerror = (err) => reject(err);
    }
  });
}
