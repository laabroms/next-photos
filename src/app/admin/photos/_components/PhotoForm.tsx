"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { Category, Photo } from "@prisma/client";
import CloudinaryImage from "@/components/CloudinaryImage/CloudinaryImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPhoto, updatePhoto } from "../../_actions/photos";
import { SubmitButton } from "@/components/SubmitButton";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

export function PhotoForm({
  photo,
  categories,
}: {
  photo?: Photo | null;
  categories: Pick<Category, "name" | "id">[];
}) {
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");

  const [categoryId, setCategoryId] = useState<string>(
    photo?.categoryId || selectedCategoryId || ""
  );

  const [error, action] = useFormState(
    photo
      ? updatePhoto.bind(null, photo.id, categoryId)
      : addPhoto.bind(null, categoryId),
    {}
  );

  console.log(categories);

  return (
    <form action={action} className="space-y-8 mt-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={photo?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={photo?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={!photo} />
        {!!photo && (
          <CloudinaryImage
            imageId={photo.imageId}
            alt={photo.name}
            height={200}
            width={200}
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Select
          name="categoryId"
          value={categoryId}
          onValueChange={(val) => setCategoryId(val)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {!!categories &&
              categories.map((category) => (
                <SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {error.categoryId && (
          <div className="text-destructive">{error.categoryId}</div>
        )}
      </div>
      <div className="space-y-2">
        <SubmitButton />
      </div>
    </form>
  );
}
