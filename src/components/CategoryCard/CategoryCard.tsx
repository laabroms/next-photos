import { Category } from "@prisma/client";
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage";
import Link from "next/link";
import { ROUTES } from "@/navigation/routes";

type CategoryCardProps = Pick<Category, "imageId" | "name" | "description">;

export function CategoryCard({
  imageId,
  name,
  description,
}: CategoryCardProps) {
  return (
    <Link href={ROUTES.CATEGORY.LINK(name)}>
      <div className="relative group w-full max-w-md mx-auto">
        <CloudinaryImage
          imageId={imageId}
          width={640}
          height={480}
          alt={name}
          className="aspect-video object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity rounded-lg">
          <div className="text-white text-center space-y-2">
            <h3 className="text-3xl font-semibold">{name.toUpperCase()}</h3>
            {description && (
              <p className="text-lg text-white/80">{description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
