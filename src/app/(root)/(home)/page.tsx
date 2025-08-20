"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithTodos,
  getcategory,
  updateCategory,
} from "@/lib/categoryapi";
import {
  Category,
  CategoryFormdata,
  Column,
  Todo,
  TodoFormData,
} from "../../../../typing";
import {
  checkedTodo,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "@/lib/todosapi";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import SkeletonLoader from "@/components/root/SkeletonLoader";
import NoClickedCategories from "@/components/root/NoClickedCategories";
import CategoriesCard from "@/components/root/CategoriesCard";
import TodosCard from "@/components/root/TodosCard";
import HeaderPage from "@/components/root/HeaderPage";
import CategoriesModal from "@/components/root/categoriesModal/CategoriesModal";
import TodoModal from "@/components/root/todoModal/TodoModal";

const Page = () => {
  const { status } = useSession();
  const [categoriesWithTodos, setCategoriesWithTodos] = useState<Category[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [clickedCategory, setClickedCategory] = useState<Category | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const { reset } = useForm<TodoFormData | CategoryFormdata>();
  const [selectedOption, setSelectedOption] = useState<"table" | "form">(
    "table"
  );
  const [filterType, setFilterType] = useState<
    "all" | "done" | "pending"
  >("all");

  const handleCreateCategory = () => {
    setSelectedOption("form");
  };

  const handleBackToTable = () => {
    setSelectedOption("table");
    reset({ name: "" });
    setClickedCategory(null);
  };

  const columnsTodo: Column[] = [
    {
      header: "Estado",
      accessorKey: "done",
    },
    {
      header: "Título",
      accessorKey: "title",
    },
    {
      header: "Descripción",
      accessorKey: "content",
    },
    {
      header: "",
      accessorKey: "acciones",
    },
  ];

  const columnsCategoy: Column[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "",
      accessorKey: "acciones",
    },
  ];

  const fetchCategoriesWithTodos = useCallback(async () => {
    try {
      const response = await getCategoriesWithTodos();
      setCategoriesWithTodos(response);
      setError(null);
      if (!selectedCategoryId && response.length > 0) {
        setSelectedCategoryId(response[0].id);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Error al obtener las categorias"
        );
      } else {
        setError("Error inesperado");
      }
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Error al obtener las categorias"
        );
      } else {
        setError("Error inesperado");
      }
    }
  };

  useEffect(() => {
    fetchCategoriesWithTodos();
    fetchCategories();
  }, [fetchCategoriesWithTodos]);

  const filterTodos = (
    todos: Todo[],
    filterType: "all" | "done" | "pending"
  ): Todo[] => {
    if (filterType === "all") {
      return todos;
    } else if (filterType === "done") {
      return todos.filter((todo) => todo.done === true);
    } else {
      return todos.filter((todo) => todo.done === false);
    }
  };

  const handleFilterChange = (type: string) => {
    if (type === "Todos") {
      setFilterType("all");
    } else if (type === "Terminadas") {
      setFilterType("done");
    } else if (type === "Pendientes") {
      setFilterType("pending");
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategoryId !== categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  const handleDelete = async (id: number, resourceType: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text:
          resourceType === "todo"
            ? "¡Esta acción eliminará la tarea seleccionada!"
            : "¡Esta acción eliminará la categoria seleccionada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        try {
          if (resourceType === "todo") {
            await deleteTodo(id);
          } else if (resourceType === "category") {
            await deleteCategory(id);
          }
        } catch (error) {
          await Swal.fire({
            icon: "error",
            title:
              resourceType === "todo"
                ? "No se pudo eliminar la tarea"
                : "No se pudo eliminar la categoria",
            text: error instanceof Error ? error.message : "Error inesperado",
          });
          return;
        }
        const succesResult = await Swal.fire(
          "Eliminado!",
          resourceType === "todo"
            ? "La tarea ha sido eliminada."
            : "La categoria ha sido eliminada.",
          "success"
        );
        if (succesResult.isConfirmed) {
          fetchCategoriesWithTodos();
          fetchCategories();
        } else {
          Swal.fire("Cancelado", "La eliminación fue cancelada.", "info");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Error al eliminar la tarea");
      } else {
        setError("Error inesperado");
      }
    }
  };

  const onSubmitTodo: SubmitHandler<TodoFormData> = async (data) => {
    const todoId = selectedTodo?.id;
    if (!selectedCategoryId) {
      setError("Por favor, selecciona una categoría.");
      return;
    }
    try {
      if (todoId) {
        await updateTodo(
          todoId,
          data.title,
          data.content,
          parseInt(data.categoryId)
        );
      } else {
        await createTodo(data.title, data.content, parseInt(data.categoryId));
      }
      setIsTodoModalOpen(false);
      reset();
      setSelectedCategoryId(parseInt(data.categoryId));
      fetchCategoriesWithTodos();
      await Swal.fire({
        icon: "success",
        title: todoId ? "Tarea actualizada" : "Tarea creada",
        text: todoId
          ? "La tarea se ha actualizado exitosamente."
          : "La tarea se ha creado exitosamente.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error inesperado";
      setError(errorMessage);
      await Swal.fire({
        icon: "error",
        title: todoId
          ? "No se pudo actualizar la tarea"
          : "No se pudo crear la tarea",
        text: errorMessage,
      });
    }
  };

  const onSubmitCategory: SubmitHandler<CategoryFormdata> = async (data) => {
    const categoryId = clickedCategory?.id;
    try {
      if (categoryId) {
        await updateCategory(categoryId, data.name);
      } else {
        await createCategory(data.name);
      }
      setSelectedOption("table");
      reset({ name: "" });
      fetchCategoriesWithTodos();
      fetchCategories();
      await Swal.fire({
        icon: "success",
        title: categoryId ? "Categoria actualizada" : "Categoria creada",
        text: categoryId
          ? "La Categoria se ha actualizado exitosamente."
          : "La Categoria se ha creado exitosamente.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error inesperado";
      setError(errorMessage);
      await Swal.fire({
        icon: "error",
        title: categoryId
          ? "No se pudo actualizar la categoria"
          : "No se pudo crear la categoria",
        text: errorMessage,
      });
    }
  };

  const closeModal = (type: string) => {
    if (type === "todo") {
      setIsTodoModalOpen(false);
    } else if (type === "category") {
      setIsCategoriesModalOpen(false);
      setSelectedOption("table");
      reset({ name: "" });
      setClickedCategory(null);
    }
  };

  const handleClick = async (id: number, resourceType: string) => {
    try {
      if (resourceType === "todo") {
        const todo = await getTodo(id);
        setSelectedTodo(todo);
        setIsTodoModalOpen(true);
      } else if (resourceType === "category") {
        const category = await getcategory(id);
        setClickedCategory(category);
        setSelectedOption("form");
      }
    } catch (error) {
      console.error("Error al cargar los detalles del plato:", error);
    }
  };

  const handleCheckTodo = async (todo: Todo) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text:
          todo.done === false
            ? "¡Esta acción dara como terminada la tarea seleccionada!"
            : "¡Esta acción quitara como terminada la tarea seleccionada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, terminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        try {
          await checkedTodo(todo.id);
        } catch (error) {
          await Swal.fire({
            icon: "error",
            title:
              todo.done === false
                ? "No se pudo terminar la tarea"
                : "No se pudo quitar como terminada la tarea",
            text: error instanceof Error ? error.message : "Error inesperado",
          });
          return;
        }
        const succesResult = await Swal.fire(
          todo.done === false ? "Terminada!" : "Quitada como terminada!",
          todo.done === false
            ? "La tarea ha sido terminada."
            : "La tarea ha sido quitada como terminada.",
          "success"
        );
        if (succesResult.isConfirmed) {
          fetchCategoriesWithTodos();
        } else {
          Swal.fire("Cancelado", "La eliminación fue cancelada.", "info");
        }
      }

      fetchCategoriesWithTodos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (status === "loading") {
    return <SkeletonLoader columns={columnsTodo} />;
  }

  const selectedCategory = categoriesWithTodos.find(
    (cat) => cat.id === selectedCategoryId
  );

  const filteredTodos = selectedCategory
    ? filterTodos(selectedCategory.todos, filterType)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto p-4 sm:p-6 max-w-full sm:max-w-6xl">
        <HeaderPage />

        {/* Carousel de categorias */}
        <CategoriesCard
          categories={categoriesWithTodos}
          selectedCategoryId={selectedCategoryId}
          handleCategoryClick={handleCategoryClick}
          setIsCategoriesModalOpen={setIsCategoriesModalOpen}
        />

        {/* Tabla de tareas */}
        {selectedCategory && (
          <TodosCard
            selectedCategory={{ ...selectedCategory, todos: filteredTodos }}
            allTodos={selectedCategory.todos}
            handleDelete={(id: number) => handleDelete(id, "todo")}
            handleTodoClick={(id: number) => handleClick(id, "todo")}
            setIsModalOpen={setIsTodoModalOpen}
            columns={columnsTodo}
            handleCheckedTodo={(todo: Todo) => handleCheckTodo(todo)}
            handleFilterChange={handleFilterChange}
          />
        )}

        {/* Si no hay categorias */}
        {!selectedCategory && categoriesWithTodos.length > 0 && (
          <NoClickedCategories />
        )}
      </div>
      {isTodoModalOpen && selectedCategoryId && (
        <TodoModal
          onSubmit={onSubmitTodo}
          closeModal={() => closeModal("todo")}
          categories={categoriesWithTodos}
          selectedCategoryId={selectedCategoryId}
          todo={selectedTodo}
        />
      )}
      {/* Modal de categorias */}
      {isCategoriesModalOpen && (
        <CategoriesModal
          closeModal={() => closeModal("category")}
          columns={columnsCategoy}
          handleCategoryClick={(id: number) => handleClick(id, "category")}
          handleDeleteCategories={(id: number) => handleDelete(id, "category")}
          categories={categories}
          clickedCategory={clickedCategory || undefined}
          selectedOption={selectedOption}
          handleCreateCategory={handleCreateCategory}
          handleBackToTable={handleBackToTable}
          onSubmit={onSubmitCategory}
        />
      )}
    </div>
  );
};

export default Page;
