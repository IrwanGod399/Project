"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { getQuestions, CATEGORY_LABELS, CATEGORY_ICONS, DIFFICULTY_LABELS } from "@/lib/questions";
import { Category, Difficulty, QuizConfig } from "@/lib/types";

const CATEGORIES = ["all", "science", "history", "geography", "pop-culture", "technology"] as const;
const DIFFICULTIES = ["all", "easy", "medium", "hard"] as const;
const COUNTS = [5, 10, 15, 20];

export default function HomePage() {
  const router = useRouter();
  const { setConfig, setQuestions } = useQuizStore();

  const [category, setCategory] = useState<"all" | Category>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [count, setCount] = useState(10);

  function startQuiz() {
    const config: QuizConfig = { category, difficulty, questionCount: count };
    const questions = getQuestions(category, difficulty, count);
    if (questions.length === 0) return;
    setConfig(config);
    setQuestions(questions);
    router.push("/quiz");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-3">
          BrainBlast
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Test your knowledge across five categories. Choose your settings and let the quiz begin!
        </p>
      </div>

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl animate-fade-in-up animate-delay-100">
        {/* Category */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
            Category
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                <span className="truncate">{CATEGORY_LABELS[cat]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
            Difficulty
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {DIFFICULTIES.map((diff) => {
              const colors: Record<string, string> = {
                all: "bg-slate-600",
                easy: "bg-emerald-600 shadow-emerald-500/30",
                medium: "bg-amber-600 shadow-amber-500/30",
                hard: "bg-rose-600 shadow-rose-500/30",
              };
              return (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    difficulty === diff
                      ? `${colors[diff]} text-white shadow-lg`
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {DIFFICULTY_LABELS[diff]}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question Count */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
            Number of Questions
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                  count === n
                    ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={startQuiz}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 transition-all shadow-lg shadow-violet-500/25"
        >
          Start Quiz →
        </button>
      </div>

      {/* Nav to Leaderboard */}
      <p className="mt-6 text-slate-500 text-sm animate-fade-in-up animate-delay-200">
        Want to review past scores?{" "}
        <a href="/leaderboard" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
          View leaderboard
        </a>
      </p>
    </main>
  );
}
