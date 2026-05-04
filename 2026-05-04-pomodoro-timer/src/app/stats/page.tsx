"use client";

import { useState, useEffect } from "react";
import { getSessions, Session } from "@/lib/storage";

function fmtTime(minutes: number): string {
  if (minutes === 0) return "0m";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function dateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function calcStreak(sessions: Session[]): number {
  const focusDates = new Set(
    sessions.filter((s) => s.type === "focus").map((s) => s.completedAt.split("T")[0])
  );
  if (focusDates.size === 0) return 0;

  let streak = 0;
  const today = dateKey(new Date());
  const yesterday = dateKey(new Date(Date.now() - 86400000));

  const start = focusDates.has(today) ? today : focusDates.has(yesterday) ? yesterday : null;
  if (!start) return 0;

  const cursor = new Date(start);
  while (focusDates.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function StatsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const today = dateKey(new Date());
  const todayFocus = sessions.filter((s) => s.type === "focus" && s.completedAt.startsWith(today));
  const allFocus = sessions.filter((s) => s.type === "focus");
  const todayMinutes = todayFocus.reduce((sum, s) => sum + s.duration, 0);
  const totalMinutes = allFocus.reduce((sum, s) => sum + s.duration, 0);
  const streak = calcStreak(sessions);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = dateKey(d);
    const daySessions = sessions.filter((s) => s.type === "focus" && s.completedAt.startsWith(key));
    return {
      key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: key === today,
      count: daySessions.length,
      minutes: daySessions.reduce((sum, s) => sum + s.duration, 0),
    };
  });
  const maxMinutes = Math.max(...weekDays.map((d) => d.minutes), 1);

  const typeLabel: Record<string, string> = {
    focus: "Focus",
    "short-break": "Short Break",
    "long-break": "Long Break",
  };
  const typeDot: Record<string, string> = {
    focus: "bg-rose-500",
    "short-break": "bg-emerald-500",
    "long-break": "bg-blue-500",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Statistics</h1>
      <p className="text-slate-500 text-sm mb-8">Track your focus sessions and build momentum.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { value: todayFocus.length.toString(), label: "Today", sub: "sessions" },
          { value: fmtTime(todayMinutes), label: "Today's time", sub: "focused" },
          { value: allFocus.length.toString(), label: "All time", sub: "sessions" },
          { value: `${streak}`, label: "Day streak", sub: streak === 1 ? "day" : "days", emoji: streak > 0 ? "🔥" : "" },
        ].map((card) => (
          <div key={card.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="text-2xl font-bold text-white">
              {card.value}
              {card.emoji && <span className="ml-1">{card.emoji}</span>}
            </div>
            <div className="text-slate-500 text-xs mt-1">{card.label}</div>
            <div className="text-slate-600 text-xs">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-white">This Week</h2>
          <span className="text-xs text-slate-500">{fmtTime(totalMinutes)} total</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {weekDays.map((day) => (
            <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
                {day.minutes > 0 && (
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      day.isToday ? "bg-rose-500" : "bg-rose-500/50"
                    }`}
                    style={{
                      height: `${Math.max(4, (day.minutes / maxMinutes) * 80)}px`,
                    }}
                    title={`${day.count} sessions · ${fmtTime(day.minutes)}`}
                  />
                )}
                {day.minutes === 0 && <div className="w-full h-1 bg-slate-800 rounded" />}
              </div>
              <span
                className={`text-xs font-medium ${day.isToday ? "text-rose-400" : "text-slate-600"}`}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Session history */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🍅</div>
            <p className="text-slate-500 text-sm">No sessions yet.</p>
            <p className="text-slate-600 text-xs mt-1">Start your first Pomodoro to see stats here.</p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-slate-800/60">
            {sessions.slice(0, 20).map((s) => {
              const time = new Date(s.completedAt);
              return (
                <div key={s.id} className="flex items-center gap-3 py-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${typeDot[s.type]}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white">{typeLabel[s.type]}</span>
                    {s.task && (
                      <span className="text-slate-500 text-sm ml-2 truncate">— {s.task}</span>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-slate-400">{s.duration}m</div>
                    <div className="text-xs text-slate-600">
                      {time.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
