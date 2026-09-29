import sharp from "sharp";

/**
 * Converts and processes any uploaded cover image (JPG, PNG, or WebP)
 * into an optimized Open Graph compliant image (1200x630 dimensions).
 */
export async function processCoverImageToOg(inputBuffer: Buffer): Promise<{ buffer: Buffer; fileName: string; mimeType: string }> {
  const processedBuffer = await sharp(inputBuffer)
    .rotate()
    .resize(1200, 630, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: 88 })
    .toBuffer();

  return {
    buffer: processedBuffer,
    fileName: `og-cover-${Date.now()}.webp`,
    mimeType: "image/webp",
  };
}
