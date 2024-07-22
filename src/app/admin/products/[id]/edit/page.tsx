import db from "@/db/db";
import PageHeader from "@/components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.photo.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
