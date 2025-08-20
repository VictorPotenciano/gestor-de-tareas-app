import { ArrowLeft, Save } from "lucide-react";
import { Category, Todo, TodoFormData } from "../../../../typing";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface TodoModalFormProps {
  closeModal: () => void;
  onSubmit: SubmitHandler<TodoFormData>;
  categories?: Category[];
  selectedCategoryId?: number | null;
  todo?: Todo | null;
}

const TodoModalForm = ({
  closeModal,
  onSubmit,
  categories = [],
  selectedCategoryId = null,
  todo,
}: TodoModalFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TodoFormData>({
    defaultValues: {
      title: todo?.title || "",
      content: todo?.content || "",
      categoryId: selectedCategoryId
        ? selectedCategoryId.toString()
        : categories.length > 0
        ? categories[0].id.toString()
        : "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="text-sm font-semibold text-green-800 tracking-wide">
          Título
        </Label>
        <Input
          type="text"
          {...register("title", { required: "El título es obligatorio" })}
          className="mt-2 w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50 text-green-900 placeholder-green-400 transition-all duration-200"
          placeholder="Ingresa el título de la tarea"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <Label className="text-sm font-semibold text-green-800 tracking-wide">
          Descripción
        </Label>
        <Textarea
          {...register("content")}
          className="mt-2 w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50 text-green-900 placeholder-green-400 resize-none h-28 transition-all duration-200"
          placeholder="Ingresa la descripción de la tarea"
        />
      </div>
      <div>
        <Label className="text-sm font-semibold text-green-800 tracking-wide">
          Categoría
        </Label>
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: "La categoría es obligatoria" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={
                selectedCategoryId
                  ? selectedCategoryId.toString()
                  : categories.length > 0
                  ? categories[0].id.toString()
                  : ""
              }
            >
              <SelectTrigger className="mt-2 w-full px-4 py-2 border border-green-300 rounded-lg bg-green-50 text-green-900 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white border-green-300 rounded-lg shadow-lg">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id.toString()}
                    className="text-green-900 hover:bg-green-100 transition-colors duration-150"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">
            {errors.categoryId.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          onClick={closeModal}
          className="px-5 py-2 bg-green-200 text-green-900 rounded-lg hover:bg-green-300 font-semibold transition-all duration-200 hover:shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-all duration-200 hover:shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {todo ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
};

export default TodoModalForm;
