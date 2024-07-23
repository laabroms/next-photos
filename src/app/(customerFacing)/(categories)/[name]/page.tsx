import { ImageGallery } from "@/components/ImageGallery";
import { PhotoCard, PhotoCardSkeleton } from "@/components/PhotoCard";
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
            width: true,
            height: true,
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
    <div>
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

const widths = [400, 800, 1200];

const ratios = [16 / 9, 32 / 9, 48 / 9, 64 / 9];

async function CategoriesSuspense({ name }: { name: string }) {
  const data = await getPhotosByCategory(name);

  if (data?.photos.length === 0) {
    return "No photos found";
  }

  const formattedImages = data!.photos.map((photo) => ({
    ...photo,
    aspect_ratio:
      photo.width && photo.height ? photo.width / photo.height : 16 / 9,
  }));

  console.log(data);
  console.log(formattedImages);

  return (
    <ImageGallery widths={widths} ratios={ratios} images={formattedImages} />
  );

  return data?.photos?.map((photo) => <PhotoCard key={photo.id} {...photo} />);
}
