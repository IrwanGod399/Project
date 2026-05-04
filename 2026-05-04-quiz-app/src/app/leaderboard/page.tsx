"use client";

import { useEffect, useState } from "react";

interface ScoreEntry {
  date: string;
  score: number;
  total: number;
  pct: number;
}

function getRankBadge(pct: number) {
  if (pct === 100) return { emoji: "🏆", label: "Perfect" };
  if (pct >= 80)  return { emoji: "🌟", label: "Excellent" };
  if (pct >= 60)  return { emoji: "👍", label: "Good" };
  if (pct >= 40)  return { emoji: "📚", label: "Okay" };
  return { emoji: "💪", label: "Keep Going" };
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("brainblast-scores");
    if (stored) setScores(JSON.parse(stored));
  }, []);

  function clearScores() {
    localStorage.removeItem("brainblast-scores");
    setScores([]);
  }

  const best = scores.length > 0 ? Math.max(...scores.map((s) => s.pct)) : null;
  const avg = scores.length > 0
    ? Math.round(scores.reduce((a, s) => a + s.pct, 0) / scores.length)
    : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">🏅 Leaderboard</h1>
            <p className="text-slate-400 text-sm mt-1">Your personal quiz history</p>
          </div>
          <a
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-all"
          >
            ← Home
          </a>
        </div>

        {/* Stats */}
        {scores.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in-up animate-delay-100">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-violet-400">{scores.length}</p>
              <p className="text-xs text-slate-400 mt-1">Quizzes Taken</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">{best}%</p>
              <p className="text-xs text-slate-400 mt-1">Best Score</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-fuchsia-400">{avg}%</p>
              <p className="text-xs text-slate-400 mt-1">Average</p>
            </div>
          </div>
        )}

        {/* Score list */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-in-up animate-delay-200">
          {scores.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-slate-300 font-medium">No scores yet!</p>
              <p className="text-slate-500 text-sm mt-1">Play a quiz to see your history here.</p>
              <a
                href="/"
                className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all"
              >
                Start Playing
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {scores.map((entry, i) => {
                  const badge = getRankBadge(entry.pct);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-2xl w-8 text-center">{badge.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-100">
                            {entry.score}/{entry.total}
                          </span>
                          <span className="text-sm text-slate-400">({entry.pct}%)</span>
                          <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                      </div>
                      {/* mini bar */}
                      <div className="w-20 h-1.5 bg-white/10 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                          style={{ width: `${entry.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={clearScores}
                className="mt-4 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                Clear history
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
