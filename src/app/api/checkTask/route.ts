import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { taskId, completed } = body;
    if (!taskId) {
      return NextResponse.json(
        { message: "Task ID invalid" },
        { status: 400 }
      );
    }

    const updateTask = await prisma.tasks.update({
       where:{id : taskId},
        data: {
            completed: !completed
        },
    });

    console.log(updateTask)

    if (updateTask) {
      return NextResponse.json(
        { message: "Task check updated" },
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
