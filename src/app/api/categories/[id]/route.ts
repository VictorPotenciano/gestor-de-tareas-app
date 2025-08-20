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
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!category)
      return NextResponse.json(
        { message: "Categoria no encontrada" },
        { status: 404 }
      );
    const result = {
      id: category.id,
      name: category.name,
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
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!category)
      return NextResponse.json(
        { message: "Categoria no encontrada" },
        { status: 404 }
      );

    const { name } = await request.json();
    const categoryUpdated = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(categoryUpdated);
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
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!category) {
      return NextResponse.json(
        { message: "Categoria no encontrada" },
        { status: 404 }
      );
    }
    const deleteCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deleteCategory);
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
