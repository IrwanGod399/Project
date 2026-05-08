"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Habit, HabitCategory } from "@/lib/types";
import { getHabits } from "@/lib/storage";
import { isCompletedToday, getStreak, categoryLabels, categoryIcons } from "@/lib/utils";
import HabitCard from "@/components/HabitCard";

const CATEGORIES: (HabitCategory | "all")[] = [
  "all", "health", "fitness", "learning", "mindfulness", "productivity", "social",
];

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filter, setFilter] = useState<HabitCategory | "all">("all");
  const [mounted, setMounted] = useState(false);

  const loadHabits = useCallback(() => {
    setHabits(getHabits());
  }, []);

  useEffect(() => {
    setMounted(true);
    loadHabits();
  }, [loadHabits]);

  if (!mounted) return null;

  const filtered = filter === "all" ? habits : habits.filter((h) => h.category === filter);
  const completedToday = habits.filter(isCompletedToday).length;
  const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
  const bestStreak = Math.max(0, ...habits.map((h) => getStreak(h.completedDates)));

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">{todayStr}</p>
        <h1 className="text-3xl font-bold text-gray-900">
          {completedToday === 0
            ? "Let's get started! 🌱"
            : completedToday === habits.length
            ? "All done! You crushed it! 🎉"
            : `Keep going! ${habits.length - completedToday} left 💪`}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatBox label="Today" value={`${completedToday}/${habits.length}`} sub="completed" color="text-indigo-600" />
        <StatBox label="Rate" value={`${completionRate}%`} sub="today" color="text-emerald-600" />
        <StatBox label="Active" value={`${habits.length}`} sub="habits" color="text-violet-600" />
        <StatBox label="Best Streak" value={`${bestStreak}d`} sub="ongoing" color="text-amber-600" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Daily Progress</span>
          <span className="text-sm font-semibold text-indigo-600">{completionRate}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex mt-3 gap-1">
          {habits.map((habit) => (
            <div
              key={habit.id}
              title={habit.name}
              className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                isCompletedToday(habit) ? "bg-indigo-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {cat !== "all" && <span>{categoryIcons[cat]}</span>}
            <span>{cat === "all" ? "All Habits" : categoryLabels[cat]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🌱</div>
          <p className="font-medium text-gray-500">No habits here yet</p>
          <Link
            href="/habits/new"
            className="mt-4 inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Add your first habit
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onUpdate={loadHabits} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatBox({
  label, value, sub, color,
}: {
  label: string; value: string; sub: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}
