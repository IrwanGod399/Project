"use client";

import { useState, useEffect } from "react";
import { loadResults, type TestResult, type Difficulty } from "@/lib/texts";
import Link from "next/link";

const MEDALS = ["🥇", "🥈", "🥉"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function DiffBadge({ d }: { d: Difficulty }) {
  const map: Record<Difficulty, string> = {
    easy: "bg-green-500/10 text-green-400 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${map[d]}`}>
      {d}
    </span>
  );
}

export default function Leaderboard() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [filter, setFilter] = useState<Difficulty | "all">("all");

  useEffect(() => {
    setResults(loadResults());
  }, []);

  const filtered = filter === "all" ? results : results.filter((r) => r.difficulty === filter);
  const sorted = [...filtered].sort((a, b) => b.wpm - a.wpm).slice(0, 20);

  const avgWpm = results.length
    ? Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length)
    : 0;
  const bestWpm = results.length ? Math.max(...results.map((r) => r.wpm)) : 0;
  const bestAccuracy = results.length ? Math.max(...results.map((r) => r.accuracy)) : 0;

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Best WPM", value: bestWpm || "—", color: "text-cyan-400" },
          { label: "Avg WPM", value: avgWpm || "—", color: "text-violet-400" },
          { label: "Best Accuracy", value: bestAccuracy ? `${bestAccuracy}%` : "—", color: "text-green-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center">
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-slate-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-sm">Filter:</span>
        {(["all", "easy", "medium", "hard"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm border transition-all ${
              filter === f
                ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                : "text-slate-500 border-slate-700 hover:border-slate-500"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-slate-600 text-sm">{sorted.length} result{sorted.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-16 text-center space-y-4">
          <div className="text-5xl">⌨️</div>
          <p className="text-slate-400 text-lg">No results yet!</p>
          <p className="text-slate-600 text-sm">Complete a test and save your score to see it here.</p>
          <Link
            href="/test"
            className="inline-block mt-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all"
          >
            Take a Test
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 text-left w-10">#</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-right">WPM</th>
                <th className="px-5 py-3 text-right">Accuracy</th>
                <th className="px-5 py-3 text-right">Difficulty</th>
                <th className="px-5 py-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-4 text-slate-500">
                    {i < 3 ? <span>{MEDALS[i]}</span> : <span className="text-slate-600">{i + 1}</span>}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-200">{r.name}</td>
                  <td className="px-5 py-4 text-right font-bold text-cyan-400">{r.wpm}</td>
                  <td className="px-5 py-4 text-right text-green-400">{r.accuracy}%</td>
                  <td className="px-5 py-4 text-right">
                    <DiffBadge d={r.difficulty} />
                  </td>
                  <td className="px-5 py-4 text-right text-slate-600">{formatDate(r.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => {
              if (confirm("Clear all leaderboard data?")) {
                localStorage.removeItem("typeracer_results");
                setResults([]);
              }
            }}
            className="text-slate-600 hover:text-red-400 text-sm transition-colors underline underline-offset-2"
          >
            Clear all results
          </button>
        </div>
      )}
    </div>
  );
}
