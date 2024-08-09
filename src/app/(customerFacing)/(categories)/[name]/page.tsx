import { PhotoCardSkeleton } from "@/components/PhotoCard";
import db from "@/db/db";
import { Photo } from "@prisma/client";
import React, { Suspense } from "react";
import { GalleryAndModal } from "./_components/GalleryAndModal";

const getPhotosByCategory = (categoryName: string) => {
  return db.category.findFirst({
    where: { name: categoryName, isVisible: true },
    select: {
      photos: {
        select: {
          id: true,
          name: true,
          imageId: true,
          width: true,
          height: true,
        },
        where: { isVisible: true },
        orderBy: { displayOrder: "asc" },
      },
    },
  });
};

export type TableImage = Pick<
  Photo,
  "name" | "imageId" | "height" | "width" | "id"
>;

export default function SelectedCategoryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
        </div>
      }
    >
      <CategoriesSuspense {...{ name: decodeURIComponent(name) }} />
    </Suspense>
  );
}

async function CategoriesSuspense({ name }: { name: string }) {
  const data = await getPhotosByCategory(name);

  if (data?.photos.length === 0) {
    return "No photos found";
  }

  return <GalleryAndModal photos={data!.photos} />;
}
