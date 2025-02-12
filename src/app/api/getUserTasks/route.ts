import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();
    console.log(body)
    const { activeUser } = body;
    console.log(activeUser.configs)
    if (!activeUser) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const tasks = await prisma.tasks.findMany({
      where: {
        userId:activeUser.id,
      },
      orderBy: { id: activeUser.configs.taskOrder },
    });

    if (!tasks) {
      return NextResponse.json(
        { message: "No tasks", tasks: tasks },
        { status: 200 }
      );
    }

    if (tasks) {
      console.log(tasks.length)
      return NextResponse.json(
        { message: "All tasks", tasks: tasks },
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
