"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LeaderboardEntry, Difficulty, DIFFICULTY_CONFIGS, getLeaderboard } from "@/lib/gameUtils";

const MEDAL = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<Difficulty | "all">("all");

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  const filtered = filter === "all" ? entries : entries.filter((e) => e.difficulty === filter);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-4xl font-extrabold mb-2 neon-text" style={{ color: "#a78bfa" }}>Leaderboard</h1>
          <p style={{ color: "#64748b" }}>Top scores from all players</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          {(["all", "easy", "medium", "hard"] as const).map((f) => {
            const active = filter === f;
            const cfg = f !== "all" ? DIFFICULTY_CONFIGS[f] : null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: active
                    ? cfg ? `${cfg.color}22` : "rgba(124,58,237,0.2)"
                    : "rgba(255,255,255,0.03)",
                  border: active
                    ? `1px solid ${cfg ? cfg.color + "55" : "rgba(124,58,237,0.5)"}`
                    : "1px solid rgba(255,255,255,0.1)",
                  color: active ? (cfg ? cfg.color : "#a78bfa") : "#64748b",
                }}
              >
                {cfg ? `${cfg.emoji} ${cfg.label}` : "All Difficulties"}
              </button>
            );
          })}
        </div>

        {/* Stats summary */}
        {entries.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Games", value: entries.length.toString(), icon: "🎮" },
              {
                label: "Top Score",
                value: entries[0]?.score.toLocaleString() ?? "—",
                icon: "⭐",
              },
              {
                label: "Best Time",
                value: formatTime(Math.min(...entries.map((e) => e.timeSeconds))),
                icon: "⚡",
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-bold text-lg" style={{ color: "#e2e8f0" }}>{value}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard table */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#e2e8f0" }}>No scores yet!</h2>
            <p className="mb-6" style={{ color: "#64748b" }}>
              {filter === "all"
                ? "Be the first to play and save your score."
                : `No ${DIFFICULTY_CONFIGS[filter].label} scores yet.`}
            </p>
            <Link
              href="/game"
              className="inline-block px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", textDecoration: "none" }}
            >
              Play Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((entry, idx) => {
              const cfg = DIFFICULTY_CONFIGS[entry.difficulty];
              const rank = idx + 1;
              return (
                <div
                  key={entry.id}
                  className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    border: rank <= 3
                      ? `1px solid ${rank === 1 ? "#ffd70033" : rank === 2 ? "#c0c0c033" : "#cd7f3233"}`
                      : "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  {/* Rank */}
                  <div className="w-10 text-center font-bold text-xl flex-shrink-0">
                    {rank <= 3 ? MEDAL[rank - 1] : <span style={{ color: "#475569" }}>#{rank}</span>}
                  </div>

                  {/* Name + difficulty */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate" style={{ color: "#e2e8f0" }}>{entry.name}</div>
                    <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: cfg.color }}>
                      <span>{cfg.emoji}</span>
                      <span>{cfg.label}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6 text-center">
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#475569" }}>Attempts</div>
                      <div className="font-semibold" style={{ color: "#e2e8f0" }}>
                        {entry.attempts}/{DIFFICULTY_CONFIGS[entry.difficulty].maxAttempts}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#475569" }}>Time</div>
                      <div className="font-semibold" style={{ color: "#06b6d4" }}>{formatTime(entry.timeSeconds)}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#475569" }}>Date</div>
                      <div className="text-xs" style={{ color: "#64748b" }}>{formatDate(entry.date)}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-extrabold neon-text" style={{ color: "#a78bfa" }}>
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#475569" }}>pts</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/game"
            className="inline-block px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 neon-pulse"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", textDecoration: "none" }}
          >
            Play & Claim Your Spot
          </Link>
        </div>
      </div>
    </div>
  );
}
