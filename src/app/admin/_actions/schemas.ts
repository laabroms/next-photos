import { MAX_IMAGE_FILE_SIZE } from "@/cloudinary/utils";
import { z } from "zod";

export const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "File must be an image",
  })
  .refine((file) => file.size <= MAX_IMAGE_FILE_SIZE, {
    message: `File size must not exceed ${MAX_IMAGE_FILE_SIZE / 1024 / 1024}MB`,
  });
