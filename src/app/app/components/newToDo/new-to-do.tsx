import { useState } from "react";
import { BookmarkPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle} from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface User {
  id: string
  name: string
  email: string
}

interface NewToDoListProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  loadedTask: Task | null;
  setLoadedTask: (value: Task | null) => void;
  activeUser: User | null;
}

export function NewToDo({
  isModalOpen,
  setIsModalOpen,
  loadedTask,
  setLoadedTask,
  activeUser,
}: NewToDoListProps) {
  const [title, setTitle] = useState(loadedTask?.title || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()  && !loadedTask?.title.trim()) {
      alert("O título não pode estar vazio.");
      return;
    }

    console.log(loadedTask ? "Editando tarefa" : "Criando nova tarefa", title);

    if(loadedTask) {
      try {
        setIsSaving(true);

        const response = await axios.post("/api/updateTask", {
          title: loadedTask.title,
          taskId: loadedTask.id,
          completed: loadedTask.completed,
        })

        console.log(response.data);
        setIsSaving(false);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    } else {
      try {
        setIsSaving(true);
        const response = await axios.post("/api/createTask", {
          title,
          userId: activeUser?.id,
        })

        console.log(response.data);
        setIsSaving(false);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao criar nova tarefa:", error);
        
      }
    }
  };


  const handleNewTask = () => {
    setLoadedTask(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogTrigger onClick={handleNewTask} asChild>
          <Button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md gap-1">
            <BookmarkPlus />
            Nova Tarefa
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {loadedTask ? "Editar Tarefa" : "Nova Tarefa"}
            </DialogTitle>
            <DialogDescription>
              {loadedTask
                ? "Edite os detalhes da tarefa abaixo."
                : "Preencha os detalhes abaixo para adicionar uma nova tarefa."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Título:
              </Label>
              {loadedTask ? (
                <Input
                  id="name"
                  value={loadedTask?.title}
                  onChange={(e) => setLoadedTask({ ...loadedTask, title: e.target.value })}
                  className="col-span-3 border-black"
                />
              ) : (
                <Input
                  id="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3 border-black"
                />
              )}
            </div>
          </div>
          <DialogFooter className="gap-4">
            {loadedTask ? (
              <>
            <Button variant={"destructive"}>Deletar</Button>
            <Button onClick={handleSave}>Atualizar</Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSave}>{isSaving? (<LoaderCircle className=" animate-spin"/>) : "Salvar"}</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
