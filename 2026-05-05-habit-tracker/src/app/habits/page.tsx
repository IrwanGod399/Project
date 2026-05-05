"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/lib/types";
import { loadHabits, saveHabits, getStreak, getCompletionRate, COLOR_MAP } from "@/lib/habits";

const ICONS = ["🏃", "📚", "🧘", "💧", "📵", "✍️", "🍎", "🎸", "🌿", "💪", "😴", "🧹", "🐕", "🎯", "🖊️"];
const COLORS = Object.keys(COLOR_MAP);

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🏃");
  const [color, setColor] = useState("emerald");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  function openAdd() {
    setEditId(null);
    setName("");
    setIcon("🏃");
    setColor("emerald");
    setShowForm(true);
  }

  function openEdit(h: Habit) {
    setEditId(h.id);
    setName(h.name);
    setIcon(h.icon);
    setColor(h.color);
    setShowForm(true);
  }

  function save() {
    if (!name.trim()) return;
    setHabits((prev) => {
      let updated: Habit[];
      if (editId) {
        updated = prev.map((h) => h.id === editId ? { ...h, name: name.trim(), icon, color } : h);
      } else {
        const newHabit: Habit = {
          id: generateId(),
          name: name.trim(),
          icon,
          color,
          createdAt: new Date().toISOString().split("T")[0],
          completions: [],
        };
        updated = [...prev, newHabit];
      }
      saveHabits(updated);
      return updated;
    });
    setShowForm(false);
  }

  function confirmDelete(id: string) {
    setDeleteId(id);
  }

  function doDelete() {
    if (!deleteId) return;
    setHabits((prev) => {
      const updated = prev.filter((h) => h.id !== deleteId);
      saveHabits(updated);
      return updated;
    });
    setDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Habits</h1>
          <p className="text-slate-500 text-sm mt-1">{habits.length} habits tracked</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          <span>+</span> Add Habit
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 slide-in">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {editId ? "Edit Habit" : "New Habit"}
            </h2>

            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && save()}
              placeholder="e.g. Morning Run"
              maxLength={40}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 mb-4"
              autoFocus
            />

            <label className="block text-sm font-medium text-slate-600 mb-2">Icon</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {ICONS.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all
                    ${icon === ic ? "bg-slate-900 scale-110" : "bg-slate-100 hover:bg-slate-200"}`}
                >
                  {ic}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium text-slate-600 mb-2">Color</label>
            <div className="flex flex-wrap gap-2 mb-6">
              {COLORS.map((c) => {
                const col = COLOR_MAP[c];
                return (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full ${col.bg} transition-all
                      ${color === c ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "opacity-70 hover:opacity-100"}`}
                  />
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-slate-200 text-slate-600 rounded-xl py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={!name.trim()}
                className="flex-1 bg-slate-900 text-white rounded-xl py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                {editId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 slide-in text-center">
            <p className="text-3xl mb-2">🗑️</p>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Delete Habit?</h2>
            <p className="text-slate-500 text-sm mb-5">All progress will be lost.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-slate-200 text-slate-600 rounded-xl py-2 text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="flex-1 bg-rose-500 text-white rounded-xl py-2 text-sm font-medium hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Habit list */}
      {habits.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-lg font-medium">No habits yet</p>
          <p className="text-sm mt-1">Click &ldquo;Add Habit&rdquo; to get started</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => {
            const streak = getStreak(habit);
            const rate = getCompletionRate(habit, 7);
            const colors = COLOR_MAP[habit.color] ?? COLOR_MAP.blue;
            return (
              <li
                key={habit.id}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {habit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{habit.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {streak > 0 && (
                      <span className="text-xs text-amber-500 font-medium">🔥 {streak} day streak</span>
                    )}
                    <span className="text-xs text-slate-400">{rate}% this week</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(habit)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-sm"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => confirmDelete(habit.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors text-sm"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
