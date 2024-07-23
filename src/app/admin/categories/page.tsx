import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/CategoryActions";
import { ROUTES } from "@/navigation/routes";
import CloudinaryImage from "@/components/CloudinaryImage/CloudinaryImage";

export default function AdminCategoriesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <PageHeader>Categories</PageHeader>
        <Button asChild>
          <Link href={ROUTES.ADMIN.CATEGORIES.NEW.PATH}>Add Category</Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  );
}

async function CategoriesTable() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      imageId: true,
      isVisible: true,
      _count: { select: { photos: true } },
    },
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) return <p>No Categories Found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Visible</span>
          </TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Photos</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              {category.isVisible ? (
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
              <CloudinaryImage imageId={category.imageId} alt={category.name} />
            </TableCell>
            <TableCell>
              <Link
                href={ROUTES.ADMIN.CATEGORIES.ID.LINK(category.id)}
                className="text-blue-600 hover:text-blue-500"
              >
                {category.name}
              </Link>
            </TableCell>
            <TableCell>{category._count.photos}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.ADMIN.CATEGORIES.EDIT.LINK(category.id)}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ActiveToggleDropdownItem
                    id={category.id}
                    isVisible={category.isVisible}
                  />
                  <DeleteDropdownItem
                    id={category.id}
                    disabled={category._count.photos > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
