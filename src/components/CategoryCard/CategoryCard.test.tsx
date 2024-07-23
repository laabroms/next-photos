import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { CategoryCard } from "./CategoryCard";

describe("CategoryCard", () => {
  const category = {
    imageId: "image-123",
    name: "Nature",
    description: "Beautiful nature photos",
  };

  it("renders category name", () => {
    const { getByText } = render(<CategoryCard {...category} />);
    expect(getByText(category.name)).toBeDefined();
  });

  it("renders category description", () => {
    const { getByText } = render(<CategoryCard {...category} />);
    expect(getByText(category.description)).toBeDefined();
  });

  it("renders CloudinaryImage component with correct props", () => {
    const { getByTestId } = render(<CategoryCard {...category} />);
    const cloudinaryImage = getByTestId("cloudinary-image");
    expect(cloudinaryImage).toHaveProperty("imageId", category.imageId);
  });
});
