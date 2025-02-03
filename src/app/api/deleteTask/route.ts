import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { taskId } = body;
    if (!taskId) {
      return NextResponse.json(
        { message: "Task ID Invalid" },
        { status: 400 }
      );
    }

    const updateTask = await prisma.tasks.delete({
       where:{id : taskId},
    });

    console.log(updateTask)

    if (updateTask) {
      return NextResponse.json(
        { message: "Task deleted" },
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
