import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { title, userId } = body;
    if (!userId || !title) {
      return NextResponse.json(
        { message: "User ID or Title Invalid" },
        { status: 400 }
      );
    }

    const insertTask = await prisma.tasks.create({
        data: {
            title,
            userId,
            completed: false,
        },
    });

    console.log(insertTask)

    if (insertTask) {
      return NextResponse.json(
        { message: "New task inserted" },
        { status: 200 }
      );
    }

    
    
  } catch (error) {
    console.error("Error finding user tasks", error);
    return NextResponse.json(
      { message: "Internal server error", tasks: [] }, 
      { status: 200 }
    );
  }
}
