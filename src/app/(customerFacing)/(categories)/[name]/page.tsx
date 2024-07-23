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
        <CategoriesSuspense {...{ name: decodeURIComponent(name) }} />
      </Suspense>
    </div>
  );
}

const widths = [500, 1000, 2000];
const ratios = [2.2, 4, 6, 8];

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
