"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { getHabits } from "@/lib/storage";
import {
  getHabitStats,
  getLast30Days,
  colorMap,
  categoryLabels,
  categoryIcons,
  isCompletedToday,
  getStreak,
} from "@/lib/utils";

export default function StatsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHabits(getHabits());
  }, []);

  if (!mounted) return null;

  const last30 = getLast30Days();
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const avgStreak = habits.length
    ? Math.round(habits.reduce((sum, h) => sum + getStreak(h.completedDates), 0) / habits.length)
    : 0;
  const completedTodayCount = habits.filter(isCompletedToday).length;

  // Build heatmap: per-day count of completed habits over last 30 days
  const heatmap = last30.map((date) => ({
    date,
    count: habits.filter((h) => h.completedDates.includes(date)).length,
  }));
  const maxCount = Math.max(...heatmap.map((d) => d.count), 1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-500 mt-1">Overview of all your habits</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <BigStat label="Total Habits" value={habits.length} icon="🎯" />
        <BigStat label="Total Check-ins" value={totalCompletions} icon="✅" />
        <BigStat label="Avg. Streak" value={`${avgStreak}d`} icon="🔥" />
        <BigStat label="Done Today" value={`${completedTodayCount}/${habits.length}`} icon="📅" />
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-5">Activity Heatmap – Last 30 Days</h2>
        <div className="flex items-end gap-1">
          {heatmap.map(({ date, count }) => {
            const intensity = count === 0 ? 0 : Math.ceil((count / maxCount) * 4);
            const heightMap = ["h-2", "h-4", "h-6", "h-8", "h-10"];
            const colorMap2 = [
              "bg-gray-100",
              "bg-indigo-100",
              "bg-indigo-300",
              "bg-indigo-500",
              "bg-indigo-700",
            ];
            const d = new Date(date + "T12:00:00");
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-1" title={`${date}: ${count} habits`}>
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${heightMap[intensity]} ${colorMap2[intensity]}`}
                />
                {d.getDate() % 5 === 1 && (
                  <span className="text-xs text-gray-300">{d.getDate()}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-gray-400">Less</span>
          {["bg-gray-100", "bg-indigo-100", "bg-indigo-300", "bg-indigo-500", "bg-indigo-700"].map((c) => (
            <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>

      {/* Per-habit breakdown */}
      <h2 className="text-base font-semibold text-gray-800 mb-4">Habit Breakdown</h2>
      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📊</div>
            <p>No habits yet.</p>
            <Link
              href="/habits/new"
              className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
            >
              Add a habit
            </Link>
          </div>
        ) : (
          habits.map((habit) => {
            const stats = getHabitStats(habit);
            const colors = colorMap[habit.color];
            const weekDots = last30.slice(-7).map((date) => habit.completedDates.includes(date));

            return (
              <Link href={`/habits/${habit.id}`} key={habit.id}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colors.light} shrink-0`}>
                      {habit.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="font-semibold text-gray-900">{habit.name}</span>
                          <span className="ml-2 text-xs text-gray-400">
                            {categoryIcons[habit.category]} {categoryLabels[habit.category]}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {stats.currentStreak > 0 ? `🔥 ${stats.currentStreak}d` : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.bg} rounded-full transition-all`}
                            style={{ width: `${stats.completionRate}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">{stats.completionRate}%</span>
                      </div>

                      <div className="flex gap-1 mt-2">
                        {weekDots.map((done, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-md text-xs flex items-center justify-center font-medium ${
                              done ? `${colors.bg} text-white` : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {done ? "✓" : ""}
                          </div>
                        ))}
                        <span className="text-xs text-gray-400 ml-1 self-center">last 7d</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-50">
                    <MiniStat label="Longest" value={`${stats.longestStreak}d`} />
                    <MiniStat label="This Month" value={stats.thisMonthCompletions} />
                    <MiniStat label="Total" value={stats.totalCompletions} />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

function BigStat({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center">
      <div className="text-base font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}
