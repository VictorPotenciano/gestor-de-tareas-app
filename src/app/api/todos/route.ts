import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "No autorizado. Por favor, inicia sesión." },
      { status: 401 }
    );
  }
  const userId = parseInt(session.user.id);
  try {
    const { title, content, categoryId } = await request.json();

    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      return NextResponse.json(
        { message: "La categoría no existe." },
        { status: 400 }
      );
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        content: content || null,
        categoryId,
        userId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(todo);
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
