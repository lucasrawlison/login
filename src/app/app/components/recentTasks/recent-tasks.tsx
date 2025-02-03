import { CheckCircle, Clock } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface RecentTasksProps {
  userTasks: Task[]
}

export function RecentTasks({ userTasks }: RecentTasksProps) {
  return (
    <div className="space-y-8 min-h-72 max-h-72 overflow-auto">
      {userTasks.map((task) => (
        <div key={task.id} className="flex items-center">
          {task.completed ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{task.title}</p>
            <p className="text-sm text-muted-foreground">
              {task.completed ? "Concluída" : "Em andamento"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

