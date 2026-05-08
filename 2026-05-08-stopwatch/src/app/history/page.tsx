"use client";

import { useState, useEffect } from "react";
import { SAMPLE_SESSIONS, formatTime, formatDuration } from "@/lib/utils";
import type { Session } from "@/lib/types";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chronotrack-sessions") || "[]");
    setSessions([...stored, ...SAMPLE_SESSIONS]);
  }, []);

  const deleteSession = (id: string) => {
    const stored: Session[] = JSON.parse(localStorage.getItem("chronotrack-sessions") || "[]");
    const updated = stored.filter((s) => s.id !== id);
    localStorage.setItem("chronotrack-sessions", JSON.stringify(updated));
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => {
    localStorage.removeItem("chronotrack-sessions");
    setSessions([...SAMPLE_SESSIONS]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Session History</h1>
          <p className="text-slate-500 text-sm mt-0.5">{sessions.length} sessions recorded</p>
        </div>
        {sessions.length > SAMPLE_SESSIONS.length && (
          <button
            onClick={clearAll}
            className="text-xs text-red-400 hover:text-red-300 border border-red-900 hover:border-red-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            Clear mine
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <div className="text-5xl mb-4">⏱</div>
          <p>No sessions yet. Start the stopwatch and save a session!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/40 transition-colors text-left"
                onClick={() => setExpanded(expanded === session.id ? null : session.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">{session.name}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(session.date).toLocaleString()} · {session.laps.length} lap{session.laps.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-violet-400 text-lg">
                    {formatTime(session.duration)}
                  </span>
                  <span className="text-slate-600 text-sm">{expanded === session.id ? "▲" : "▼"}</span>
                </div>
              </button>

              {expanded === session.id && (
                <div className="border-t border-slate-800 fade-in">
                  {session.laps.length > 0 ? (
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-slate-500 uppercase tracking-wider">
                          <th className="px-4 py-2 text-left">Lap</th>
                          <th className="px-4 py-2 text-right">Lap Time</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {session.laps.map((lap) => (
                          <tr key={lap.number} className="border-t border-slate-800/50 hover:bg-slate-800/20">
                            <td className="px-4 py-2 font-mono text-slate-400">#{lap.number}</td>
                            <td className="px-4 py-2 text-right font-mono text-slate-200">{formatTime(lap.lapTime)}</td>
                            <td className="px-4 py-2 text-right font-mono text-slate-500">{formatTime(lap.totalTime)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="px-4 py-3 text-sm text-slate-600">No laps recorded.</p>
                  )}
                  <div className="px-4 py-2 flex justify-between items-center border-t border-slate-800/50">
                    <span className="text-xs text-slate-600">Duration: {formatDuration(session.duration)}</span>
                    {!SAMPLE_SESSIONS.find((s) => s.id === session.id) && (
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-xs text-red-500 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
