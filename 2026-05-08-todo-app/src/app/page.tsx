"use client";

import { useState, useMemo } from "react";
import { useTodoStore } from "@/lib/store";
import TodoCard from "@/components/TodoCard";
import AddTodoModal from "@/components/AddTodoModal";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Priority } from "@/lib/types";

type FilterStatus = "all" | "active" | "completed";

export default function Home() {
  const { todos, categories, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return todos
      .filter((t) => {
        if (filterStatus !== "all" && t.status !== filterStatus) return false;
        if (filterCategory !== "all" && t.categoryId !== filterCategory) return false;
        if (filterPriority !== "all" && t.priority !== filterPriority) return false;
        if (
          search &&
          !t.title.toLowerCase().includes(search.toLowerCase()) &&
          !t.description?.toLowerCase().includes(search.toLowerCase()) &&
          !t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const pOrder = { high: 0, medium: 1, low: 2 };
        if (a.status !== b.status) return a.status === "active" ? -1 : 1;
        return pOrder[a.priority] - pOrder[b.priority];
      });
  }, [todos, filterStatus, filterCategory, filterPriority, search]);

  const activeCt = todos.filter((t) => t.status === "active").length;
  const completedCt = todos.filter((t) => t.status === "completed").length;
  const completion = todos.length ? Math.round((completedCt / todos.length) * 100) : 0;

  return (
    <>
      {/* Hero summary */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {activeCt} remaining · {completedCt} completed · {completion}% done
        </p>
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden w-full max-w-sm">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks, tags..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-xl border font-medium transition-all shadow-sm ${
              showFilters
                ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="text-sm px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-sm px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | "all")}
              className="text-sm px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button
            onClick={() => {
              setFilterStatus("all");
              setFilterCategory("all");
              setFilterPriority("all");
              setSearch("");
            }}
            className="self-end text-xs text-indigo-600 hover:underline font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Status tabs */}
      <div className="flex gap-1 mb-4">
        {(["all", "active", "completed"] as FilterStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
              filterStatus === s
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            {s}{" "}
            {s === "active"
              ? `(${activeCt})`
              : s === "completed"
              ? `(${completedCt})`
              : `(${todos.length})`}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-gray-500 font-medium">No tasks found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or add a new task.</p>
          </div>
        ) : (
          filtered.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              category={categories.find((c) => c.id === todo.categoryId)}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {showModal && (
        <AddTodoModal
          categories={categories}
          onAdd={addTodo}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
