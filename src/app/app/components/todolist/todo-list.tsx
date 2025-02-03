"use client";
import { CheckSquare, Square, LoaderCircle } from "lucide-react";
import { DeleteTrigger } from "../deleteTrigger/delete-trigger";
import { useState } from "react";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  isFetching: boolean;
  isDeleteModalOpen: boolean;
  userTasks: Task[];
  setLoadedTask: (value: Task | null) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
}

export function TodoList({
  isFetching,
  userTasks,
  setLoadedTask,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: TodoListProps) {
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [loadingTasks, setLoadingTasks] = useState<{ [key: string]: boolean }>({});

  const HandleCheckTask = async (task: Task) => {
    try {
      // Define o estado de carregamento apenas para a task clicada
      setLoadingTasks((prev) => ({ ...prev, [task.id]: true }));

      await axios.post("/api/checkTask", {
        taskId: task.id,
        completed: task.completed,
      });

      // Atualiza o estado de conclusão da tarefa
      task.completed = !task.completed;

    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    } finally {
      // Remove o estado de carregamento após a resposta
      setLoadingTasks((prev) => ({ ...prev, [task.id]: false }));
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Minhas Tarefas</h3>

      {isFetching ? (
        <div className="h-full justify-center flex mt-20">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : userTasks.length > 0 ? (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md">
          {userTasks.map((task) => (
            <li
              key={task.id}
              className="border-b border-gray-200 last:border-b-0 hover:bg-slate-100 transition-all"
            >
              <div className="px-4 py-4 sm:px-6 flex items-center">
                <div className="min-w-0 flex-1 flex items-center">
                  {loadingTasks[task.id] ? (
                    <LoaderCircle className="animate-spin w-5 text-gray-400" />
                  ) : task.completed ? (
                    <CheckSquare
                      onClick={() => HandleCheckTask(task)}
                      className="h-5 w-5 text-green-500 hover:cursor-pointer"
                    />
                  ) : (
                    <Square
                      onClick={() => HandleCheckTask(task)}
                      className="h-5 w-5 text-gray-400 hover:cursor-pointer"
                    />
                  )}
                  <div className="ml-4">
                    <p
                      onClick={() => setLoadedTask(task)}
                      className={`hover:cursor-pointer text-sm font-medium text-gray-900 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>
                <DeleteTrigger
                  setTaskToDelete={setTaskToDelete}
                  isDeleteModalOpen={isDeleteModalOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  taskToDelete={taskToDelete}
                  task={task}
                />
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
