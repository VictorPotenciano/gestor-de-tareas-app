import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getCategoriesWithTodos() {
  try {
    const response = await api.get("/categories/todos");
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching categories with todos:", error);
    }
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching categories:", error);
    }
    return [];
  }
}

export async function getcategory(id: number) {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching category:", error);
    }
    return null;
  }
}

export async function createCategory(name: string) {
  try {
    const response = await api.post("/categories", {
      name,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error creating category:", error);
    }
    return null;
  }
}

export async function updateCategory(id: number, name: string) {
  try {
    const response = await api.put(`/categories/${id}`, {
      name,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error updating category:", error);
    }
    return null;
  }
}

export async function deleteCategory(id: number) {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error deleting category:", error);
    }
    return null;
  }
}
