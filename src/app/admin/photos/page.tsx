import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { PATHS } from "@/utils/navigation";
import { PhotosTable } from "./_components/PhotoTable";

export default async function AdminPhotosPage() {
  const photos = await db.photo.findMany({
    select: {
      id: true,
      name: true,
      imageId: true,
      isVisible: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <PageHeader>Photos</PageHeader>
        <Button asChild>
          <Link href={PATHS.ADMIN.PHOTOS.NEW}>Add Photo</Link>
        </Button>
      </div>
      <PhotosTable photos={photos} />
    </>
  );
}
