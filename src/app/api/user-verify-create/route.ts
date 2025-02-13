import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, imgLink } = body;
    console.log(body)
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include:{configs:true}
    });

    if (existingUser) {
      return NextResponse.json(
        { exists: true, message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    // Cria o usuário caso ele não exista
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name || null, // Define o nome como opcional
        active: true,
        imgLink
      },
    });

    return NextResponse.json(
      { exists: false, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user verification/creation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
