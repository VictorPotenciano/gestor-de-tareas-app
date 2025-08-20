import Image from "next/image";
import CreateTodoButton from "../buttons/CreateTodoButton";

interface EmptyTodosProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const EmptyTodos = ({ setIsModalOpen }: EmptyTodosProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white">
      <Image
        src="/favicon-32x32.png"
        alt="Logo"
        width={32}
        height={32}
        className="mb-4"
      />
      <p className="text-green-600 text-base sm:text-lg font-medium">
        No hay tareas en esta categoría
      </p>
      <p className="text-green-500 text-xs sm:text-sm mt-2">
        ¡Perfecto! Mantén este espacio limpio y organizado.
      </p>
      <div className="p-2">
        <CreateTodoButton setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default EmptyTodos;
