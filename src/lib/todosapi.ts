import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getTodos() {
  try {
    const response = await api.get("/todos");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching todos:", error);
    }
    return [];
  }
}

export async function getTodo(id: number) {
  try {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching todos:", error);
    }
    return null;
  }
}

export async function createTodo(
  title: string,
  content: string,
  categoryId: number
) {
  try {
    const response = await api.post("/todos", {
      title,
      content,
      categoryId,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error creating todo:", error);
    }
    return null;
  }
}

export async function checkedTodo(id: number) {
  try {
    const response = await api.put(`/todos/done/${id}`);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error updating todo:", error);
    }
    return null;
  }
}

export async function updateTodo(
  id: number,
  title: string,
  content: string,
  categoryId: number
) {
  try {
    const response = await api.put(`/todos/${id}`, {
      title,
      content,
      categoryId,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error updating todo:", error);
    }
    return null;
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error deleting todo:", error);
    }
    return null;
  }
}
