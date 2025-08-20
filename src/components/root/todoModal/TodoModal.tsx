import { Category, Todo, TodoFormData } from "../../../typing";
import { SubmitHandler } from "react-hook-form";
import TodoModalForm from "./TodoModalForm";

interface TodoModalProps {
  closeModal: () => void;
  onSubmit: SubmitHandler<TodoFormData>;
  categories?: Category[];
  selectedCategoryId?: number | null;
  todo?: Todo | null;
}

const TodoModal = ({
  closeModal,
  onSubmit,
  categories = [],
  selectedCategoryId = null,
  todo = null,
}: TodoModalProps) => {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-green-900/60 backdrop-blur-sm transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300 scale-100"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-6 text-center">
          {todo ? "Actualizar Tarea" : "Crear Tarea"}
        </h2>
        <TodoModalForm
          closeModal={closeModal}
          onSubmit={onSubmit}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          todo={todo}
        />
      </div>
    </div>
  );
};

export default TodoModal;
