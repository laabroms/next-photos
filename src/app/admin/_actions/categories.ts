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
});

export async function addCategory(prevState: unknown, formData: FormData) {
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
      "category"
    );
    await db.category.create({
      data: {
        name: data.name,
        description: data.description || "",
        imageId: uploadResult.public_id,
      },
    });

    revalidatePath(ROUTES.HOME.PATH);
    revalidatePath(ROUTES.CATEGORY.PATH);
    revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
    redirect(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    console.error("Failed to upload image:", error);
    return error.message || "Failed to upload image";
  }
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function updateCategory(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const category = await db.category.findUnique({ where: { id } });

  if (!category) return notFound();

  let imageId = category.imageId;

  if (data.image && data.image.size > 0) {
    // Upload new image
    const arrayBuffer = await data.image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const newId = crypto.randomUUID();

    try {
      await deleteImageFromCloudinary(imageId);
      const uploadResult = await uploadImageToCloudinary(
        buffer,
        newId,
        "category"
      );
      imageId = uploadResult.public_id;
    } catch (error: any) {
      console.error("Failed to upload image:", error);
      throw new Error(error.message || "Failed to upload");
    }
  }

  await db.category.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imageId,
    },
  });

  revalidatePath(ROUTES.HOME.PATH);
  revalidatePath(ROUTES.CATEGORY.PATH);
  revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH);

  redirect(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
}

export async function toggleCategoryVisibility(id: string, isVisible: boolean) {
  await db.category.update({ where: { id }, data: { isVisible } });

  revalidatePath(ROUTES.HOME.PATH);
  revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
}

export async function deleteCategory(id: string) {
  const category = await db.category.delete({ where: { id } });

  if (category === null) return notFound();

  deleteImageFromCloudinary(category.imageId);
  revalidatePath(ROUTES.HOME.PATH);
  revalidatePath(ROUTES.CATEGORY.PATH);
  revalidatePath(ROUTES.ADMIN.CATEGORIES.BASE.PATH);
}
