import PageHeader from "@/components/PageHeader";
import { PhotoForm } from "../../_components/PhotoForm";
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
async function getPhoto(id: string) {
  const data = await db.photo.findUnique({
    where: { id },
  });
  return data;
}

export default async function PhotoEditPage({ params }: { params: any }) {
  const [categories, photo] = await Promise.all([
    getCategories(),
    getPhoto(params.id),
  ]);
  return (
    <>
      <PageHeader>Add Photo</PageHeader>
      <PhotoForm categories={categories} photo={photo} />
    </>
  );
}
