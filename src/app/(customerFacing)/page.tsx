import { CategoryCard } from "@/components/CategoryCard";
import { PhotoCardSkeleton } from "@/components/PhotoCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const getCategories = cache(() => {
  return db.category.findMany({
    where: { isVisible: true, photos: { some: { isVisible: true } } },
    orderBy: { displayOrder: "asc" },
  });
}, ["/", "getCategories"]);

export default function CategoriesPage() {
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
        <CategoriesSuspense />
      </Suspense>
    </div>
  );
}

async function CategoriesSuspense() {
  const products = await getCategories();

  return products?.map((product) => (
    <CategoryCard key={product.id} {...product} />
  ));
}
