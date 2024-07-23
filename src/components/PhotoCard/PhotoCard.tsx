import { Photo } from "@prisma/client";
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage";
import { Card } from "../ui/card";

type PhotoCardProps = Pick<Photo, "imageId" | "name">;

export function PhotoCard({ imageId, name }: PhotoCardProps) {
  return (
    <CloudinaryImage
      imageId={imageId}
      width={640}
      height={480}
      alt={name}
      className="aspect-video object-cover rounded-lg"
    />
  );
}

export function PhotoCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
    </Card>
  );
}
