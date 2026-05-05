"use client";
import { useState, useEffect } from "react";
import { Session, MODE_LABELS, MODE_COLORS } from "@/lib/types";
import { getSessions, clearSessions } from "@/lib/storage";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m}m`;
}

function groupByDay(sessions: Session[]): Record<string, Session[]> {
  return sessions.reduce((acc, s) => {
    const day = s.completedAt.slice(0, 10);
    if (!acc[day]) acc[day] = [];
    acc[day].push(s);
    return acc;
  }, {} as Record<string, Session[]>);
}

export default function StatsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<"all" | "focus" | "short" | "long">("all");

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const filtered = filter === "all" ? sessions : sessions.filter((s) => s.mode === filter);

  const focusSessions = sessions.filter((s) => s.mode === "focus");
  const totalFocusMinutes = Math.floor(
    focusSessions.reduce((acc, s) => acc + s.duration, 0) / 60
  );
  const totalPomodoros = focusSessions.length;
  const streak = calculateStreak(sessions);

  function calculateStreak(sessions: Session[]): number {
    if (!sessions.length) return 0;
    const days = [
      ...new Set(
        sessions
          .filter((s) => s.mode === "focus")
          .map((s) => s.completedAt.slice(0, 10))
      ),
    ].sort().reverse();

    let streak = 0;
    const today = new Date().toISOString().slice(0, 10);
    let current = today;

    for (const day of days) {
      if (day === current) {
        streak++;
        const d = new Date(current);
        d.setDate(d.getDate() - 1);
        current = d.toISOString().slice(0, 10);
      } else {
        break;
      }
    }
    return streak;
  }

  const grouped = groupByDay(filtered);
  const sortedDays = Object.keys(grouped).sort().reverse();

  function handleClear() {
    if (confirm("Clear all session history?")) {
      clearSessions();
      setSessions([]);
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-xl mx-auto fade-in">
        <h1 className="text-2xl font-bold text-white mb-8">Your Stats</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{totalPomodoros}</div>
            <div className="text-white/40 text-xs mt-1">Pomodoros</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-400">{totalFocusMinutes}</div>
            <div className="text-white/40 text-xs mt-1">Focus mins</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{streak}</div>
            <div className="text-white/40 text-xs mt-1">Day streak</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2 mb-6">
          {(["all", "focus", "short", "long"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? "bg-white/15 text-white"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {f === "all" ? "All" : MODE_LABELS[f]}
            </button>
          ))}
          {sessions.length > 0 && (
            <button
              onClick={handleClear}
              className="ml-auto px-3 py-1 rounded-full text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Session history */}
        {sortedDays.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🍅</div>
            <p className="text-white/30">No sessions yet. Start your first pomodoro!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDays.map((day) => (
              <div key={day}>
                <div className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">
                  {new Date(day + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="space-y-2">
                  {grouped[day].map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: MODE_COLORS[session.mode] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {session.label}
                        </div>
                        <div className="text-white/30 text-xs">
                          {new Date(session.completedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <div className="text-white/40 text-xs font-medium shrink-0">
                        {formatDuration(session.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
