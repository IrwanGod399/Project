"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Category,
  WordEntry,
  categories,
  wordBank,
  scrambleWord,
  getRandomWords,
} from "@/lib/words";

const WORDS_PER_GAME = 8;
const TIME_PER_WORD = 30;

type GameStatus = "setup" | "playing" | "result";

interface RoundResult {
  word: string;
  correct: boolean;
  timeLeft: number;
  points: number;
}

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get("category") as Category | null;

  const [status, setStatus] = useState<GameStatus>("setup");
  const [selectedCategory, setSelectedCategory] = useState<Category | "random">(
    urlCategory && categories.includes(urlCategory) ? urlCategory : "random"
  );
  const [playerName, setPlayerName] = useState("");
  const [words, setWords] = useState<WordEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_PER_WORD);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shake, setShake] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const currentWord = words[currentIndex];

  const advanceRound = useCallback(
    (correct: boolean, tLeft: number) => {
      const points = correct
        ? Math.round(100 + tLeft * 5 - (hintUsed ? 25 : 0))
        : 0;

      setResults((prev) => [
        ...prev,
        { word: currentWord.word, correct, timeLeft: tLeft, points },
      ]);

      setFeedback(correct ? "correct" : "wrong");

      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 >= WORDS_PER_GAME) {
          setStatus("result");
        } else {
          const next = currentIndex + 1;
          setCurrentIndex(next);
          setScrambled(scrambleWord(words[next].word));
          setInput("");
          setTimeLeft(TIME_PER_WORD);
          setShowHint(false);
          setHintUsed(false);
        }
      }, 900);
    },
    [currentWord, currentIndex, hintUsed, words]
  );

  useEffect(() => {
    if (status !== "playing" || feedback !== null) return;
    if (timeLeft <= 0) {
      advanceRound(false, 0);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [status, timeLeft, feedback, advanceRound]);

  function startGame() {
    let pool: WordEntry[];
    if (selectedCategory === "random") {
      pool = categories.flatMap((c) => wordBank[c]);
      pool = pool.sort(() => Math.random() - 0.5).slice(0, WORDS_PER_GAME);
    } else {
      pool = getRandomWords(selectedCategory, WORDS_PER_GAME);
    }
    setWords(pool);
    setCurrentIndex(0);
    setScrambled(scrambleWord(pool[0].word));
    setInput("");
    setTimeLeft(TIME_PER_WORD);
    setResults([]);
    setShowHint(false);
    setHintUsed(false);
    setFeedback(null);
    setStatus("playing");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || feedback !== null) return;
    const correct = input.trim().toUpperCase() === currentWord.word.toUpperCase();
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    advanceRound(correct, timeLeft);
  }

  function handleSkip() {
    if (feedback !== null) return;
    advanceRound(false, 0);
  }

  function handleHint() {
    setShowHint(true);
    setHintUsed(true);
  }

  function saveScore(total: number) {
    const name = playerName.trim() || "Anonymous";
    const entry = {
      name,
      score: total,
      category: selectedCategory,
      date: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem("scramble_scores") || "[]");
    stored.push(entry);
    stored.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    localStorage.setItem("scramble_scores", JSON.stringify(stored.slice(0, 50)));
  }

  const totalScore = results.reduce((s, r) => s + r.points, 0);
  const correctCount = results.filter((r) => r.correct).length;

  if (status === "setup") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm">
          ← Back to Home
        </Link>
        <h1 className="mb-2 text-4xl font-extrabold">New Game</h1>
        <p className="mb-8 text-gray-400">Set up your game and start scrambling!</p>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-400">Your Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              maxLength={20}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-400">Category</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedCategory("random")}
                className={`rounded-xl border p-3 text-left transition ${
                  selectedCategory === "random"
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="text-2xl">🎲</div>
                <div className="mt-1 font-semibold">Random Mix</div>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selectedCategory === cat
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  <div className="text-2xl">
                    {cat === "Animals" && "🦁"}
                    {cat === "Food" && "🍕"}
                    {cat === "Science" && "🔬"}
                    {cat === "Sports" && "⚽"}
                    {cat === "Countries" && "🌍"}
                  </div>
                  <div className="mt-1 font-semibold">{cat}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-sm text-gray-400">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-xl font-bold text-white">{WORDS_PER_GAME}</div><div>Words</div></div>
              <div><div className="text-xl font-bold text-white">{TIME_PER_WORD}s</div><div>Per word</div></div>
              <div><div className="text-xl font-bold text-white">100+</div><div>Max pts</div></div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 text-lg font-bold shadow-lg transition hover:scale-105"
          >
            Start Game →
          </button>
        </div>
      </div>
    );
  }

  if (status === "playing" && currentWord) {
    const timerPct = (timeLeft / TIME_PER_WORD) * 100;
    const timerColor =
      timeLeft > 15 ? "bg-emerald-500" : timeLeft > 7 ? "bg-yellow-500" : "bg-red-500";

    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        {/* Progress */}
        <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
          <span>
            Word {currentIndex + 1} / {WORDS_PER_GAME}
          </span>
          <span>
            Score:{" "}
            <span className="font-bold text-indigo-400">
              {results.reduce((s, r) => s + r.points, 0)}
            </span>
          </span>
        </div>

        <div className="mb-4 h-2 rounded-full bg-gray-800">
          <div
            className="h-2 rounded-full bg-indigo-500 transition-all"
            style={{ width: `${((currentIndex) / WORDS_PER_GAME) * 100}%` }}
          />
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
            <span>Time left</span>
            <span className={timeLeft <= 7 ? "text-red-400 font-bold" : ""}>{timeLeft}s</span>
          </div>
          <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
            <div
              className={`h-3 rounded-full ${timerColor} transition-all duration-1000`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className={`relative mb-6 rounded-2xl border p-8 text-center transition-all ${
            feedback === "correct"
              ? "border-emerald-500 bg-emerald-500/10"
              : feedback === "wrong"
              ? "border-red-500 bg-red-500/10"
              : "border-gray-700 bg-gray-900"
          }`}
        >
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            {currentWord.category}
          </div>

          <div
            className={`mb-6 font-mono text-5xl font-extrabold tracking-widest transition-all ${
              shake ? "animate-bounce text-red-400" : "text-white"
            }`}
          >
            {scrambled.split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block mx-0.5 rounded-lg bg-gray-800 px-2 py-1"
              >
                {ch}
              </span>
            ))}
          </div>

          {showHint && (
            <div className="mb-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 text-sm text-yellow-300">
              Hint: {currentWord.hint}
            </div>
          )}

          {feedback === "correct" && (
            <div className="absolute inset-0 flex items-center justify-center text-6xl rounded-2xl">
              ✅
            </div>
          )}
          {feedback === "wrong" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gray-950/80">
              <div className="text-4xl">❌</div>
              <div className="mt-2 text-lg font-bold text-gray-300">
                Answer: <span className="text-white">{currentWord.word}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Type your answer..."
            disabled={feedback !== null}
            className="mb-3 w-full rounded-xl border border-gray-700 bg-gray-800 px-5 py-4 text-center text-xl font-bold uppercase tracking-widest text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || feedback !== null}
            className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-500 disabled:opacity-40"
          >
            Submit Answer
          </button>
        </form>

        <div className="flex gap-3">
          {!showHint && (
            <button
              onClick={handleHint}
              disabled={feedback !== null}
              className="flex-1 rounded-xl border border-yellow-700/50 bg-yellow-500/10 py-2.5 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500/20 disabled:opacity-40"
            >
              💡 Hint (-25pts)
            </button>
          )}
          <button
            onClick={handleSkip}
            disabled={feedback !== null}
            className="flex-1 rounded-xl border border-gray-700 bg-gray-800 py-2.5 text-sm font-semibold text-gray-400 transition hover:bg-gray-700 disabled:opacity-40"
          >
            Skip →
          </button>
        </div>
      </div>
    );
  }

  if (status === "result") {
    const pct = Math.round((correctCount / WORDS_PER_GAME) * 100);
    const grade =
      pct >= 90 ? "S" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";
    const gradeColor =
      grade === "S"
        ? "text-yellow-400"
        : grade === "A"
        ? "text-emerald-400"
        : grade === "B"
        ? "text-blue-400"
        : grade === "C"
        ? "text-orange-400"
        : "text-red-400";

    const alreadySaved =
      typeof window !== "undefined" &&
      (() => {
        try {
          return false;
        } catch {
          return false;
        }
      })();

    function handleSave() {
      saveScore(totalScore);
      router.push("/leaderboard");
    }

    return (
      <div className="mx-auto max-w-lg px-6 py-12">
        <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center">
          <div className={`mb-2 text-8xl font-extrabold ${gradeColor}`}>{grade}</div>
          <div className="mb-1 text-4xl font-extrabold text-white">{totalScore} pts</div>
          <div className="text-gray-400">
            {correctCount} / {WORDS_PER_GAME} correct
          </div>
        </div>

        {/* Word by word breakdown */}
        <div className="mb-6 space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                r.correct
                  ? "border-emerald-800/50 bg-emerald-900/20"
                  : "border-red-800/50 bg-red-900/20"
              }`}
            >
              <span className="font-mono font-bold text-white">{r.word}</span>
              <div className="flex items-center gap-3 text-sm">
                {r.correct && (
                  <span className="text-gray-400">{r.timeLeft}s left</span>
                )}
                <span className={r.correct ? "text-emerald-400 font-bold" : "text-red-400"}>
                  {r.correct ? `+${r.points}` : "0"}
                </span>
                <span>{r.correct ? "✅" : "❌"}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-bold text-white transition hover:scale-105"
          >
            Save Score & View Leaderboard
          </button>
          <button
            onClick={() => setStatus("setup")}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 font-semibold text-gray-300 transition hover:bg-gray-700"
          >
            Play Again
          </button>
          <Link
            href="/"
            className="block w-full rounded-xl border border-gray-800 py-3 text-center text-sm text-gray-500 transition hover:text-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400">Loading...</div>}>
        <GameContent />
      </Suspense>
    </div>
  );
}
