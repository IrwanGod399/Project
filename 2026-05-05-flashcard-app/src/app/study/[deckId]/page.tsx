"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDeck } from "@/lib/data";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  XCircle,
  Trophy,
  RefreshCw,
} from "lucide-react";

export default function StudyPage() {
  const params = useParams();
  const deck = getDeck(params.deckId as string);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, "correct" | "wrong">>({});
  const [isFinished, setIsFinished] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(deck?.cards ?? []);

  useEffect(() => {
    if (deck) setShuffledCards([...deck.cards]);
  }, [deck]);

  const currentCard = shuffledCards[currentIndex];
  const totalCards = shuffledCards.length;
  const answeredCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter((r) => r === "correct").length;

  const handleFlip = () => setIsFlipped((f) => !f);

  const handleResult = useCallback(
    (result: "correct" | "wrong") => {
      if (!currentCard) return;
      setResults((prev) => ({ ...prev, [currentCard.id]: result }));
      setIsFlipped(false);
      setTimeout(() => {
        if (currentIndex + 1 >= totalCards) {
          setIsFinished(true);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 200);
    },
    [currentCard, currentIndex, totalCards]
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({});
    setIsFinished(false);
    setShuffledCards((cards) => [...cards].sort(() => Math.random() - 0.5));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i - 1), 150);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i + 1), 150);
    }
  };

  if (!deck) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <p className="mb-4 text-xl text-slate-400">Deck not found.</p>
          <Link href="/decks" className="text-purple-400 hover:underline">
            Browse all decks
          </Link>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const score = Math.round((correctCount / totalCards) * 100);
    const grade =
      score >= 90 ? "Excellent!" : score >= 70 ? "Good job!" : score >= 50 ? "Keep practicing!" : "Keep going!";

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/20">
            <Trophy className="h-10 w-10 text-yellow-400" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">{grade}</h1>
          <p className="mb-8 text-slate-400">You completed the {deck.title} deck</p>

          <div className="mb-10 flex gap-6">
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-8 py-5 text-center">
              <div className="text-4xl font-bold text-green-400">{correctCount}</div>
              <div className="mt-1 text-sm text-slate-400">Correct</div>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-8 py-5 text-center">
              <div className="text-4xl font-bold text-red-400">{totalCards - correctCount}</div>
              <div className="mt-1 text-sm text-slate-400">Wrong</div>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 px-8 py-5 text-center">
              <div className="text-4xl font-bold text-purple-400">{score}%</div>
              <div className="mt-1 text-sm text-slate-400">Score</div>
            </div>
          </div>

          {/* Score bar */}
          <div className="mb-10 w-full">
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
            <Link
              href="/decks"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-semibold transition hover:border-slate-400"
            >
              Other Decks
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const progress = ((currentIndex) / totalCards) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Back + title */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/decks"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-bold text-white">{deck.title}</h1>
            <p className="text-xs text-slate-400">{deck.category}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="mb-8 flex justify-between text-xs text-slate-400">
          <span>Card {currentIndex + 1} of {totalCards}</span>
          <span>{answeredCount} answered</span>
        </div>

        {/* Flip card */}
        <div
          className="relative mb-8 cursor-pointer"
          style={{ perspective: "1200px" }}
          onClick={handleFlip}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: "320px",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800 p-8 text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="mb-4 rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                Question
              </div>
              <p className="text-xl font-medium leading-relaxed text-white">
                {currentCard?.question}
              </p>
              <p className="mt-6 text-sm text-slate-500">Click to reveal answer</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-900/50 to-slate-800 p-8 text-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-4 rounded-full bg-purple-500/30 px-3 py-1 text-xs text-purple-300">
                Answer
              </div>
              <p className="text-lg leading-relaxed text-white">
                {currentCard?.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Hint */}
        {!isFlipped && (
          <p className="mb-6 text-center text-sm text-slate-500">
            <RotateCcw className="mr-1 inline h-3 w-3" />
            Click the card to flip
          </p>
        )}

        {/* Mark correct/wrong */}
        {isFlipped && (
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => handleResult("wrong")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 py-3 font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95"
            >
              <XCircle className="h-5 w-5" /> Didn&apos;t Know
            </button>
            <button
              onClick={() => handleResult("correct")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 py-3 font-semibold text-green-400 transition hover:bg-green-500/20 active:scale-95"
            >
              <CheckCircle className="h-5 w-5" /> Got It
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Card status row */}
        <div className="mt-8 flex flex-wrap justify-center gap-1.5">
          {shuffledCards.map((card, i) => (
            <div
              key={card.id}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? "scale-125 bg-white"
                  : results[card.id] === "correct"
                  ? "bg-green-500"
                  : results[card.id] === "wrong"
                  ? "bg-red-500"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
