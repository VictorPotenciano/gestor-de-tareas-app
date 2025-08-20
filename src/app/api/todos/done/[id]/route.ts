import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
  try {
    const { id } = await params;
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
    const todoChecked = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        done: !todo.done,
      },
    });
    return NextResponse.json(todoChecked);
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
