"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deletePhoto, togglePhotoVisibility } from "../../_actions/photos";

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
          await togglePhotoVisibility(id, !isVisible);
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
  disabled = false,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deletePhoto(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
