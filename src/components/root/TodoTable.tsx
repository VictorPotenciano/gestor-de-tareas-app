"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Circle } from "lucide-react";
import { Category, Column, Todo } from "../../../typing";
import UpdateButton from "../buttons/UpdateButton";
import DeleteButton from "../buttons/DeleteButton";
import MovilTableView from "./MovilTableView";

interface TodoTableProps {
  columns: Column[];
  selectedCategory: Category;
  handleDelete: (id: number) => void;
  handleTodoClick: (todoId: number) => void;
  handleCheckedTodo: (todo: Todo) => void;
}

const TodoTable = ({
  columns,
  selectedCategory,
  handleDelete,
  handleTodoClick,
  handleCheckedTodo,
}: TodoTableProps) => {
  return (
    <div className="border border-green-200 overflow-hidden shadow-sm bg-white">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-green-100 to-green-50 border-b border-green-200 hover:from-green-150 hover:to-green-100 transition-all duration-200">
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey}
                  className={`text-green-800 font-semibold py-4 px-6 text-sm uppercase tracking-wide ${
                    column.accessorKey === "done" ? "w-16 text-center" : ""
                  }`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedCategory.todos.map((todo) => (
              <TableRow
                key={todo.id}
                className={`group transition-all duration-200 border-b border-green-100 last:border-b-0 ${
                  todo.done
                    ? "bg-green-25 hover:bg-green-50"
                    : "bg-white hover:bg-green-25"
                }`}
              >
                <TableCell className="py-4 px-6 text-center">
                  <div
                    onClick={() => handleCheckedTodo(todo)}
                    className="flex justify-center"
                  >
                    {todo.done ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 transition-transform hover:scale-120 cursor-pointer" />
                    ) : (
                      <Circle className="w-5 h-5 text-green-400 transition-all group-hover:text-green-500 hover:scale-120 cursor-pointer" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="space-y-1">
                    <div
                      className={`font-medium text-base transition-colors ${
                        todo.done
                          ? "line-through text-green-600"
                          : "text-green-900 group-hover:text-green-800"
                      }`}
                    >
                      {todo.title}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-green-700 max-w-xs">
                  <span
                    className={`text-sm transition-colors ${
                      todo.done
                        ? "line-through text-green-500"
                        : "group-hover:text-green-600"
                    }`}
                  >
                    {todo.content}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <UpdateButton id={todo.id} handleClick={handleTodoClick} />
                    <DeleteButton id={todo.id} handleDelete={handleDelete} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {selectedCategory.todos.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center"
                >
                  <div className="text-green-500 text-sm">
                    No hay tareas en esta categoría
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {selectedCategory.todos.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-green-500 text-sm">
              No hay tareas en esta categoría
            </div>
          </div>
        ) : (
          <MovilTableView
            selectedCategory={selectedCategory}
            handleDelete={handleDelete}
            handleTodoClick={handleTodoClick}
            handleCheckedTodo={handleCheckedTodo}
          />
        )}
      </div>
    </div>
  );
};

export default TodoTable;
