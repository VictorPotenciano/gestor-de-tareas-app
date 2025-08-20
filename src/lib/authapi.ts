import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error fetching dishes:", error);
    }
    return null;
  }
}

export async function updateUser(id: number, name: string, email: string) {
  try {
    const response = await api.put(`/user/${id}`, {
      name,
      email,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error updating user:", error);
    }
    return null;
  }
}

export async function changePassword(password: string) {
  try {
    const response = await api.put("/user/changePassword", {
      password,
    });
    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Error updating user:", error);
    }
    return null;
  }
}
