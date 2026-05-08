"use client";

import { useState } from "react";
import { useTodoStore } from "@/lib/store";
import { Trash2, Plus } from "lucide-react";

const PRESET_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
  "#f59e0b", "#10b981", "#3b82f6", "#06b6d4",
];

const PRESET_ICONS = ["💼", "🏠", "🏃", "📚", "🛒", "🎨", "🎵", "💡", "🌱", "🔧", "✈️", "💪"];

export default function CategoriesPage() {
  const { categories, todos, addCategory, deleteCategory } = useTodoStore();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [icon, setIcon] = useState(PRESET_ICONS[0]);

  const getTodoCount = (catId: string) => todos.filter((t) => t.categoryId === catId).length;
  const getCompletedCount = (catId: string) =>
    todos.filter((t) => t.categoryId === catId && t.status === "completed").length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory({ name: name.trim(), color, icon });
    setName("");
    setColor(PRESET_COLORS[0]);
    setIcon(PRESET_ICONS[0]);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const count = getTodoCount(id);
    if (count > 0) {
      alert(`Cannot delete: this category has ${count} task(s). Reassign them first.`);
      return;
    }
    deleteCategory(id);
  };

  return (
    <>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categories</h1>
          <p className="text-gray-500 mt-1 text-sm">Organize your tasks into groups</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {/* New category form */}
      {showForm && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Create Category</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Finance, Travel..."
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Icon</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_ICONS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={`w-10 h-10 text-xl rounded-lg flex items-center justify-center transition-all ${
                      icon === i ? "bg-indigo-100 ring-2 ring-indigo-400" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      color === c ? "ring-2 ring-offset-2 ring-gray-500 scale-110" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">Preview:</span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {icon} {name || "Category Name"}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const total = getTodoCount(cat.id);
          const done = getCompletedCount(cat.id);
          const rate = total ? Math.round((done / total) * 100) : 0;
          const isDefault = ["work", "personal", "health", "learning", "shopping"].includes(cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${cat.color}18` }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <p className="text-xs text-gray-400">{total} tasks</p>
                  </div>
                </div>
                {!isDefault && (
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{done} completed</span>
                  <span>{rate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${rate}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-2">
                <span
                  className="text-xs px-2 py-1 rounded-lg font-medium"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {total - done} active
                </span>
                <span className="text-xs px-2 py-1 rounded-lg font-medium bg-gray-100 text-gray-500">
                  {done} done
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
