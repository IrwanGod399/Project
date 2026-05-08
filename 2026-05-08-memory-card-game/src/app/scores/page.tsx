"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ScoreEntry, Difficulty, DIFFICULTY_CONFIG, getScores, clearScores, formatTime } from "@/lib/gameData";

const FILTERS: { label: string; value: "all" | Difficulty }[] = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const DIFF_BADGE_COLORS: Record<Difficulty, string> = {
  easy: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  medium: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  hard: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
};

const RANK_ICONS = ["🥇", "🥈", "🥉"];

function ScoreRating({ moves, difficulty }: { moves: number; difficulty: Difficulty }) {
  const thresholds = { easy: [20, 35], medium: [45, 70], hard: [80, 120] };
  const [great, good] = thresholds[difficulty];
  if (moves <= great) return <span className="text-xs text-amber-400 font-semibold">★ Perfect</span>;
  if (moves <= good) return <span className="text-xs text-slate-400">Good</span>;
  return <span className="text-xs text-slate-600">—</span>;
}

export default function ScoresPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [filter, setFilter] = useState<"all" | Difficulty>("all");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setScores(getScores());
  }, []);

  const filtered = filter === "all" ? scores : scores.filter((s) => s.difficulty === filter);

  const handleClear = () => {
    clearScores();
    setScores([]);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold gradient-text mb-2">High Scores</h1>
          <p className="text-slate-400">Your best memory card game performances</p>
        </div>

        {/* Filter & actions */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "glass border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
                {f.value !== "all" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({scores.filter((s) => s.difficulty === f.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          {scores.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Scores List */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center border border-white/10">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-slate-400 text-lg font-medium mb-2">No scores yet</p>
            <p className="text-slate-600 text-sm mb-6">Play a game to record your first score!</p>
            <Link
              href="/game"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              Play Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((score, i) => (
              <div
                key={score.id}
                className={`glass rounded-2xl p-5 border transition-all duration-200 ${
                  i < 3
                    ? "border-amber-500/20 hover:border-amber-400/30"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="text-2xl w-8 text-center shrink-0">
                    {i < 3 ? RANK_ICONS[i] : <span className="text-sm text-slate-600 font-mono">#{i + 1}</span>}
                  </div>

                  {/* Difficulty badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${DIFF_BADGE_COLORS[score.difficulty]}`}>
                    {DIFFICULTY_CONFIG[score.difficulty].label}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 flex-1">
                    <div>
                      <p className="text-xs text-slate-500">Time</p>
                      <p className="font-mono font-bold text-slate-200">{formatTime(score.time)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Moves</p>
                      <p className="font-mono font-bold text-slate-200">{score.moves}</p>
                    </div>
                    <ScoreRating moves={score.moves} difficulty={score.difficulty} />
                  </div>

                  {/* Date */}
                  <p className="text-xs text-slate-600 shrink-0">{score.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-xs text-slate-600 mt-6">
            Showing {filtered.length} score{filtered.length !== 1 ? "s" : ""}
            {filter !== "all" && ` for ${DIFFICULTY_CONFIG[filter as Difficulty].label} mode`}
          </p>
        )}

        {/* Play again CTA */}
        <div className="text-center mt-10">
          <Link
            href="/game"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-semibold text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:scale-105"
          >
            Play Again 🎴
          </Link>
        </div>
      </div>

      {/* Clear Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass rounded-2xl p-8 max-w-sm w-full mx-4 text-center border border-white/20 animate-bounce-in">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Clear All Scores?</h3>
            <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
