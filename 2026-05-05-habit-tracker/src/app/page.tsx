"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/lib/types";
import { loadHabits, saveHabits, todayStr, getStreak, COLOR_MAP } from "@/lib/habits";
import Link from "next/link";

export default function TodayPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [animating, setAnimating] = useState<string | null>(null);
  const today = todayStr();

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  function toggle(id: string) {
    setHabits((prev) => {
      const updated = prev.map((h) => {
        if (h.id !== id) return h;
        const already = h.completions.includes(today);
        return {
          ...h,
          completions: already
            ? h.completions.filter((d) => d !== today)
            : [...h.completions, today],
        };
      });
      saveHabits(updated);
      return updated;
    });
    setAnimating(id);
    setTimeout(() => setAnimating(null), 300);
  }

  const completedToday = habits.filter((h) => h.completions.includes(today)).length;
  const total = habits.length;
  const pct = total > 0 ? Math.round((completedToday / total) * 100) : 0;

  const dayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-500 text-sm">{dayName}</p>
        <h1 className="text-3xl font-bold text-slate-800">Today&apos;s Habits</h1>
      </div>

      {/* Progress card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">
            {completedToday} of {total} completed
          </span>
          <span className="text-2xl font-bold text-slate-800">{pct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && total > 0 && (
          <p className="mt-3 text-center text-emerald-600 font-semibold text-sm slide-in">
            🎉 All habits done! Amazing work today!
          </p>
        )}
      </div>

      {/* Habit list */}
      {habits.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-5xl mb-4">🌱</p>
          <p className="text-lg font-medium">No habits yet</p>
          <Link href="/habits" className="mt-2 inline-block text-blue-500 hover:underline text-sm">
            Add your first habit →
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => {
            const done = habit.completions.includes(today);
            const streak = getStreak(habit);
            const colors = COLOR_MAP[habit.color] ?? COLOR_MAP.blue;
            return (
              <li key={habit.id}>
                <button
                  onClick={() => toggle(habit.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left
                    ${done
                      ? `${colors.light} border-transparent shadow-sm`
                      : "bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow"
                    }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                      ${done ? `${colors.bg} text-white` : "border-2 border-slate-200"}
                      ${animating === habit.id ? "check-pop" : ""}
                    `}
                  >
                    {done && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{habit.icon}</span>
                      <span className={`font-semibold truncate ${done ? "line-through text-slate-400" : "text-slate-800"}`}>
                        {habit.name}
                      </span>
                    </div>
                  </div>

                  {streak > 0 && (
                    <div className="flex items-center gap-1 text-sm font-medium text-amber-500 flex-shrink-0">
                      <span>🔥</span>
                      <span>{streak}</span>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="text-center">
        <Link href="/habits" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Manage habits →
        </Link>
      </div>
    </div>
  );
}
