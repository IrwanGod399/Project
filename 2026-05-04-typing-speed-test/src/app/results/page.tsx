"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function getRating(wpm: number): { label: string; color: string; emoji: string } {
  if (wpm >= 120) return { label: "God Mode", color: "text-purple-400", emoji: "🔥" };
  if (wpm >= 90) return { label: "Expert", color: "text-amber-400", emoji: "⚡" };
  if (wpm >= 70) return { label: "Advanced", color: "text-blue-400", emoji: "🚀" };
  if (wpm >= 50) return { label: "Intermediate", color: "text-green-400", emoji: "✨" };
  if (wpm >= 30) return { label: "Beginner", color: "text-slate-300", emoji: "📝" };
  return { label: "Novice", color: "text-slate-400", emoji: "🐢" };
}

function ResultsContent() {
  const params = useSearchParams();
  const wpm = Number(params.get("wpm") || 0);
  const accuracy = Number(params.get("accuracy") || 0);
  const correct = Number(params.get("correct") || 0);
  const incorrect = Number(params.get("incorrect") || 0);
  const chars = Number(params.get("chars") || 0);
  const duration = Number(params.get("duration") || 30);
  const wordSet = params.get("wordSet") || "common";

  const rating = getRating(wpm);
  const avgWpmBenchmark = { common: 65, programming: 50, quotes: 55 }[wordSet] ?? 60;
  const betterThan = Math.min(99, Math.max(1, Math.round((wpm / (avgWpmBenchmark * 2)) * 100)));

  const testUrl = `/test?duration=${duration}&wordSet=${wordSet}`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-4">
        <div className="text-6xl">{rating.emoji}</div>
        <h1 className={`text-4xl font-bold ${rating.color}`}>{rating.label}</h1>
        <p className="text-slate-400">You&apos;re faster than approximately {betterThan}% of typists</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "WPM", value: wpm, unit: "", color: "text-amber-400" },
          { label: "Accuracy", value: accuracy, unit: "%", color: "text-green-400" },
          { label: "Correct", value: correct, unit: " words", color: "text-blue-400" },
          { label: "Incorrect", value: incorrect, unit: " words", color: "text-red-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-2"
          >
            <div className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
              <span className="text-lg">{stat.unit}</span>
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-slate-100 font-semibold">Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total characters typed</span>
            <span className="text-slate-200">{chars}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Test duration</span>
            <span className="text-slate-200">{duration} seconds</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Word set</span>
            <span className="text-slate-200 capitalize">{wordSet}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Raw speed</span>
            <span className="text-slate-200">{Math.round((correct + incorrect) / (duration / 60))} raw WPM</span>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Accuracy bar</span>
              <span className={accuracy >= 95 ? "text-green-400" : accuracy >= 85 ? "text-amber-400" : "text-red-400"}>
                {accuracy}%
              </span>
            </div>
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  accuracy >= 95 ? "bg-green-400" : accuracy >= 85 ? "bg-amber-400" : "bg-red-400"
                }`}
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={testUrl}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-4 rounded-xl text-center transition-colors"
        >
          ↻ Try Again
        </Link>
        <Link
          href="/leaderboard"
          className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-xl text-center transition-colors"
        >
          View Leaderboard
        </Link>
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-300 px-8 py-4 rounded-xl text-center transition-colors"
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
