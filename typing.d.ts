import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface Todo {
  id: number;
  title: string;
  content: string;
  done: boolean;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  todos: Todo[];
}

export type Column = {
  header: string;
  accessorKey: string;
};

export interface TodoFormData {
  title: string;
  content: string;
  categoryId: string;
}

export interface CategoryFormdata {
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
