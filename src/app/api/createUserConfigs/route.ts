import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { id } = body.user;
    if (!id) {
      return NextResponse.json(
        { message: "User ID Invalid" },
        { status: 400 }
      );
    }

    const userConfigs = await prisma.userConfigs.create({
        data: {
            userId:id,
        },
    });

    console.log(userConfigs)

    if (userConfigs) {
      return NextResponse.json(
        { message: "New user configs inserted" },
        { status: 200 }
      );
    }

    
    
  } catch (error) {
    console.error("Error creating configs", error);
    return NextResponse.json(
      { message: "Internal server error"}, 
      { status: 500 }
    );
  }
}
