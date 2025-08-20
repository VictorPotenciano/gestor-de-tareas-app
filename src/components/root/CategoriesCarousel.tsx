import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Category } from "../../../typing";

interface CategoriesCarouselProps {
  categories: Category[];
  selectedCategoryId: number | null;
  handleCategoryClick: (categoryId: number) => void;
}

const CategoriesCarousel = ({
  categories,
  selectedCategoryId,
  handleCategoryClick,
}: CategoriesCarouselProps) => {
  return (
    <Carousel
      className="w-full max-w-full sm:max-w-4xl mx-auto"
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="flex gap-2 sm:gap-3 -ml-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex-shrink-0 pl-1${
              categories.length === 1
                ? "basis-full"
                : categories.length === 2
                ? "basis-1/2"
                : categories.length === 3
                ? "basis-1/3"
                : "basis-1/4"
            } ${
              categories.length === 1
                ? "sm:basis-full"
                : categories.length === 2
                ? "sm:basis-1/2"
                : categories.length === 3
                ? "sm:basis-1/3"
                : "sm:basis-1/4"
            }`}
          >
            <Badge
              onClick={() => handleCategoryClick(category.id)}
              className={`cursor-pointer px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 w-full text-center ${
                selectedCategoryId === category.id
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  : "bg-white hover:bg-green-50 text-green-700 border-2 border-green-200"
              }`}
              variant={
                selectedCategoryId === category.id ? "default" : "outline"
              }
            >
              {category.name}
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {category.todos.length}
              </span>
            </Badge>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 text-green-600 border-green-200 hover:bg-green-50 hidden lg:flex cursor-pointer" />
      <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 text-green-600 border-green-200 hover:bg-green-50 hidden lg:flex cursor-pointer" />
    </Carousel>
  );
};

export default CategoriesCarousel;
