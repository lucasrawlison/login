"use client";

import { TodoList } from "@/app/app/components/todolist/todo-list";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewToDo} from "@/app/app/components/newToDo/new-to-do";
import axios from "axios";

export default function Dashboard() {

  interface User {
    id: string
    name: string
    email: string
  }
  
  interface Task {
    id: string
    title: string
    completed: boolean
  }
  
  const { data: session, status } = useSession()
  const router = useRouter()

  const [activeUser, setActiveUser] = useState<User | null>(null)
  const [userTasks, setUserTasks] = useState<Task[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleGetUserTasks = async () => {
      if (activeUser?.id && status === "authenticated") {
        try {
          setIsFetching(true)
          const response = await axios.post("/api/getUserTasks", {
            userId: activeUser.id,
          });
          const tasks = response.data.tasks;
          console.log("Tarefas do usuário:", tasks);
          setUserTasks(tasks);
          setIsFetching(false)
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        }
      } else {
        console.log("ActiveUser ainda não disponível.");
      }
    };
  
    handleGetUserTasks();
  }, [activeUser, status, isModalOpen]); 
  
  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const response = await axios.post("/api/getActiveUser", {
          email: session?.user?.email
        })
  
        const activeUser = response.data.user;
        console.log(response.data)
        setActiveUser(activeUser);

      } catch (error) {
        console.log(error)
      }
    }
  
    getActiveUser()
  }, [session])


   useEffect(()=>{
      if(status === "unauthenticated"){
        router.push("/login");
      }
    },[session, router, status])


  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-3xl font-medium">Tarefas</h3>
        <div className=" w-full flex justify-end">
          
          <NewToDo 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          />
        </div>
        <TodoList 
        isFetching={isFetching} 
        userTasks={userTasks}
        />
      </div>
    </main>
  );
}
