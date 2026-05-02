"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Deck } from "@/lib/data";

type Props = { deck: Deck };

export default function StudyClient({ deck }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [learning, setLearning] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const [shuffled] = useState(() => [...deck.cards].sort(() => Math.random() - 0.5));

  const currentCard = shuffled[currentIndex];
  const progress = ((currentIndex) / shuffled.length) * 100;

  const flip = useCallback(() => setIsFlipped((f) => !f), []);

  const markKnown = useCallback(() => {
    setKnown((prev) => new Set([...prev, currentCard.id]));
    setLearning((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    advance();
  }, [currentCard]);

  const markLearning = useCallback(() => {
    setLearning((prev) => new Set([...prev, currentCard.id]));
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    advance();
  }, [currentCard]);

  const advance = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 >= shuffled.length) {
        setFinished(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 150);
  }, [currentIndex, shuffled.length]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnown(new Set());
    setLearning(new Set());
    setFinished(false);
  }, []);

  if (finished) {
    const knownCount = known.size;
    const learningCount = learning.size;
    const skipped = shuffled.length - knownCount - learningCount;
    const pct = Math.round((knownCount / shuffled.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">{pct >= 80 ? "🎉" : pct >= 50 ? "📚" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
        <p className="text-white/50 mb-10">You reviewed all {shuffled.length} cards from {deck.title}.</p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">{knownCount}</div>
            <div className="text-xs text-emerald-400/70 mt-1">Got it!</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-400">{learningCount}</div>
            <div className="text-xs text-amber-400/70 mt-1">Still learning</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white/40">{skipped}</div>
            <div className="text-xs text-white/30 mt-1">Skipped</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={restart}
            className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 active:scale-95 transition-all shadow-lg shadow-violet-600/30"
          >
            Study Again
          </button>
          <Link
            href={`/decks/${deck.id}`}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all"
          >
            Back to Deck
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/decks/${deck.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {deck.title}
        </Link>
        <span className="text-sm text-white/40">
          {currentIndex + 1} / {shuffled.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${deck.color} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status badges */}
      <div className="flex gap-3 mb-6 text-sm">
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {known.size} known
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-400">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {learning.size} learning
        </div>
      </div>

      {/* Flashcard */}
      <div className="card-flip w-full mb-6" style={{ height: "320px" }}>
        <div
          className={`card-inner w-full h-full cursor-pointer select-none ${isFlipped ? "flipped" : ""}`}
          onClick={flip}
        >
          {/* Front */}
          <div className="card-face bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:border-white/20 transition-colors">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Question</div>
            <p className="text-xl text-white font-medium leading-relaxed">{currentCard.question}</p>
            <div className="mt-8 text-xs text-white/20 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Click to flip
            </div>
          </div>

          {/* Back */}
          <div className="card-face card-back bg-gradient-to-br from-violet-600/20 to-purple-800/20 border border-violet-500/30 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
            <div className="text-xs text-violet-400/70 uppercase tracking-widest mb-4">Answer</div>
            <p className="text-lg text-white leading-relaxed">{currentCard.answer}</p>
            <div className="mt-8 text-xs text-violet-400/40 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Click to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={markLearning}
          className="flex flex-col items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl py-3.5 px-4 hover:bg-amber-500/20 active:scale-95 transition-all font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Still learning
        </button>
        <button
          onClick={advance}
          className="flex flex-col items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 rounded-xl py-3.5 px-4 hover:bg-white/10 hover:text-white/70 active:scale-95 transition-all font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Skip
        </button>
        <button
          onClick={markKnown}
          className="flex flex-col items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl py-3.5 px-4 hover:bg-emerald-500/20 active:scale-95 transition-all font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Got it!
        </button>
      </div>

      <p className="text-center text-xs text-white/20 mt-6">
        Cards are shuffled randomly each session
      </p>
    </div>
  );
}
