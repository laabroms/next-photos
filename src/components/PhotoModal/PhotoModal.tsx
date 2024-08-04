"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { TableImage } from "@/app/(customerFacing)/(categories)/[name]/page";
import SharedPhotoModal from "./SharedPhotoModal";
import useKeypress from "@/hooks/useKeyPress";

export default function PhotoModal({
  photos,
  onClose,
}: {
  photos: TableImage[];
  onClose?: (photoId: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // let's get the pathname to make the component reusable - could be used anywhere in the project

  let overlayRef = useRef<HTMLElement | null>(null);

  const photoId = searchParams.get("photoId") ?? "";

  const index = useMemo(
    () => photos.findIndex((p) => p.id === photoId),
    [photoId, photos]
  );

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    onClose?.(photoId);
    router.push(pathname);
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);

    const query = photos[newVal].id;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("photoId", query);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  }

  useKeypress("ArrowRight", () => {
    console.log("right");
    if (index + 1 < photos.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    console.log("right");

    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <Dialog
      static
      open={true}
      onClose={() => {
        handleClose();
      }}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <DialogPanel
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SharedPhotoModal
          index={curIndex}
          direction={direction}
          photos={photos}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
        />
      </DialogPanel>
    </Dialog>
  );
}
