import { Button } from "../ui/button";

interface CreateTodoButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const CreateTodoButton = ({ setIsModalOpen }: CreateTodoButtonProps) => {
  return (
    <Button
      onClick={() => setIsModalOpen(true)}
      variant="outline"
      className="text-green-700 border-green-200 hover:bg-green-50 cursor-pointer"
    >
      Crear Tarea
    </Button>
  );
};

export default CreateTodoButton;
