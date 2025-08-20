import { useState } from "react";
import { Button } from "../ui/button";
import { Todo } from "../../../typing";

interface FilterButtonsProps {
  allTodos: Todo[];
  handleFilterChange: (filter: string) => void;
}

const FilterButtons = ({
  allTodos,
  handleFilterChange,
}: FilterButtonsProps) => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    handleFilterChange(filter);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleFilter("Todos")}
        className={`ml-auto text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full cursor-pointer ${
          activeFilter === "Todos"
            ? "bg-green-300 text-green-800"
            : "bg-green-500 text-white hover:bg-green-200 hover:text-green-800"
        }`}
      >
        {allTodos.length} Tareas Totales
      </Button>
      <Button
        onClick={() => handleFilter("Terminadas")}
        className={`ml-auto text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full cursor-pointer ${
          activeFilter === "Terminadas"
            ? "bg-green-300 text-green-800"
            : "bg-green-500 text-white hover:bg-green-200 hover:text-green-800"
        }`}
      >
        {allTodos.filter((todo) => todo.done).length} Terminadas
      </Button>
      <Button
        onClick={() => handleFilter("Pendientes")}
        className={`ml-auto text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full cursor-pointer ${
          activeFilter === "Pendientes"
            ? "bg-green-300 text-green-800"
            : "bg-green-500 text-white hover:bg-green-200 hover:text-green-800"
        }`}
      >
        {allTodos.filter((todo) => !todo.done).length} Pendientes
      </Button>
    </div>
  );
};

export default FilterButtons;
