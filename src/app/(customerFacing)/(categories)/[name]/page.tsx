import { ImageGallery } from "@/components/ImageGallery";
import { PhotoCard, PhotoCardSkeleton } from "@/components/PhotoCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import React, { Suspense } from "react";

// const getPhotosByCategory = cache(
//   (name) => {
//     return db.category.findFirst({
//       where: { name },
//       select: {
//         photos: {
//           select: {
//             id: true,
//             name: true,
//             imageId: true,
//             isVisible: true,
//           },
//         },
//       },
//     });
//   },
//   ["getPhotosByCategory", "/categories/[name]"]
// );
const getPhotosByCategory = (name: string) => {
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
};

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

const widths = [400, 600, 800, 1000];
const ratios = [1, 2.5, 3, 3, 4];

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

  return (
    <ImageGallery
      widths={widths}
      ratios={ratios}
      images={formattedImages}
      gap="2px"
    />
  );
}
