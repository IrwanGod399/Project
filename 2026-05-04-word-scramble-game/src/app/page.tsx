"use client";

import Link from "next/link";
import { categories } from "@/lib/words";

const categoryIcons: Record<string, string> = {
  Animals: "🦁",
  Food: "🍕",
  Science: "🔬",
  Sports: "⚽",
  Countries: "🌍",
};

const categoryColors: Record<string, string> = {
  Animals: "from-emerald-500 to-teal-600",
  Food: "from-orange-500 to-red-600",
  Science: "from-blue-500 to-indigo-600",
  Sports: "from-violet-500 to-purple-600",
  Countries: "from-pink-500 to-rose-600",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-gray-950" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-4 text-7xl">🔤</div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Word{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Scramble
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-400">
            Unscramble letters, race against the clock, and climb the leaderboard. Test your vocabulary across 5 exciting categories!
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/game"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-10 py-4 text-lg font-bold shadow-lg shadow-indigo-500/30 transition hover:scale-105 hover:shadow-indigo-500/50"
            >
              Play Now
            </Link>
            <Link
              href="/rules"
              className="rounded-2xl border border-gray-700 bg-gray-800/50 px-10 py-4 text-lg font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              How to Play
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {["W", "O", "R", "D", "S", "!"].map((letter, i) => (
            <span
              key={i}
              className="absolute text-4xl font-black text-white/5 select-none"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `rotate(${-20 + i * 10}deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-800 bg-gray-900/50 px-6 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 text-center">
          {[
            { label: "Categories", value: "5" },
            { label: "Words", value: "50+" },
            { label: "Seconds per word", value: "30" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-4xl font-extrabold text-indigo-400">{value}</div>
              <div className="mt-1 text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Choose a Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/game?category=${cat}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 transition hover:border-gray-600 hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cat]} opacity-0 transition-opacity group-hover:opacity-10`}
                />
                <div className="relative z-10">
                  <div className="mb-3 text-4xl">{categoryIcons[cat]}</div>
                  <h3 className="text-xl font-bold">{cat}</h3>
                  <p className="mt-1 text-sm text-gray-500">10 words · 30s each</p>
                </div>
              </Link>
            ))}
            <Link
              href="/game"
              className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-dashed border-gray-700 p-6 transition hover:border-indigo-500 hover:scale-105"
            >
              <div className="relative z-10">
                <div className="mb-3 text-4xl">🎲</div>
                <h3 className="text-xl font-bold">Random Mix</h3>
                <p className="mt-1 text-sm text-gray-500">All categories · surprise!</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 text-center">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
          <p className="mb-4 text-gray-400">Track your scores and beat your friends!</p>
          <Link
            href="/leaderboard"
            className="inline-block rounded-xl border border-indigo-500/50 bg-indigo-500/10 px-6 py-3 text-indigo-400 font-semibold transition hover:bg-indigo-500/20"
          >
            View Leaderboard →
          </Link>
        </div>
      </section>
    </main>
  );
}
