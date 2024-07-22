import db from "@/db/db";
import PageHeader from "@/components/PageHeader";
import { CategoryForm } from "../../_components/CategoryForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const category = await db.category.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <CategoryForm category={category} />
    </>
  );
}
