import Image from "next/image";
import TodoTable from "./TodoTable";
import CreateTodoButton from "../buttons/CreateTodoButton";
import EmptyTodos from "./EmptyTodos";
import { Category, Column, Todo } from "../../../typing";
import FilterButtons from "../buttons/FilterButtons";

interface TodosCardProps {
  selectedCategory: Category;
  allTodos: Todo[];
  handleDelete: (id: number) => void;
  handleTodoClick: (todoId: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  columns: Column[];
  handleCheckedTodo: (todo: Todo) => void;
  handleFilterChange: (type: string) => void;
}

const TodosCard = ({
  selectedCategory,
  allTodos,
  handleDelete,
  handleTodoClick,
  setIsModalOpen,
  columns,
  handleCheckedTodo,
  handleFilterChange,
}: TodosCardProps) => {
  return (
    <div className="border border-green-200 shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <h2 className="flex gap-2 items-center text-lg sm:text-xl font-semibold">
          <Image src="/favicon-32x32.png" alt="Logo" width={20} height={20} />
          {selectedCategory.name}
        </h2>
        <div className="flex gap-2 items-center mt-2 lg:mt-0">
          <FilterButtons
            allTodos={allTodos}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
      {selectedCategory.todos.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <TodoTable
              columns={columns}
              selectedCategory={selectedCategory}
              handleDelete={handleDelete}
              handleTodoClick={handleTodoClick}
              handleCheckedTodo={handleCheckedTodo}
            />
          </div>
          <div className="flex justify-end p-2 sm:p-4">
            <CreateTodoButton setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      ) : (
        <EmptyTodos setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default TodosCard;
