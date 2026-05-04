"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/questions";

function getRank(pct: number) {
  if (pct === 100) return { label: "Perfect!", emoji: "🏆", color: "text-yellow-400" };
  if (pct >= 80)  return { label: "Excellent!", emoji: "🌟", color: "text-violet-400" };
  if (pct >= 60)  return { label: "Good Job!", emoji: "👍", color: "text-emerald-400" };
  if (pct >= 40)  return { label: "Not Bad", emoji: "📚", color: "text-amber-400" };
  return { label: "Keep Practicing", emoji: "💪", color: "text-rose-400" };
}

export default function ResultsPage() {
  const router = useRouter();
  const { questions, answers, score, reset } = useQuizStore();

  useEffect(() => {
    if (questions.length === 0) router.push("/");
  }, [questions, router]);

  useEffect(() => {
    if (questions.length > 0 && answers.length >= questions.length) {
      const entry = {
        date: new Date().toISOString(),
        score: score(),
        total: questions.length,
        pct: Math.round((score() / questions.length) * 100),
      };
      const prev = JSON.parse(localStorage.getItem("brainblast-scores") || "[]");
      localStorage.setItem(
        "brainblast-scores",
        JSON.stringify([entry, ...prev].slice(0, 20))
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (questions.length === 0) return null;

  const pct = Math.round((score() / questions.length) * 100);
  const rank = getRank(pct);
  const totalTime = answers.reduce((s, a) => s + a.timeTaken, 0);
  const avgTime = answers.length ? Math.round(totalTime / answers.length / 1000) : 0;

  function handleRetry() {
    reset();
    router.push("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Score card */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-6xl mb-3">{rank.emoji}</div>
          <h1 className={`text-4xl font-bold mb-1 ${rank.color}`}>{rank.label}</h1>
          <p className="text-slate-400">Quiz Complete</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in-up animate-delay-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-4xl font-bold text-violet-400">{score()}/{questions.length}</p>
              <p className="text-xs text-slate-400 mt-1">Correct</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-fuchsia-400">{pct}%</p>
              <p className="text-xs text-slate-400 mt-1">Accuracy</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-400">{avgTime}s</p>
              <p className="text-xs text-slate-400 mt-1">Avg / Question</p>
            </div>
          </div>

          {/* Score bar */}
          <div className="mt-5 w-full h-3 bg-white/10 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in-up animate-delay-200">
          <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4">
            Question Breakdown
          </h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {questions.map((q, i) => {
              const ans = answers[i];
              if (!ans) return null;
              const correct = ans.correct;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                    correct ? "bg-emerald-600/10 border border-emerald-600/20" : "bg-rose-600/10 border border-rose-600/20"
                  }`}
                >
                  <span className="mt-0.5">{correct ? "✅" : "❌"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium truncate">{q.question}</p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {CATEGORY_ICONS[q.category]} {CATEGORY_LABELS[q.category]}
                      {!correct && (
                        <span className="ml-2 text-emerald-400">
                          ✓ {q.options[q.correctIndex]}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {Math.round(ans.timeTaken / 1000)}s
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up animate-delay-300">
          <button
            onClick={handleRetry}
            className="py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 transition-all shadow-lg"
          >
            Play Again
          </button>
          <a
            href="/leaderboard"
            className="py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-semibold text-center hover:bg-white/10 active:scale-95 transition-all"
          >
            Leaderboard
          </a>
        </div>
      </div>
    </main>
  );
}
