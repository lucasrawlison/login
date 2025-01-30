import { BookmarkPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewToDoListProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export function NewToDo({ isModalOpen, setIsModalOpen }: NewToDoListProps) {
  return (
    <Dialog onOpenChange={() => setIsModalOpen(!isModalOpen)} open={isModalOpen}>
      <DialogTrigger  className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md gap-1">
        <BookmarkPlus />
        Nova Tarefa
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para adicionar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Título:
            </Label>
            <Input id="name" className="col-span-3 border-black" />
          </div>
        </div>
        <DialogFooter className="gap-4">
          <Button onClick={() => setIsModalOpen(!isModalOpen)} variant="secondary" type="button">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}