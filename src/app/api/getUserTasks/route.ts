import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const tasks = await prisma.tasks.findMany({
      where: {
        userId,
      },
    });

    if (tasks) {
      return NextResponse.json(
        { exists: true, message: "All tasks", tasks: tasks },
        { status: 200 }
      );
    }
    
  } catch (error) {
    console.error("Error finding user tasks", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
