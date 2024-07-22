import PageHeader from "@/components/PageHeader";
import { PhotoForm } from "../_components/PhotoForm";
import db from "@/db/db";

async function getCategories() {
  const data = await db.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return data;
}

export default async function NewProductPage({ params }: { params: any }) {
  const categories = await getCategories();
  return (
    <>
      <PageHeader>Add Photo</PageHeader>
      <PhotoForm categories={categories} />
    </>
  );
}
