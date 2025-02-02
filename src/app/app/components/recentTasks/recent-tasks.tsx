import { CheckCircle, Clock } from "lucide-react"

const recentTasks = [
  { id: 1, title: "Revisar relatório", status: "completed" },
  { id: 2, title: "Preparar apresentação", status: "in-progress" },
  { id: 3, title: "Enviar e-mails", status: "completed" },
  { id: 4, title: "Agendar reunião", status: "in-progress" },
]

export function RecentTasks() {
  return (
    <div className="space-y-8">
      {recentTasks.map((task) => (
        <div key={task.id} className="flex items-center">
          {task.status === "completed" ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{task.title}</p>
            <p className="text-sm text-muted-foreground">
              {task.status === "completed" ? "Concluída" : "Em andamento"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

