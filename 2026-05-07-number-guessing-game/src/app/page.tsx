import Link from "next/link";
import { DIFFICULTY_CONFIGS } from "@/lib/gameUtils";

export default function Home() {
  const difficulties = Object.entries(DIFFICULTY_CONFIGS);

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="text-7xl mb-6 float" style={{ display: "inline-block" }}>🎯</div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-text" style={{ color: "#a78bfa" }}>
          NumQuest
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-2 neon-text-cyan" style={{ color: "#06b6d4" }}>
          The Ultimate Number Guessing Challenge
        </p>
        <p className="text-base max-w-md mx-auto mt-3" style={{ color: "#64748b" }}>
          Pick your difficulty, crack the code, and climb the leaderboard. How sharp are your instincts?
        </p>
      </div>

      {/* Difficulty cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        {difficulties.map(([key, config]) => (
          <Link
            key={key}
            href={`/game?difficulty=${key}`}
            className="glass-card rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 group hover:scale-105"
            style={{ textDecoration: "none" }}
          >
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200" style={{ display: "block" }}>
              {config.emoji}
            </span>
            <h2 className="text-2xl font-bold mb-2" style={{ color: config.color }}>
              {config.label}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
              {config.description}
            </p>
            <div className="w-full rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 group-hover:opacity-90"
              style={{ background: `${config.color}22`, border: `1px solid ${config.color}55`, color: config.color }}>
              {config.scoreMultiplier}x Score Multiplier
            </div>
          </Link>
        ))}
      </div>

      {/* How to play */}
      <div className="glass-card rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-6 text-center neon-text-cyan" style={{ color: "#06b6d4" }}>
          How to Play
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎲", step: "1", title: "Choose Difficulty", desc: "Pick Easy, Medium, or Hard to set your range and attempt limit" },
            { icon: "🔢", step: "2", title: "Guess the Number", desc: "Enter your guess and get hot/cold hints to narrow it down" },
            { icon: "🏆", step: "3", title: "Beat the Clock", desc: "Fewer attempts + faster time = higher score on the leaderboard" },
          ].map(({ icon, step, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-xs font-bold mb-1 uppercase tracking-widest" style={{ color: "#7c3aed" }}>Step {step}</div>
              <div className="font-semibold mb-1" style={{ color: "#e2e8f0" }}>{title}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex gap-4">
        <Link
          href="/game"
          className="px-8 py-3 rounded-full font-bold text-white transition-all duration-200 hover:scale-105 neon-pulse"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", textDecoration: "none" }}
        >
          Start Playing
        </Link>
        <Link
          href="/leaderboard"
          className="px-8 py-3 rounded-full font-bold transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4", textDecoration: "none" }}
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}
