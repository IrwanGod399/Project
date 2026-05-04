"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ScoreEntry {
  name: string;
  score: number;
  category: string;
  date: string;
}

const categoryIcons: Record<string, string> = {
  Animals: "🦁",
  Food: "🍕",
  Science: "🔬",
  Sports: "⚽",
  Countries: "🌍",
  random: "🎲",
};

const MOCK_SCORES: ScoreEntry[] = [
  { name: "WordWizard", score: 924, category: "Science", date: "2026-05-03T10:00:00Z" },
  { name: "LexiPro", score: 876, category: "Animals", date: "2026-05-03T11:30:00Z" },
  { name: "ScrambleMaster", score: 812, category: "random", date: "2026-05-02T09:15:00Z" },
  { name: "QuickFingers", score: 760, category: "Sports", date: "2026-05-04T08:00:00Z" },
  { name: "VocabKing", score: 748, category: "Countries", date: "2026-05-01T14:20:00Z" },
  { name: "LetterHunter", score: 695, category: "Food", date: "2026-05-03T16:45:00Z" },
  { name: "Anagram99", score: 640, category: "Science", date: "2026-04-30T12:00:00Z" },
  { name: "WordNerd", score: 588, category: "Animals", date: "2026-04-29T10:00:00Z" },
];

function medalFor(rank: number) {
  if (rank === 0) return "🥇";
  if (rank === 1) return "🥈";
  if (rank === 2) return "🥉";
  return `#${rank + 1}`;
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const stored: ScoreEntry[] = JSON.parse(
      localStorage.getItem("scramble_scores") || "[]"
    );
    const combined = [...MOCK_SCORES, ...stored]
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
    setScores(combined);
  }, []);

  const categories = ["all", "Animals", "Food", "Science", "Sports", "Countries", "random"];

  const filtered =
    filter === "all" ? scores : scores.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm">
          ← Back to Home
        </Link>

        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl">🏆</div>
          <h1 className="text-4xl font-extrabold">Leaderboard</h1>
          <p className="mt-2 text-gray-400">Top scores across all categories</p>
        </div>

        {/* Top 3 podium */}
        {filtered.length >= 3 && (
          <div className="mb-8 grid grid-cols-3 gap-3">
            {[filtered[1], filtered[0], filtered[2]].map((entry, podiumIdx) => {
              const realRank = podiumIdx === 0 ? 1 : podiumIdx === 1 ? 0 : 2;
              const heights = ["h-24", "h-32", "h-20"];
              return (
                <div key={realRank} className="text-center">
                  <div className="mb-1 text-xs font-semibold text-gray-400 truncate px-1">
                    {entry.name}
                  </div>
                  <div
                    className={`${heights[podiumIdx]} flex flex-col items-center justify-end rounded-t-xl pb-3 ${
                      realRank === 0
                        ? "bg-gradient-to-b from-yellow-500/30 to-yellow-600/20 border border-yellow-500/30"
                        : realRank === 1
                        ? "bg-gradient-to-b from-gray-400/20 to-gray-500/10 border border-gray-500/30"
                        : "bg-gradient-to-b from-orange-700/20 to-orange-800/10 border border-orange-700/30"
                    }`}
                  >
                    <div className="text-2xl">{medalFor(realRank)}</div>
                    <div className="text-sm font-bold text-indigo-400">{entry.score}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {cat === "all" ? "All" : `${categoryIcons[cat]} ${cat}`}
            </button>
          ))}
        </div>

        {/* Score list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No scores yet. Be the first to play!
            </div>
          )}
          {filtered.map((entry, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
                i < 3
                  ? "border-indigo-700/40 bg-indigo-900/10"
                  : "border-gray-800 bg-gray-900/50"
              }`}
            >
              <div className="w-8 text-center text-lg font-bold">
                {typeof medalFor(i) === "string" && (medalFor(i).length <= 2)
                  ? medalFor(i)
                  : <span className="text-sm text-gray-500">{medalFor(i)}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{entry.name}</div>
                <div className="text-xs text-gray-500">
                  {categoryIcons[entry.category]} {entry.category === "random" ? "Random Mix" : entry.category} ·{" "}
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-xl font-extrabold text-indigo-400">{entry.score}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/game"
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-bold text-white transition hover:scale-105"
          >
            Play & Beat These Scores!
          </Link>
        </div>
      </div>
    </div>
  );
}
