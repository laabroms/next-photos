"use client";
import { CldImage } from "next-cloudinary";

type CloudinaryImageType = {
  imageId: string;
  alt: string;
  width?: number;
  height?: number;
};

const CloudinaryImage = ({
  imageId,
  alt,
  width,
  height,
}: CloudinaryImageType) => {
  return (
    <CldImage
      width={width ?? "180"}
      height={height ?? "180"}
      src={imageId}
      sizes="100vw"
      alt={alt}
      className="rounded"
    />
  );
};

export default CloudinaryImage;
