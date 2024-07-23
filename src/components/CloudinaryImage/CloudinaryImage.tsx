"use client";
import { CldImage } from "next-cloudinary";

type CloudinaryImageType = {
  imageId: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  withBorderRadius?: boolean;
  [key: string]: any;
};

const CloudinaryImage = ({
  imageId,
  alt,
  width,
  height,
  sizes,
  withBorderRadius,
  ...rest
}: CloudinaryImageType) => {
  return (
    <CldImage
      width={width}
      height={height}
      src={imageId}
      sizes={sizes ?? "100vw"}
      alt={alt}
      className={withBorderRadius ? "rounded" : ""}
      {...rest}
    />
  );
};

export default CloudinaryImage;
