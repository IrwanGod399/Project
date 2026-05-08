"use client";

import { Todo, Category } from "@/lib/types";
import PriorityBadge from "./PriorityBadge";
import { Trash2, Calendar } from "lucide-react";

interface Props {
  todo: Todo;
  category?: Category;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoCard({ todo, category, onToggle, onDelete }: Props) {
  const isOverdue =
    todo.status === "active" &&
    todo.dueDate &&
    new Date(todo.dueDate) < new Date();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div
      className={`group relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.status === "completed"
          ? "bg-gray-50 border-gray-100 opacity-60"
          : "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md shadow-sm"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.status === "completed"
            ? "bg-indigo-500 border-indigo-500"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        {todo.status === "completed" && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`font-medium text-sm leading-snug ${
              todo.status === "completed" ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {todo.title}
          </span>
          <div className="flex-shrink-0 flex items-center gap-2">
            <PriorityBadge priority={todo.priority} />
            <button
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {todo.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{todo.description}</p>
        )}

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {category && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon} {category.name}
            </span>
          )}
          {todo.dueDate && (
            <span
              className={`flex items-center gap-1 text-xs ${
                isOverdue ? "text-red-500 font-semibold" : "text-gray-400"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {isOverdue ? "Overdue · " : ""}
              {formatDate(todo.dueDate)}
            </span>
          )}
          {todo.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
