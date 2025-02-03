import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface DeleteTriggerProps {
  task: Task;
  setIsDeleteModalOpen: (value: boolean) => void;
  isDeleteModalOpen: boolean;
  setTaskToDelete: (value: Task | null) => void;
  taskToDelete: Task | null;
}



export function DeleteTrigger({task, isDeleteModalOpen, setIsDeleteModalOpen, setTaskToDelete, taskToDelete } : DeleteTriggerProps) {
    const [isFetching, setIsFetching] = useState(false);
    
    const deleteTask = async () => {
    try {
        setIsFetching(true);
        const response = await axios.post("/api/deleteTask", {taskId: taskToDelete?.id});
        console.log("Tarefa deletada:", response.data);
        setIsFetching(false);
        setIsDeleteModalOpen(false);
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        
    }
}

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogTrigger onClick={() => setTaskToDelete(task)}>
        <Trash2 className="w-4 text-red-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className=" text-center">
            Deseja deletar a Tarefa?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Título: {taskToDelete?.title}
        </DialogDescription>
        <div className="flex gap-4 w-full justify-center">
          <Button onClick={() => deleteTask()} variant="destructive">
            {isFetching ? (
              <LoaderCircle className=" animate-spin" />
            ) : (
              "Deletar"
            )}
          </Button>
          <DialogClose asChild>
            <Button>Cancelar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}