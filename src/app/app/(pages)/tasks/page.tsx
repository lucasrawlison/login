"use client";

import { TodoList } from "@/app/app/components/todolist/todo-list";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeUser, setActiveUser] = useState(null)


   useEffect(()=>{
      if(status === "unauthenticated"){
        router.push("/login");
      }
    },[session, router, status])

  useEffect(()=>{
    const getActiveUser = async () =>{
      try {
        const response = await axios.post("/api/getActiveUser", {
          email: session?.user?.email
        })

        const activeUser = response.data;
        console.log(activeUser)
        
      } catch (error) {
        
      }
      
    }

    getActiveUser()
  },[])
    
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-3xl font-medium">Tarefas</h3>
        <TodoList/>
      </div>
    </main>
  );
}
