"use client";
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../../utils/animationVariants";
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage";
import { TableImage } from "@/app/(customerFacing)/(categories)/[name]/page";

export interface SharedModalProps {
  index: number;
  photos: TableImage[];
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction?: number;
}

export default function SharedPhotoModal({
  index,
  photos,
  changePhotoId,
  closeModal,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < photos?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  const currentImage = photos[index];

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center top-0 wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-h-full h-full px-6"
              >
                <CloudinaryImage
                  imageId={currentImage?.imageId || ""}
                  width={currentImage?.width}
                  height={currentImage?.height}
                  priority
                  alt={currentImage?.name || ""}
                  onLoad={() => setLoaded(true)}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {index > 0 && (
                <button
                  className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  onClick={() => changePhotoId(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
              )}
              {index + 1 < photos.length && (
                <button
                  className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  onClick={() => changePhotoId(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                {/* TODO: add sharing */}
                {/* <a
                  href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  target="_blank"
                  title="Open fullsize version"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a> */}
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false}>
                {photos.map(({ imageId, id, name }, photoIndex) => (
                  <motion.button
                    initial={{
                      width: "0%",
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: id === currentImage?.id ? 1.25 : 1,
                      width: "100%",
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: "0%" }}
                    onClick={() => changePhotoId(photoIndex)}
                    key={id}
                    className={`${
                      id === currentImage?.id
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                    } ${photoIndex === 0 ? "rounded-l-md" : ""} ${
                      photoIndex === photos.length - 1 ? "rounded-r-md" : ""
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <CloudinaryImage
                      alt={name}
                      width={180}
                      height={120}
                      className={`${
                        id === currentImage?.id
                          ? "brightness-110 hover:brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75"
                      } h-full transform object-cover transition`}
                      imageId={imageId}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
