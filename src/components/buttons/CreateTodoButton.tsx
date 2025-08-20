import { Button } from "../ui/button";

interface CreateTodoButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const CreateTodoButton = ({ setIsModalOpen }: CreateTodoButtonProps) => {
  return (
    <Button
      onClick={() => setIsModalOpen(true)}
      className="bg-amber-400 text-white hover:bg-amber-500 hover:text-white hover:border hover:border-amber-500 cursor-pointer"
    >
      Crear Tarea
    </Button>
  );
};

export default CreateTodoButton;
