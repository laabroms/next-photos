import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { PATHS } from "@/utils/navigation";
import { PhotosTable } from "../../photos/_components/PhotoTable";

export default async function AdminCategoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [category, photos] = await Promise.all([
    db.category.findUnique({ where: { id } }),
    db.photo.findMany({
      where: {
        categoryId: id,
      },
      select: {
        id: true,
        name: true,
        imageId: true,
        isVisible: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!category) {
    return "Category not found";
  }

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <PageHeader>Category: {category.name}</PageHeader>
        <Button asChild>
          <Link href={`${PATHS.ADMIN.PHOTOS.NEW}?categoryId=${category.id}`}>
            Add photo to {category.name}
          </Link>
        </Button>
      </div>
      <PhotosTable photos={photos} />
    </>
  );
}
