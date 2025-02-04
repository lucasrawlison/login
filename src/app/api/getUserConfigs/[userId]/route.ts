import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID inválido" },
        { status: 400 }
      );
    }

    const userConfigs = await prisma.userConfigs.findUnique({
      where: { userId },
    });

    if (!userConfigs) {
      return NextResponse.json(
        { message: "Configurações não encontradas" },
        { status: 404 }
      );
    }

    return NextResponse.json(userConfigs, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar configurações", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}