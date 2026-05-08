"use client";

import { useMemo } from "react";
import { useTodoStore } from "@/lib/store";
import { Priority } from "@/lib/types";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}

function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{value}</span>
    </div>
  );
}

export default function StatsPage() {
  const { todos, categories } = useTodoStore();

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.status === "completed").length;
    const active = todos.filter((t) => t.status === "active").length;
    const overdue = todos.filter(
      (t) => t.status === "active" && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;

    const byCategory = categories.map((cat) => {
      const catTodos = todos.filter((t) => t.categoryId === cat.id);
      const catCompleted = catTodos.filter((t) => t.status === "completed").length;
      return { cat, total: catTodos.length, completed: catCompleted };
    }).sort((a, b) => b.total - a.total);

    const byPriority: Record<Priority, { total: number; completed: number }> = {
      high: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      low: { total: 0, completed: 0 },
    };
    todos.forEach((t) => {
      byPriority[t.priority].total++;
      if (t.status === "completed") byPriority[t.priority].completed++;
    });

    const allTags: Record<string, number> = {};
    todos.forEach((t) => t.tags.forEach((tag) => { allTags[tag] = (allTags[tag] ?? 0) + 1; }));
    const topTags = Object.entries(allTags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return { total, completed, active, overdue, completionRate, byCategory, byPriority, topTags };
  }, [todos, categories]);

  const priorityConfig: Record<Priority, { label: string; color: string; bar: string }> = {
    high: { label: "High", color: "text-red-600", bar: "bg-red-400" },
    medium: { label: "Medium", color: "text-amber-600", bar: "bg-amber-400" },
    low: { label: "Low", color: "text-emerald-600", bar: "bg-emerald-400" },
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-gray-500 mt-1 text-sm">Your productivity at a glance</p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Tasks" value={stats.total} color="text-gray-900" />
        <StatCard
          label="Completed"
          value={stats.completed}
          sub={`${stats.completionRate}% done`}
          color="text-indigo-600"
        />
        <StatCard label="Active" value={stats.active} sub="in progress" color="text-violet-600" />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          sub={stats.overdue === 0 ? "All on track 🎉" : "Need attention"}
          color={stats.overdue > 0 ? "text-red-600" : "text-emerald-600"}
        />
      </div>

      {/* Completion ring + by category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Overall completion */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Overall Completion</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#grad)" strokeWidth="3"
                  strokeDasharray={`${stats.completionRate} ${100 - stats.completionRate}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{stats.completionRate}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-sm text-gray-600">Completed ({stats.completed})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="text-sm text-gray-600">Remaining ({stats.active})</span>
              </div>
            </div>
          </div>
        </div>

        {/* By priority */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">By Priority</h2>
          <div className="space-y-4">
            {(["high", "medium", "low"] as Priority[]).map((p) => {
              const d = stats.byPriority[p];
              const cfg = priorityConfig[p];
              const rate = d.total ? Math.round((d.completed / d.total) * 100) : 0;
              return (
                <div key={p}>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className={cfg.color}>{cfg.label}</span>
                    <span className="text-gray-400">{d.completed}/{d.total} · {rate}%</span>
                  </div>
                  <MiniBar value={d.completed} max={d.total} color={cfg.bar} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* By category */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-4">By Category</h2>
        <div className="space-y-4">
          {stats.byCategory.map(({ cat, total, completed }) => {
            const rate = total ? Math.round((completed / total) * 100) : 0;
            return (
              <div key={cat.id}>
                <div className="flex justify-between items-center text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span>{cat.icon}</span> {cat.name}
                  </span>
                  <span className="text-gray-400">{completed}/{total} done · {rate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${rate}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top tags */}
      {stats.topTags.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {stats.topTags.map(([tag, count]) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium"
              >
                #{tag}
                <span className="bg-indigo-200 text-indigo-800 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
