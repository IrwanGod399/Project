"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Difficulty, DIFFICULTY_CONFIG } from "@/lib/gameData";
import GameBoard from "@/components/GameBoard";

const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function GameContent() {
  const searchParams = useSearchParams();
  const rawDiff = searchParams.get("difficulty");
  const difficulty: Difficulty = VALID_DIFFICULTIES.includes(rawDiff as Difficulty)
    ? (rawDiff as Difficulty)
    : "easy";

  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              {config.label} Mode
            </h1>
            <p className="text-sm text-slate-500">{config.description}</p>
          </div>
          <div className="flex gap-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
              <Link
                key={diff}
                href={`/game?difficulty=${diff}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  difficulty === diff
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "glass text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {DIFFICULTY_CONFIG[diff].label}
              </Link>
            ))}
          </div>
        </div>

        {/* Game Board */}
        <GameBoard difficulty={difficulty} />
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading game...</div>
      </div>
    }>
      <GameContent />
    </Suspense>
  );
}
