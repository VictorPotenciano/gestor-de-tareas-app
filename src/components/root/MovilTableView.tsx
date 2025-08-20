import { CheckCircle2, Circle } from "lucide-react";
import DropdownButtons from "../buttons/DropdownButtons";
import { Category, Todo } from "../../../typing";

interface MovilTableViewProps {
  selectedCategory: Category;
  handleDelete: (id: number) => void;
  handleTodoClick: (todoId: number) => void;
  handleCheckedTodo: (todo: Todo) => void;
}

const MovilTableView = ({
  selectedCategory,
  handleDelete,
  handleTodoClick,
  handleCheckedTodo,
}: MovilTableViewProps) => {
  return (
    <div className="divide-y divide-green-100">
      {selectedCategory.todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 transition-all duration-200 ${
            todo.done ? "bg-green-25" : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <div
              onClick={() => handleCheckedTodo(todo)}
              className="flex-shrink-0 mt-1"
            >
              {todo.done ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 cursor-pointer" />
              ) : (
                <Circle className="w-5 h-5 text-green-400 cursor-pointer" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`font-medium text-base mb-1 ${
                  todo.done ? "line-through text-green-600" : "text-green-900"
                }`}
              >
                <span className="block truncate pr-2">{todo.title}</span>
              </div>
              {todo.content && (
                <div
                  className={`text-sm ${
                    todo.done ? "line-through text-green-500" : "text-green-700"
                  }`}
                >
                  <span className="line-clamp-3">{todo.content}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0">
              <DropdownButtons
                todo={todo}
                handleDelete={handleDelete}
                handleTodoClick={handleTodoClick}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovilTableView;
