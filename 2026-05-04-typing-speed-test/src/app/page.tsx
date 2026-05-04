import Link from "next/link";
import { LEADERBOARD_DATA } from "@/lib/words";

export default function Home() {
  const topScore = LEADERBOARD_DATA[0];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 text-amber-400 text-sm mb-4">
          <span>●</span> Real-time typing analysis
        </div>
        <h1 className="text-6xl font-bold text-slate-100 leading-tight">
          How fast can <br />
          <span className="text-amber-400">you type?</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-xl mx-auto leading-relaxed">
          Test your typing speed and accuracy across different word sets.
          Track your progress and compete against top scores.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/test"
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Typing →
          </Link>
          <Link
            href="/leaderboard"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-xl text-lg transition-colors"
          >
            View Scores
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "⚡",
            title: "WPM Tracking",
            desc: "Real-time words per minute calculation as you type with precision timing.",
          },
          {
            icon: "🎯",
            title: "Accuracy Meter",
            desc: "Character-level accuracy tracking to identify your weak spots.",
          },
          {
            icon: "📊",
            title: "Multiple Modes",
            desc: "Common words, programming terms, or famous quotes — you choose.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="text-slate-100 font-semibold text-lg">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-100 font-bold text-xl">Top Score Today</h2>
          <Link href="/leaderboard" className="text-amber-400 text-sm hover:underline">
            See all →
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-6xl font-bold text-amber-400">{topScore.wpm}</span>
              <span className="text-slate-400 mb-2 text-lg">WPM</span>
            </div>
            <div className="text-slate-400 text-sm">
              {topScore.accuracy}% accuracy · {topScore.duration}s test · {topScore.wordSet}
            </div>
          </div>
          <div className="text-right space-y-2 text-sm">
            <div className="bg-green-400/10 border border-green-400/20 text-green-400 rounded-lg px-4 py-2">
              {topScore.correctWords} correct words
            </div>
            <div className="text-slate-500">{topScore.date}</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-slate-100 font-bold text-xl">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "15 Second Sprint", duration: 15, wordSet: "common" },
            { label: "30 Second Burst", duration: 30, wordSet: "common" },
            { label: "1 Minute Marathon", duration: 60, wordSet: "common" },
          ].map((preset) => (
            <Link
              key={preset.label}
              href={`/test?duration=${preset.duration}&wordSet=${preset.wordSet}`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-xl p-4 text-center transition-colors group"
            >
              <div className="text-2xl font-bold text-amber-400 group-hover:scale-110 transition-transform inline-block">
                {preset.duration}s
              </div>
              <div className="text-slate-300 text-sm mt-1">{preset.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
