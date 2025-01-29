"use client";
import axios from "axios";
import { CheckSquare, Square, LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function TodoList() {
  
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
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const [userTasks, setUserTasks] = useState<Task[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const userTest = {
      id: "teste"
    }
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
  }, [activeUser, status]); 
  
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

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Minhas Tarefas</h3>

      {isFetching ? (
        <div className="h-full justify-center flex mt-20">
          <LoaderCircle className=" animate-spin" />
        </div>
      ) : userTasks.length > 0 ? (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md">
          {userTasks.map((task) => (
            <li
              key={task.id}
              className="border-b border-gray-200 last:border-b-0 hover:cursor-pointer hover:bg-slate-100 transition-all"
            >
              <div className="px-4 py-4 sm:px-6 flex items-center">
                <div className="min-w-0 flex-1 flex items-center">
                  {task.completed ? (
                    <CheckSquare className="h-5 w-5 text-green-500" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                  <div className="ml-4">
                    <p
                      className={`text-sm font-medium text-gray-900 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Sem Tarefas</div>
      )}
    </div>
  );
}