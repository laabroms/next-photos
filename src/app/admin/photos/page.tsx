import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { ROUTES } from "@/navigation/routes";
import { PhotosTable } from "./_components/PhotoTable";

export default async function AdminPhotosPage() {
  const photos = await db.photo.findMany({
    select: {
      id: true,
      name: true,
      imageId: true,
      isVisible: true,
      displayOrder: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { displayOrder: "asc" },
  });
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <PageHeader>Photos</PageHeader>
        <Button asChild>
          <Link href={ROUTES.ADMIN.PHOTOS.NEW.PATH}>Add Photo</Link>
        </Button>
      </div>
      <PhotosTable photos={photos} />
    </>
  );
}
