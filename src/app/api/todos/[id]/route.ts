import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "No autorizado. Por favor, inicia sesión." },
      { status: 401 }
    );
  }
  const { id } = await params;
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });
    if (!todo)
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );
    const result = {
      id: todo.id,
      title: todo.title,
      content: todo.content,
      done: todo.done,
      category: {
        id: todo.category.id,
        name: todo.category.name,
      },
    };
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "No autorizado. Por favor, inicia sesión." },
      { status: 401 }
    );
  }
  const userId = parseInt(session.user.id);
  const { id } = await params;
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!todo)
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );

    const { title, content, categoryId } = await request.json();
    const todoUpdated = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
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
    return NextResponse.json(todoUpdated);
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "No autorizado. Por favor, inicia sesión." },
      { status: 401 }
    );
  }
  const { id } = await params;
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!todo) {
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );
    }
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deleteTodo);
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
