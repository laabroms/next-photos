import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./PhotoActions";
import CloudinaryImage from "@/components/CloudinaryImage/CloudinaryImage";
import { Photo } from "@prisma/client";
import { ROUTES } from "@/navigation/routes";
import Link from "next/link";

type TablePhoto = Pick<Photo, "id" | "name" | "imageId" | "isVisible"> & {
  category: { name: string };
};

export async function PhotosTable({ photos }: { photos: TablePhoto[] }) {
  if (photos.length === 0) return <p>No Photos Found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Visible</span>
          </TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {photos.map((photo) => (
          <TableRow key={photo.id}>
            <TableCell>
              {photo.isVisible ? (
                <>
                  <CheckCircle2 />
                  <span className="sr-only">Visible</span>
                </>
              ) : (
                <>
                  <XCircle className="stroke-destructive" />
                  <span className="sr-only">Hidden</span>
                </>
              )}
            </TableCell>
            <TableCell>
              <CloudinaryImage
                imageId={photo.imageId}
                alt={photo.name}
                height={200}
                width={200}
              />
            </TableCell>
            <TableCell>{photo.name}</TableCell>
            <TableCell>{photo.category.name}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.ADMIN.PHOTOS.EDIT.LINK(photo.id)}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ActiveToggleDropdownItem
                    id={photo.id}
                    isVisible={photo.isVisible}
                  />
                  <DeleteDropdownItem id={photo.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
