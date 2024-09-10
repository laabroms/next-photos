import sharp from "sharp";

export async function compressImage(
  buffer: Uint8Array,
  maxSizeInBytes: number = 10 * 1024 * 1024 // 10 MB
): Promise<Buffer> {
  let quality = 80;
  let compressedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();

  while (compressedBuffer.length > maxSizeInBytes && quality > 10) {
    quality -= 10;
    compressedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();
  }

  if (compressedBuffer.length > maxSizeInBytes) {
    throw new Error("Unable to compress image to desired size");
  }

  return compressedBuffer;
}
