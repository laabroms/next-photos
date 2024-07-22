import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";

export const MAX_IMAGE_FILE_SIZE = 10485760; // 10MB in bytes

export async function uploadImageToCloudinary(
  buffer: Uint8Array,
  imageId: string,
  tag: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: [tag],
          public_id: `LucasAbromsPhotography/${tag}/${imageId}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!);
          }
        }
      )
      .end(buffer);
  });
}

export async function deleteImageFromCloudinary(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(publicId, { resource_type: "image" })
      .then(resolve)
      .catch(reject);
  });
}
