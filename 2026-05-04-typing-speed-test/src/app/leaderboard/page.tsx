import Link from "next/link";
import { LEADERBOARD_DATA, TestResult } from "@/lib/words";

const EXTENDED_SCORES: TestResult[] = [
  ...LEADERBOARD_DATA,
  { wpm: 82, accuracy: 94.2, correctWords: 41, incorrectWords: 3, totalChars: 207, duration: 30, wordSet: "quotes", date: "2026-05-01" },
  { wpm: 76, accuracy: 97.8, correctWords: 152, incorrectWords: 3, totalChars: 768, duration: 120, wordSet: "common", date: "2026-04-30" },
  { wpm: 71, accuracy: 93.5, correctWords: 36, incorrectWords: 3, totalChars: 180, duration: 30, wordSet: "programming", date: "2026-04-30" },
  { wpm: 65, accuracy: 96.0, correctWords: 65, incorrectWords: 3, totalChars: 329, duration: 60, wordSet: "quotes", date: "2026-04-29" },
  { wpm: 58, accuracy: 91.2, correctWords: 29, incorrectWords: 3, totalChars: 147, duration: 30, wordSet: "common", date: "2026-04-29" },
  { wpm: 52, accuracy: 98.1, correctWords: 26, incorrectWords: 1, totalChars: 131, duration: 30, wordSet: "common", date: "2026-04-28" },
];

const medals = ["🥇", "🥈", "🥉"];

function getRatingColor(wpm: number) {
  if (wpm >= 120) return "text-purple-400";
  if (wpm >= 90) return "text-amber-400";
  if (wpm >= 70) return "text-blue-400";
  if (wpm >= 50) return "text-green-400";
  return "text-slate-400";
}

export default function LeaderboardPage() {
  const sorted = [...EXTENDED_SCORES].sort((a, b) => b.wpm - a.wpm);

  const avgWpm = Math.round(sorted.reduce((s, r) => s + r.wpm, 0) / sorted.length);
  const topWpm = sorted[0].wpm;
  const avgAccuracy = Math.round(sorted.reduce((s, r) => s + r.accuracy, 0) / sorted.length * 10) / 10;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Leaderboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Top typing performances</p>
        </div>
        <Link
          href="/test"
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Beat the Top Score →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Top WPM", value: topWpm, unit: "", color: "text-amber-400" },
          { label: "Avg WPM", value: avgWpm, unit: "", color: "text-blue-400" },
          { label: "Avg Accuracy", value: avgAccuracy, unit: "%", color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}{stat.unit}
            </div>
            <div className="text-slate-400 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_80px_90px_80px_80px_100px] gap-2 px-6 py-3 text-xs text-slate-500 uppercase tracking-widest border-b border-slate-800">
          <span>#</span>
          <span>Score</span>
          <span>WPM</span>
          <span>Accuracy</span>
          <span className="hidden sm:block">Duration</span>
          <span className="hidden sm:block">Word Set</span>
          <span className="hidden sm:block">Date</span>
        </div>
        {sorted.map((result, i) => (
          <div
            key={i}
            className={`grid grid-cols-[40px_1fr_80px_90px_80px_80px_100px] gap-2 px-6 py-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors ${
              i === 0 ? "bg-amber-400/5" : ""
            }`}
          >
            <span className="text-slate-500 font-mono text-sm self-center">
              {medals[i] ?? <span className="text-slate-600">{i + 1}</span>}
            </span>
            <div className="self-center">
              <div className={`font-bold text-lg ${getRatingColor(result.wpm)}`}>
                {result.wpm} WPM
              </div>
              <div className="text-slate-500 text-xs">{result.correctWords} correct · {result.incorrectWords} wrong</div>
            </div>
            <span className={`self-center text-sm font-mono font-bold ${getRatingColor(result.wpm)}`}>
              {result.wpm}
            </span>
            <span className={`self-center text-sm ${result.accuracy >= 95 ? "text-green-400" : result.accuracy >= 90 ? "text-amber-400" : "text-red-400"}`}>
              {result.accuracy}%
            </span>
            <span className="hidden sm:block self-center text-slate-400 text-sm">{result.duration}s</span>
            <span className="hidden sm:block self-center text-slate-400 text-sm capitalize">{result.wordSet}</span>
            <span className="hidden sm:block self-center text-slate-500 text-xs">{result.date}</span>
          </div>
        ))}
      </div>

      <div className="text-center text-slate-500 text-sm">
        Think you can do better?{" "}
        <Link href="/test" className="text-amber-400 hover:underline">
          Take the test →
        </Link>
      </div>
    </div>
  );
}
