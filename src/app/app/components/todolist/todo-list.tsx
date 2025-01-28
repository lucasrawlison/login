import { CheckSquare, Square } from "lucide-react";

const todos = [
  { id: 1, title: "Completar o projeto React", completed: false },
  { id: 2, title: "Fazer compras no supermercado", completed: true },
  { id: 3, title: "Preparar apresentação", completed: false },
  { id: 4, title: "Ler capítulo do livro", completed: false },
  { id: 5, title: "Fazer exercícios", completed: true },
  { id: 6, title: "Fazer exercícios", completed: true },
  { id: 7, title: "Fazer exercícios", completed: true },
  { id: 8, title: "Fazer exercícios", completed: true },
  { id: 9, title: "Fazer exercícios", completed: true },
  { id: 10, title: "Fazer exercícios", completed: true },
  { id: 11, title: "Fazer exercícios", completed: true },
  { id: 12, title: "Fazer exercícios", completed: true },
];

export function TodoList() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Minhas Tarefas</h3>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="px-4 py-4 sm:px-6 flex items-center">
              <div className="min-w-0 flex-1 flex items-center">
                {todo.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-500" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
                <div className="ml-4">
                  <p
                    className={`text-sm font-medium text-gray-900 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
