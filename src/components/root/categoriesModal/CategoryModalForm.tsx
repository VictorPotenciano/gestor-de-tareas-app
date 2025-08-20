import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, CategoryFormdata } from "../../../../typing";
import { SubmitHandler, useForm } from "react-hook-form";

interface CategoryModalFormProps {
  handleBackToTable: () => void;
  category: Category | null;
  onSubmit: SubmitHandler<CategoryFormdata>;
}

const CategoryModalForm = ({
  handleBackToTable,
  category,
  onSubmit,
}: CategoryModalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormdata>({
    defaultValues: {
      name: category?.name || "",
    },
  });
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-green-900">
          {category ? "Editar Categoría" : "Crear Categoría"}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <Label className="block text-sm font-medium text-green-800">
            Nombre de la Categoría
          </Label>
          <Input
            type="text"
            {...register("name", {
              required: "El nombre de la categoria es obligatorio",
            })}
            className="w-full px-4 py-3 rounded-lg border-2 border-green-200 bg-white shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200 text-green-900 placeholder:text-green-400"
            placeholder="Ej: Trabajo, Personal, Estudios..."
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={handleBackToTable}
            className="bg-green-100 text-green-700 hover:bg-green-200 font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 border border-green-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {category ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryModalForm;
