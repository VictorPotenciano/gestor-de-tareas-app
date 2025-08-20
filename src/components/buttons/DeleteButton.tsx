import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteTodoButtonProps {
  id: number;
  handleDelete: (id: number) => void;
}

const DeleteButton = ({ id, handleDelete }: DeleteTodoButtonProps) => {
  return (
    <Button
      onClick={() => handleDelete(id)}
      className="bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500 cursor-pointer"
    >
      <Trash2 className="h-2 w-2 sm:h-3 sm:w-3 " />
    </Button>
  );
};

export default DeleteButton;
