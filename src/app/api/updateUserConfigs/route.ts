import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { configs } = body;
    console.log(configs.id)
    if (!configs.id) {
      console.log("Configs Invalid");
      return NextResponse.json(
        { message: "Configs Invalid" },
        { status: 400 }
      );
    }


    const updatedConfigs = await prisma.userConfigs.update({
       where:{id : configs.id},
        data: {
            taskOrder: configs.taskOrder,
            
        },
    });

    console.log(updatedConfigs)

   
      return NextResponse.json(
        { message: "Configs updated", configs: updatedConfigs },
        { status: 200 }
      );
   

    
    
  } catch (error) {
    console.error("Error updating configs", error);
    return NextResponse.json(
      { message: "Internal server error", configs: null }, 
      { status: 500 }
    );
  }
}
