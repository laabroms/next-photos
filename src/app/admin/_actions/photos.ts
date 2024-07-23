"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/cloudinary/utils";
import { ROUTES } from "@/navigation/routes";
import { isRedirectError } from "next/dist/client/components/redirect";
import { imageSchema } from "./schemas";

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
  categoryId: z.string().min(1),
});

export async function addPhoto(
  selectedCategoryId: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const image = data.image as File;
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const imageId = crypto.randomUUID();

  try {
    const uploadResult = await uploadImageToCloudinary(
      buffer,
      imageId,
      "photo"
    );

    await db.photo.create({
      data: {
        name: data.name,
        description: data.description || "",
        imageId: uploadResult.public_id,
        categoryId: data.categoryId,
        height: uploadResult.height,
        width: uploadResult.width,
      },
    });

    revalidatePaths();
    redirect(
      selectedCategoryId
        ? ROUTES.ADMIN.CATEGORIES.ID.LINK(selectedCategoryId)
        : ROUTES.ADMIN.PHOTOS.BASE.PATH
    );
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    console.error("Failed to upload image:", error);
    return error.message || "Failed to upload image";
  }
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function updatePhoto(
  id: string,
  selectedCategoryId: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const photo = await db.photo.findUnique({ where: { id } });

  if (!photo) return notFound();

  let imageId = photo.imageId;

  let height = photo.height;
  let width = photo.width;

  if (data.image && data.image.size > 0) {
    // Upload new image
    const arrayBuffer = await data.image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const newPhotoId = crypto.randomUUID();

    try {
      await deleteImageFromCloudinary(imageId);
      const uploadResult = await uploadImageToCloudinary(
        buffer,
        newPhotoId,
        "category"
      );
      imageId = uploadResult.public_id;
      height = uploadResult.height;
      width = uploadResult.width;
    } catch (error: any) {
      console.error("Failed to upload image:", error);
      return error.message || "Failed to upload";
    }
  }

  await db.photo.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imageId,
      height,
      width,
    },
  });

  revalidatePaths();

  redirect(
    selectedCategoryId
      ? ROUTES.ADMIN.CATEGORIES.ID.LINK(selectedCategoryId)
      : ROUTES.ADMIN.PHOTOS.BASE.PATH
  );
}

export async function togglePhotoVisibility(id: string, isVisible: boolean) {
  await db.photo.update({ where: { id }, data: { isVisible } });

  revalidatePaths();
}

export async function deletePhoto(id: string) {
  const photo = await db.photo.delete({ where: { id } });

  if (photo === null) return notFound();

  deleteImageFromCloudinary(photo.imageId);
  revalidatePaths();
}

const revalidatePaths = () => {
  revalidatePath(ROUTES.HOME.PATH);
  revalidatePath(ROUTES.CATEGORY.PATH, "page");
  revalidatePath(ROUTES.ADMIN.CATEGORIES.ID.PATH, "page");
  revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH, "page");
  revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
  revalidatePath(ROUTES.ADMIN.PHOTOS.BASE.PATH);
};
