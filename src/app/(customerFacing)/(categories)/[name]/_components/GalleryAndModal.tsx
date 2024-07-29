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

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  //   useEffect(() => {
  //     // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
  //     if (lastViewedPhoto && !photoId) {
  //       lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
  //       setLastViewedPhoto(null);
  //     }
  //   }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const handleModalOpen = (imageId: string) => {
    router.replace(`${pathname}?${searchParams.toString()}&photoId=${imageId}`);
  };

  const formattedImages = useMemo(
    () =>
      photos.map((photo) => ({
        ...photo,
        aspect_ratio:
          photo.width && photo.height ? photo.width / photo.height : 16 / 9,
      })),
    [photos]
  );

  const onModalClose = (photoId: string) => {
    setLastViewedPhoto(photoId);
    lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
    setLastViewedPhoto(null);
  };

  return (
    <>
      {photoId && <PhotoModal photos={photos} onClose={onModalClose} />}
      <ImageGallery
        widths={widths}
        ratios={ratios}
        images={formattedImages}
        gap="2px"
        onImageClick={handleModalOpen}
        ref={lastViewedPhotoRef}
        lastViewedPhotoId={lastViewedPhoto}
      />
    </>
  );
};
