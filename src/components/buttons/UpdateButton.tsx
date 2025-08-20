import { Edit } from "lucide-react";
import { Button } from "../ui/button";

interface UpdateTodoButtonProps {
  id: number;
  handleClick: (id: number) => void;
}

const UpdateButton = ({
  id,
  handleClick,
}: UpdateTodoButtonProps) => {
  return (
    <Button
      onClick={() => handleClick(id)}
      className="bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border hover:border-green-500 cursor-pointer"
    >
      <Edit className="h-2 w-2 sm:h-3 sm:w-3 " />
    </Button>
  );
};

export default UpdateButton;
