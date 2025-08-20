"use client";

import { Button } from "@/components/ui/button";
import type { Category, CategoryFormdata, Column } from "../../../../typing";
import CategoriesTableModal from "./CategoriesTableModal";
import EmptyCategoriesModal from "./EmptyCategoriesModal";
import HeaderCategoriesModal from "./HeaderCategoriesModal";
import CategoryModalForm from "./CategoryModalForm";
import { SubmitHandler } from "react-hook-form";

interface CategoriesModalProps {
  closeModal: () => void;
  columns: Column[];
  handleCategoryClick: (categoryId: number) => void;
  categories: Category[];
  handleDeleteCategories: (id: number) => void;
  clickedCategory?: Category | null;
  selectedOption: "table" | "form";
  handleCreateCategory: () => void;
  handleBackToTable: () => void;
  onSubmit: SubmitHandler<CategoryFormdata>;
}

const CategoriesModal = ({
  closeModal,
  columns,
  handleCategoryClick,
  categories,
  handleDeleteCategories,
  clickedCategory,
  selectedOption,
  handleCreateCategory,
  handleBackToTable,
  onSubmit,
}: CategoriesModalProps) => {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-green-900/70 backdrop-blur-md transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 border border-green-100"
      >
        <HeaderCategoriesModal closeModal={closeModal} />

        <div className="p-6 flex flex-col">
          {selectedOption === "table" ? (
            <>
              <div className="rounded-xl border border-green-200 overflow-hidden">
                <CategoriesTableModal
                  handleCategoryClick={handleCategoryClick}
                  categories={categories}
                  handleDeleteCategories={handleDeleteCategories}
                  columns={columns}
                />
              </div>
              {categories.length === 0 && <EmptyCategoriesModal />}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleCreateCategory}
                  variant="outline"
                  className="text-green-700 border-green-200 hover:bg-green-50 cursor-pointer"
                >
                  Crear Categoría
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-green-200 p-8 bg-green-25 shadow-sm">
              <CategoryModalForm
                handleBackToTable={handleBackToTable}
                category={clickedCategory || null}
                onSubmit={onSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
