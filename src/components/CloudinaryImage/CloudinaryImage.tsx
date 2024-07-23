"use client";
import { CldImage } from "next-cloudinary";

type CloudinaryImageType = {
  imageId: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

const CloudinaryImage = ({
  imageId,
  alt,
  width,
  height,
  ...rest
}: CloudinaryImageType) => {
  return (
    <CldImage
      width={width ?? "180"}
      height={height ?? "180"}
      src={imageId}
      sizes="100vw"
      alt={alt}
      className="rounded"
      {...rest}
    />
  );
};

export default CloudinaryImage;
