import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "No autorizado. Por favor, inicia sesión." },
      { status: 401 }
    );
  }
  const userId = parseInt(session.user.id);
  try {
    const categoriesWithTodos = await prisma.category.findMany({
      where: {
        userId: userId,
      },
      include: {
        todos: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    const result = categoriesWithTodos.map((category) => ({
      id: category.id,
      name: category.name,
      todos: category.todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        content: todo.content,
        done: todo.done,
      })),
    }));
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
