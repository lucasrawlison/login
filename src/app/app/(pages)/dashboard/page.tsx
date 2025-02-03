"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, LoaderCircle } from "lucide-react"
import { RecentTasks } from "@/app/app/components/recentTasks/recent-tasks"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function DashboardPage() {

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
    const [isModalOpen] = useState(false)

  useEffect(() => {
    const handleGetUserTasks = async () => {
      if (activeUser?.id && status === "authenticated" && isModalOpen === false) {
        try {
          setIsFetching(true)
          const response = await axios.post<{tasks: Task[]}>("/api/getUserTasks", {
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

  return (
    <div className="container mx-auto p-6 overflow-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard de Tarefas</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Tarefas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFetching ? (
                <LoaderCircle className=" animate-spin w-3" />
              ) : (
                userTasks?.length
              )}
            </div>
            {/* <p className="text-xs text-muted-foreground">+2 desde ontem</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFetching ? (
                <LoaderCircle className=" animate-spin w-3" />
              ) : (
                userTasks.filter((task) => !task.completed).length
              )}
            </div>
            {/* <p className="text-xs text-muted-foreground">-1 desde ontem</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Concluídas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFetching ? (
                <LoaderCircle className=" animate-spin w-3" />
              ) : (
                userTasks.filter((task) => task.completed).length
              )}
            </div>
            {/* <p className="text-xs text-muted-foreground">+3 desde ontem</p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tarefas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTasks userTasks={userTasks}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

