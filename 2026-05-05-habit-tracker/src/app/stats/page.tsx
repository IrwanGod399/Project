"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/lib/types";
import { loadHabits, getLast7Days, getStreak, getCompletionRate, COLOR_MAP } from "@/lib/habits";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function WeekGrid({ habit }: { habit: Habit }) {
  const days = getLast7Days();
  const colors = COLOR_MAP[habit.color] ?? COLOR_MAP.blue;
  return (
    <div className="flex gap-1">
      {days.map((d) => {
        const done = habit.completions.includes(d);
        const label = DAY_LABELS[new Date(d + "T12:00:00").getDay()];
        return (
          <div key={d} className="flex flex-col items-center gap-0.5">
            <div
              className={`w-7 h-7 rounded-md transition-colors ${done ? colors.bg : "bg-slate-100"}`}
              title={d}
            />
            <span className="text-[10px] text-slate-400">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function StatsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  const totalCompletions = habits.reduce((s, h) => s + h.completions.length, 0);
  const bestStreak = habits.reduce((best, h) => Math.max(best, getStreak(h)), 0);
  const avgRate = habits.length
    ? Math.round(habits.reduce((s, h) => s + getCompletionRate(h, 7), 0) / habits.length)
    : 0;

  const days7 = getLast7Days();

  const dailyCompletions = days7.map((d) => ({
    date: d,
    count: habits.filter((h) => h.completions.includes(d)).length,
    label: DAY_LABELS[new Date(d + "T12:00:00").getDay()],
  }));

  const maxCount = Math.max(...dailyCompletions.map((d) => d.count), 1);

  const topHabits = [...habits]
    .sort((a, b) => getCompletionRate(b, 7) - getCompletionRate(a, 7))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Statistics</h1>
        <p className="text-slate-500 text-sm mt-1">Your progress at a glance</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-3xl font-bold text-slate-800">{totalCompletions}</p>
          <p className="text-xs text-slate-500 mt-1">Total check-ins</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-3xl font-bold text-amber-500">{bestStreak}</p>
          <p className="text-xs text-slate-500 mt-1">🔥 Best streak</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-3xl font-bold text-emerald-600">{avgRate}%</p>
          <p className="text-xs text-slate-500 mt-1">7-day avg</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-base font-semibold text-slate-700 mb-4">Daily Completions (Last 7 Days)</h2>
        <div className="flex items-end gap-3 h-32">
          {dailyCompletions.map((d) => {
            const heightPct = maxCount > 0 ? (d.count / maxCount) * 100 : 0;
            const isToday = d.date === new Date().toISOString().split("T")[0];
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-500">{d.count > 0 ? d.count : ""}</span>
                <div className="w-full flex items-end" style={{ height: "80px" }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${isToday ? "bg-emerald-500" : "bg-slate-200"}`}
                    style={{ height: `${Math.max(heightPct, d.count > 0 ? 8 : 0)}%` }}
                  />
                </div>
                <span className={`text-xs ${isToday ? "font-bold text-emerald-600" : "text-slate-400"}`}>{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-habit breakdown */}
      {habits.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Habit Breakdown</h2>
          <ul className="space-y-4">
            {habits.map((habit) => {
              const rate = getCompletionRate(habit, 7);
              const streak = getStreak(habit);
              const colors = COLOR_MAP[habit.color] ?? COLOR_MAP.blue;
              return (
                <li key={habit.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span>{habit.icon}</span>
                      <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{habit.name}</span>
                      {streak > 0 && (
                        <span className="text-xs text-amber-500">🔥{streak}</span>
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${colors.text}`}>{rate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${colors.bg} transition-all duration-500`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <div className="mt-2">
                    <WeekGrid habit={habit} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Top performers */}
      {topHabits.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-base font-semibold text-slate-700 mb-3">🏆 Top Habits This Week</h2>
          <ol className="space-y-2">
            {topHabits.map((h, i) => {
              const colors = COLOR_MAP[h.color] ?? COLOR_MAP.blue;
              const rate = getCompletionRate(h, 7);
              const medals = ["🥇", "🥈", "🥉"];
              return (
                <li key={h.id} className="flex items-center gap-3">
                  <span className="text-xl">{medals[i]}</span>
                  <span className="text-xl">{h.icon}</span>
                  <span className="flex-1 text-sm font-medium text-slate-700">{h.name}</span>
                  <span className={`text-sm font-bold ${colors.text}`}>{rate}%</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {habits.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-5xl mb-4">📊</p>
          <p className="text-lg font-medium">No data yet</p>
          <p className="text-sm mt-1">Start tracking habits to see your stats</p>
        </div>
      )}
    </div>
  );
}
