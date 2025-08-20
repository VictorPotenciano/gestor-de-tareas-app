import { Category } from "../../../typing";
import { Button } from "../ui/button";
import CategoriesCarousel from "./CategoriesCarousel";
import { ListPlus } from "lucide-react";

interface CategoriesCardProps {
  categories: Category[];
  selectedCategoryId: number | null;
  handleCategoryClick: (categoryId: number) => void;
  setIsCategoriesModalOpen: (isOpen: boolean) => void;
}

const CategoriesCard = ({
  categories,
  selectedCategoryId,
  handleCategoryClick,
  setIsCategoriesModalOpen,
}: CategoriesCardProps) => {
  return (
    <div className="mb-6 sm:mb-8 bg-white border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-green-800">
              Categorías
            </h3>
            <p className="text-sm text-green-600 mt-1">
              Selecciona una categoría para filtrar
            </p>
          </div>
          <Button
            onClick={() => setIsCategoriesModalOpen(true)}
            variant="ghost"
            size="sm"
            className="text-green-700 hover:bg-green-300/50 hover:text-green-800 rounded-full p-2 transition-all cursor-pointer"
            aria-label="Añadir categoría"
          >
            <ListPlus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="p-4 sm:p-6">
        {categories.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No hay categorías disponibles</p>
            <Button
              onClick={() => setIsCategoriesModalOpen(true)}
              variant="outline"
              className="text-green-700 border-green-200 hover:bg-green-50 cursor-pointer"
            >
              Crear categoría
            </Button>
          </div>
        ) : (
          <CategoriesCarousel
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            handleCategoryClick={handleCategoryClick}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesCard;
