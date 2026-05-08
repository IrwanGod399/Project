"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Habit } from "@/lib/types";
import { getHabitById, toggleHabitDate, deleteHabit } from "@/lib/storage";
import {
  getHabitStats,
  getLast30Days,
  colorMap,
  categoryLabels,
  categoryIcons,
  today,
  formatDate,
} from "@/lib/utils";

const DAYS_LABEL = ["S", "M", "T", "W", "T", "F", "S"];

export default function HabitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [mounted, setMounted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setMounted(true);
    const h = getHabitById(id);
    if (!h) router.push("/");
    else setHabit(h);
  }, [id, router]);

  const refresh = () => {
    const h = getHabitById(id);
    if (h) setHabit(h);
  };

  const handleToggle = (date: string) => {
    toggleHabitDate(id, date);
    refresh();
  };

  const handleDelete = () => {
    deleteHabit(id);
    router.push("/");
  };

  if (!mounted || !habit) return null;

  const stats = getHabitStats(habit);
  const last30 = getLast30Days();
  const colors = colorMap[habit.color];
  const todayStr = today();
  const completedToday = habit.completedDates.includes(todayStr);

  // Build calendar weeks for the last 30 days
  const firstDay = new Date(last30[0]);
  const startPad = firstDay.getDay();
  const calGrid: (string | null)[] = [
    ...Array(startPad).fill(null),
    ...last30,
  ];
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < calGrid.length; i += 7) {
    weeks.push(calGrid.slice(i, i + 7));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm font-medium transition-colors"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className={`${colors.light} rounded-2xl p-6 mb-6`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
              {habit.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{habit.name}</h1>
              <p className="text-gray-500 mt-0.5">{habit.description}</p>
              <span className={`inline-flex items-center gap-1 mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-white ${colors.text}`}>
                {categoryIcons[habit.category]} {categoryLabels[habit.category]}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleToggle(todayStr)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 ${
              completedToday
                ? `${colors.bg} border-transparent text-white shadow-md scale-110`
                : "bg-white border-gray-200 text-gray-300 hover:border-gray-300"
            }`}
          >
            ✓
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Current Streak" value={`${stats.currentStreak}d`} icon="🔥" color={colors.text} />
        <StatCard label="Longest Streak" value={`${stats.longestStreak}d`} icon="🏆" color={colors.text} />
        <StatCard label="Completion" value={`${stats.completionRate}%`} icon="📈" color={colors.text} />
        <StatCard label="This Week" value={`${stats.thisWeekCompletions}`} icon="📅" color={colors.text} />
        <StatCard label="This Month" value={`${stats.thisMonthCompletions}`} icon="🗓️" color={colors.text} />
        <StatCard label="Total" value={`${stats.totalCompletions}`} icon="✅" color={colors.text} />
      </div>

      {/* 30-Day Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Last 30 Days</h2>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_LABEL.map((d, i) => (
            <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="space-y-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((date, di) => {
                if (!date) return <div key={di} />;
                const done = habit.completedDates.includes(date);
                const isToday = date === todayStr;
                return (
                  <button
                    key={date}
                    onClick={() => handleToggle(date)}
                    title={date}
                    className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-all duration-150 hover:scale-110 ${
                      done
                        ? `${colors.bg} text-white`
                        : isToday
                        ? "bg-gray-100 text-gray-700 ring-2 ring-indigo-300"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {new Date(date + "T12:00:00").getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">Click any day to toggle completion</p>
      </div>

      {/* Target schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Target Schedule</h2>
        <div className="flex gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div
              key={day}
              className={`flex-1 py-2.5 rounded-xl text-center text-sm font-medium ${
                habit.targetDays.includes(i)
                  ? `${colors.bg} text-white`
                  : "bg-gray-50 text-gray-300"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Delete */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Danger Zone</h2>
        {confirmDelete ? (
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
            >
              Yes, Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Delete This Habit
          </button>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
