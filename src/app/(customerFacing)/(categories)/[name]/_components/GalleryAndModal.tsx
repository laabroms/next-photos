"use client";
import { TableImage } from "../page";
import { useEffect, useMemo, useRef } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLastViewedPhoto } from "@/hooks/useLastViewedPhoto";
import PhotoModal from "@/components/PhotoModal/PhotoModal";

const widths = [400, 600, 800, 1000];
const ratios = [1, 2.5, 3, 3, 4];

export const GalleryAndModal = ({ photos }: { photos: TableImage[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const photoId = searchParams.get("photoId");

  const lastViewedPhotoRef = useRef<HTMLSpanElement>(null);

  const handleModalOpen = (imageId: string) => {
    router.replace(`${pathname}?${searchParams.toString()}&photoId=${imageId}`);
  };

  const formattedImages = useMemo(
    () =>
      photos.map((photo, index) => ({
        ...photo,
        aspect_ratio:
          photo.width && photo.height ? photo.width / photo.height : 16 / 9,
        index,
      })),
    [photos]
  );

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const onModalClose = (photoId: string) => {
    setLastViewedPhoto(photoId);
  };

  return (
    <>
      {photoId && (
        <PhotoModal photos={formattedImages} onClose={onModalClose} />
      )}
      <ImageGallery
        widths={widths}
        ratios={ratios}
        images={formattedImages}
        gap="2px"
        onImageClick={handleModalOpen}
        photoRef={lastViewedPhotoRef}
        lastViewedPhotoId={lastViewedPhoto}
      />
    </>
  );
};
