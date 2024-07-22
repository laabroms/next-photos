"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  deleteCategory,
  toggleCategoryVisibility,
} from "../../_actions/categories";

export function ActiveToggleDropdownItem({
  id,
  isVisible,
}: {
  id: string;
  isVisible: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleCategoryVisibility(id, !isVisible);
          router.refresh();
        });
      }}
    >
      {isVisible ? "Hide" : "Show"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCategory(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
