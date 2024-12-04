import { Star } from "lucide-react";

export const RenderStars = (rating: number) => {
  const validRating = typeof rating === "number" ? rating : 0;
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < Math.round(validRating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
};
