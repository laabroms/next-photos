"use client";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

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
      className={cn(withBorderRadius ? "rounded" : "", rest.className)}
      {...rest}
    />
  );
};

export default CloudinaryImage;
