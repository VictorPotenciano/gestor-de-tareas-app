import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import { Todo } from "../../../typing";

interface DropdownButtonsProps {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleTodoClick: (todoId: number) => void;
}

const DropdownButtons = ({
  todo,
  handleDelete,
  handleTodoClick,
}: DropdownButtonsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 bg-white text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full border border-green-600 transition-colors"
        >
          <span className="text-lg font-bold">...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-green-200 shadow-md rounded-md p-2">
        <DropdownMenuItem className="flex flex-col gap-2">
          <UpdateButton id={todo.id} handleClick={handleTodoClick} />
          <DeleteButton id={todo.id} handleDelete={handleDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownButtons;
