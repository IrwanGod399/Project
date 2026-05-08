"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Priority, Todo } from "./types";
import { defaultCategories, sampleTodos } from "./data";

interface TodoStore {
  todos: Todo[];
  categories: Category[];
  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "status">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  deleteCategory: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: sampleTodos,
      categories: defaultCategories,

      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              status: "active",
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: t.status === "active" ? "completed" : "active",
                  completedAt:
                    t.status === "active" ? new Date().toISOString() : undefined,
                }
              : t
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: crypto.randomUUID() },
          ],
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
    }),
    { name: "todo-store" }
  )
);
