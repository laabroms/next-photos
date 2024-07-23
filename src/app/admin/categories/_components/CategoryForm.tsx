"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { Category } from "@prisma/client";
import { addCategory, updateCategory } from "../../_actions/categories";
import CloudinaryImage from "@/components/CloudinaryImage/CloudinaryImage";
import { SubmitButton } from "@/components/SubmitButton";

export function CategoryForm({ category }: { category?: Category | null }) {
  const [error, action] = useFormState(
    category ? updateCategory.bind(null, category.id) : addCategory,
    {}
  );

  const isErrorString = typeof error === "string";

  return (
    <form action={action} className="space-y-8 mt-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={category?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={category?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={!category} />
        {!!category && (
          <CloudinaryImage imageId={category.imageId} alt={category.name} />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <div className="space-y-2">
        {!!error && isErrorString && (
          <div className="text-destructive">{error}</div>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
