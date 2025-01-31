import { useState } from "react";
import { BookmarkPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface NewToDoListProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  loadedTask: Task | null;
}

export function NewToDo({ isModalOpen, setIsModalOpen, loadedTask }: NewToDoListProps) {
  const [title, setTitle] = useState(loadedTask?.title || "");

  const handleSave = () => {
    if (!title.trim()) {
      alert("O título não pode estar vazio.");
      return;
    }

    console.log(loadedTask ? "Editando tarefa" : "Criando nova tarefa", title);
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md gap-1">
            <BookmarkPlus />
            {loadedTask ? "Editar Tarefa" : "Nova Tarefa"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{loadedTask ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
            <DialogDescription>
              {loadedTask ? "Edite os detalhes da tarefa abaixo." : "Preencha os detalhes abaixo para adicionar uma nova tarefa."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">Título:</Label>
              <Input
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 border-black"
              />
            </div>
          </div>
          <DialogFooter className="gap-4">
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {loadedTask ? "Atualizar" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
