import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.photo.findUnique({
    where: { id },
    select: { imageUrl: true, name: true },
  });

  if (!product) return notFound();

  const { size } = await fs.stat(product.imageUrl);
  const file = await fs.readFile(product.imageUrl);
  const extension = product.imageUrl.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
