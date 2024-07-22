"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/photos", { recursive: true });
  const imageUrl = `/photos/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imageUrl}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      photoId: data.photoId,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.photo.findUnique({ where: { id } });

  if (!product) return notFound();

  let imageUrl = product.imageUrl;
  if (!!data.file && data.file.size > 0) {
    await fs.unlink(`public${product.imageUrl}`);
    imageUrl = `/products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(
      `public${imageUrl}`,
      Buffer.from(await data.file.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imageUrl: imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function togglePhotoAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const photo = await db.photo.delete({ where: { id } });

  if (photo === null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}
