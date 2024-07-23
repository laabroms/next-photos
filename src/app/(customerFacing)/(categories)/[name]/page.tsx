import { CategoryCard } from "@/components/CategoryCard";
import { PhotoCard, PhotoCardSkeleton } from "@/components/PhotoCard";
import { ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import React, { Suspense } from "react";

const getPhotosByCategory = cache(
  (name) => {
    return db.category.findFirst({
      where: { name },
      select: {
        photos: {
          select: {
            id: true,
            name: true,
            imageId: true,
            isVisible: true,
          },
        },
      },
    });
  },
  ["getPhotosByCategory", "/categories/[name]"]
);

export default function SelectedCategoryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <PhotoCardSkeleton />
            <PhotoCardSkeleton />
            <PhotoCardSkeleton />
            <PhotoCardSkeleton />
            <PhotoCardSkeleton />
            <PhotoCardSkeleton />
          </>
        }
      >
        <CategoriesSuspense {...{ name }} />
      </Suspense>
    </div>
  );
}

async function CategoriesSuspense({ name }: { name: string }) {
  const data = await getPhotosByCategory(name);

  return data?.photos?.map((photo) => <PhotoCard key={photo.id} {...photo} />);
}
