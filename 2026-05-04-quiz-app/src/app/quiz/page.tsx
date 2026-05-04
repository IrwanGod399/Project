"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/questions";

const TIME_PER_QUESTION = 20; // seconds

export default function QuizPage() {
  const router = useRouter();
  const { questions, currentIndex, answers, submitAnswer, nextQuestion, isFinished } =
    useQuizStore();

  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const question = questions[currentIndex];

  const handleSubmit = useCallback(
    (idx: number) => {
      if (revealed) return;
      setSelected(idx);
      setRevealed(true);
      submitAnswer(idx);
    },
    [revealed, submitAnswer]
  );

  // Auto-submit on timeout
  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) {
      handleSubmit(-1);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, revealed, handleSubmit]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
    setSelected(null);
    setRevealed(false);
  }, [currentIndex]);

  // Redirect when finished
  useEffect(() => {
    if (isFinished()) {
      router.push("/results");
    }
  }, [answers, isFinished, router]);

  // Redirect if no questions loaded
  useEffect(() => {
    if (questions.length === 0) router.push("/");
  }, [questions, router]);

  if (!question) return null;

  const progress = ((currentIndex) / questions.length) * 100;
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor =
    timeLeft > 10 ? "bg-emerald-500" : timeLeft > 5 ? "bg-amber-500" : "bg-rose-500";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 animate-fade-in-up">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>{CATEGORY_ICONS[question.category]}</span>
            <span>{CATEGORY_LABELS[question.category]}</span>
            <span className="mx-1">·</span>
            <span className={`capitalize font-medium ${
              question.difficulty === "easy"
                ? "text-emerald-400"
                : question.difficulty === "medium"
                ? "text-amber-400"
                : "text-rose-400"
            }`}>
              {question.difficulty}
            </span>
          </div>
          <span className="text-sm font-semibold text-slate-300">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 animate-fade-in-up">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-6 animate-fade-in-up">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>

        {/* Timer number */}
        <div className="text-right text-sm text-slate-400 mb-4 -mt-4 animate-fade-in-up">
          ⏱ {timeLeft}s
        </div>

        {/* Question Card */}
        <div
          key={currentIndex}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 animate-pop-in shadow-2xl"
        >
          <p className="text-xl font-semibold text-slate-100 leading-relaxed">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {question.options.map((option, idx) => {
            let style =
              "bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-violet-500/50";

            if (revealed) {
              if (idx === question.correctIndex) {
                style = "bg-emerald-600/30 border border-emerald-500 text-emerald-200";
              } else if (idx === selected && idx !== question.correctIndex) {
                style = "bg-rose-600/30 border border-rose-500 text-rose-200";
              } else {
                style = "bg-white/5 border border-white/5 text-slate-500";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSubmit(idx)}
                disabled={revealed}
                className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all cursor-pointer disabled:cursor-default animate-slide-in animate-delay-${(idx + 1) * 100} ${style}`}
              >
                <span className="text-slate-400 mr-3 font-mono text-sm">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-slate-300 animate-fade-in-up mb-4">
            <span className="font-semibold text-violet-400 mr-2">💡 Explanation:</span>
            {question.explanation}
          </div>
        )}

        {/* Next button */}
        {revealed && (
          <button
            onClick={nextQuestion}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 transition-all shadow-lg animate-fade-in-up"
          >
            {currentIndex + 1 < questions.length ? "Next Question →" : "See Results 🎉"}
          </button>
        )}
      </div>
    </main>
  );
}
