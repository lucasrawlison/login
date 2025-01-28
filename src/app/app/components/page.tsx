"use client";

import { TodoList } from "@/app/app/components/todolist/todo-list";

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
        <TodoList />
      </div>
    </main>
  );
}
