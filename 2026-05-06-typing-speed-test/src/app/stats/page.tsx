"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TestResult, Difficulty } from "@/lib/types";
import { getResults, clearResults, getBestResult, getAverageWpm } from "@/lib/storage";

const DIFF_COLORS: Record<Difficulty, string> = {
  easy: "text-green-400 bg-green-950/50",
  medium: "text-yellow-400 bg-yellow-950/50",
  hard: "text-red-400 bg-red-950/50",
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(s: number) {
  return s < 60 ? `${Math.round(s)}s` : `${Math.round(s / 60)}m ${Math.round(s % 60)}s`;
}

export default function StatsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [best, setBest] = useState<TestResult | null>(null);
  const [avgWpm, setAvgWpm] = useState(0);
  const [filter, setFilter] = useState<Difficulty | "all">("all");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setResults(getResults());
    setBest(getBestResult());
    setAvgWpm(getAverageWpm());
  }, []);

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearResults();
    setResults([]);
    setBest(null);
    setAvgWpm(0);
    setConfirmClear(false);
  };

  const filtered =
    filter === "all" ? results : results.filter((r) => r.difficulty === filter);

  const totalTests = results.length;
  const totalChars = results.reduce((s, r) => s + r.totalChars, 0);
  const avgAccuracy =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.accuracy, 0) / results.length)
      : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Your Stats</h1>
          <p className="text-sm text-gray-400">{totalTests} tests recorded</p>
        </div>
        <Link
          href="/test"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          New Test →
        </Link>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="text-6xl">📊</div>
          <h2 className="text-xl font-semibold text-gray-300">No tests yet</h2>
          <p className="text-gray-500">
            Complete a typing test to see your statistics here.
          </p>
          <Link
            href="/test"
            className="inline-block mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Start your first test
          </Link>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SummaryCard
              label="Best WPM"
              value={best?.wpm ?? 0}
              unit=""
              color="text-indigo-400"
              sub={best ? `${best.difficulty}` : ""}
            />
            <SummaryCard
              label="Avg WPM"
              value={avgWpm}
              unit=""
              color="text-purple-400"
              sub="all tests"
            />
            <SummaryCard
              label="Avg Accuracy"
              value={avgAccuracy}
              unit="%"
              color="text-pink-400"
              sub="all tests"
            />
            <SummaryCard
              label="Total Chars"
              value={totalChars}
              unit=""
              color="text-cyan-400"
              sub={`${totalTests} tests`}
            />
          </div>

          {/* WPM trend (last 10) */}
          {results.length >= 2 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-400 mb-4">
                WPM — Last {Math.min(results.length, 10)} Tests
              </h2>
              <WpmChart results={results.slice(0, 10).reverse()} />
            </div>
          )}

          {/* Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Filter:</span>
            {(["all", "easy", "medium", "hard"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <button
              onClick={handleClear}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                confirmClear
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-red-400"
              }`}
            >
              {confirmClear ? "Confirm Clear?" : "Clear All"}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-800">
                  <th className="pb-3 pr-4 font-medium">#</th>
                  <th className="pb-3 pr-4 font-medium">WPM</th>
                  <th className="pb-3 pr-4 font-medium">Accuracy</th>
                  <th className="pb-3 pr-4 font-medium">Errors</th>
                  <th className="pb-3 pr-4 font-medium">Difficulty</th>
                  <th className="pb-3 pr-4 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {filtered.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 pr-4 text-gray-500">{i + 1}</td>
                    <td className="py-3 pr-4">
                      <span className="font-bold font-mono text-indigo-400">{r.wpm}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`font-mono ${
                          r.accuracy >= 95
                            ? "text-green-400"
                            : r.accuracy >= 80
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {r.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-red-400/80">{r.errors}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${DIFF_COLORS[r.difficulty]}`}
                      >
                        {r.difficulty}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-gray-400">
                      {formatDuration(r.duration)}
                    </td>
                    <td className="py-3 text-gray-500">{formatDate(r.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No tests for this difficulty yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  unit,
  color,
  sub,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  sub: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
      <div className={`text-3xl font-bold font-mono ${color}`}>
        {value}
        {unit}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-600 capitalize">{sub}</div>}
    </div>
  );
}

function WpmChart({ results }: { results: TestResult[] }) {
  const max = Math.max(...results.map((r) => r.wpm), 1);
  return (
    <div className="flex items-end gap-2 h-24">
      {results.map((r, i) => {
        const heightPct = Math.max((r.wpm / max) * 100, 4);
        return (
          <div
            key={r.id}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <div className="relative w-full flex items-end" style={{ height: "80px" }}>
              <div
                className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-purple-500 opacity-80 group-hover:opacity-100 transition-all"
                style={{ height: `${heightPct}%` }}
                title={`${r.wpm} WPM`}
              />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {r.wpm}
              </div>
            </div>
            <span className="text-xs text-gray-600">{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
