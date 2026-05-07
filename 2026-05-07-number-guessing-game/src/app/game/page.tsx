"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Difficulty,
  DIFFICULTY_CONFIGS,
  calculateScore,
  getHint,
  saveToLeaderboard,
} from "@/lib/gameUtils";

type GameState = "selecting" | "playing" | "won" | "lost";

interface GuessRecord {
  value: number;
  hint: string;
  direction: "high" | "low" | "correct";
}

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const diffParam = searchParams.get("difficulty") as Difficulty | null;

  const [difficulty, setDifficulty] = useState<Difficulty>(
    diffParam && ["easy", "medium", "hard"].includes(diffParam) ? diffParam : "medium"
  );
  const [gameState, setGameState] = useState<GameState>(diffParam ? "playing" : "selecting");
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [shakeInput, setShakeInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  const config = DIFFICULTY_CONFIGS[difficulty];

  const startGame = useCallback((diff: Difficulty) => {
    const cfg = DIFFICULTY_CONFIGS[diff];
    const newTarget = Math.floor(Math.random() * cfg.range) + 1;
    setTarget(newTarget);
    setGuesses([]);
    setAttemptsLeft(cfg.maxAttempts);
    setGuess("");
    setElapsed(0);
    setGameState("playing");
    setNameSaved(false);
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, []);

  useEffect(() => {
    if (diffParam && ["easy", "medium", "hard"].includes(diffParam)) {
      startGame(diffParam as Difficulty);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (gameState === "playing") inputRef.current?.focus();
  }, [gameState, guesses.length]);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > config.range) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    if (guesses.some((g) => g.value === num)) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    const newAttemptsLeft = attemptsLeft - 1;
    let direction: "high" | "low" | "correct" = "correct";
    if (num > target) direction = "high";
    else if (num < target) direction = "low";

    const hint = num === target ? "Correct!" : getHint(num, target, config.range);
    const newGuess: GuessRecord = { value: num, hint, direction };
    const newGuesses = [newGuess, ...guesses];
    setGuesses(newGuesses);
    setGuess("");
    setAttemptsLeft(newAttemptsLeft);

    if (num === target) {
      if (timerRef.current) clearInterval(timerRef.current);
      const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(finalTime);
      const finalScore = calculateScore(difficulty, newGuesses.length, finalTime);
      setScore(finalScore);
      setGameState("won");
    } else if (newAttemptsLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState("lost");
    }
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;
    saveToLeaderboard({
      name: playerName.trim(),
      score,
      difficulty,
      attempts: guesses.length,
      timeSeconds: elapsed,
    });
    setNameSaved(true);
  };

  const handleRestart = () => {
    startGame(difficulty);
  };

  const progressPercent = ((config.maxAttempts - attemptsLeft) / config.maxAttempts) * 100;

  if (gameState === "selecting") {
    return (
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-3xl font-bold mb-2 neon-text" style={{ color: "#a78bfa" }}>Choose Difficulty</h1>
        <p className="mb-10" style={{ color: "#64748b" }}>Select how hard you want to go</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((key) => {
            const cfg = DIFFICULTY_CONFIGS[key];
            return (
              <button
                key={key}
                onClick={() => { setDifficulty(key); startGame(key); }}
                className="glass-card rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <span className="text-5xl mb-3">{cfg.emoji}</span>
                <span className="text-2xl font-bold mb-1" style={{ color: cfg.color }}>{cfg.label}</span>
                <span className="text-sm" style={{ color: "#94a3b8" }}>{cfg.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: config.color }}>
              {config.emoji} {config.label}
            </span>
            <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>
              Guess 1 – {config.range}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#64748b" }}>Time</div>
            <div className="text-2xl font-mono font-bold" style={{ color: "#06b6d4" }}>
              {Math.floor(elapsed / 60).toString().padStart(2, "0")}:{(elapsed % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Attempts progress */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "#94a3b8" }}>Attempts Used</span>
            <span className="font-bold" style={{ color: attemptsLeft <= 2 ? "#ef4444" : "#e2e8f0" }}>
              {config.maxAttempts - attemptsLeft} / {config.maxAttempts}
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-2 rounded-full progress-bar"
              style={{
                width: `${progressPercent}%`,
                background: attemptsLeft <= 2
                  ? "linear-gradient(90deg,#ef4444,#dc2626)"
                  : `linear-gradient(90deg,${config.color},${config.color}aa)`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: config.maxAttempts }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: i < config.maxAttempts - attemptsLeft
                    ? guesses[config.maxAttempts - attemptsLeft - 1 - i]?.direction === "correct" ? "#22c55e22" : "#ef444422"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${i < config.maxAttempts - attemptsLeft
                    ? guesses[config.maxAttempts - attemptsLeft - 1 - i]?.direction === "correct" ? "#22c55e" : "#ef4444"
                    : "rgba(255,255,255,0.1)"}`,
                  color: i < config.maxAttempts - attemptsLeft
                    ? guesses[config.maxAttempts - attemptsLeft - 1 - i]?.direction === "correct" ? "#22c55e" : "#ef4444"
                    : "#475569",
                }}
              >
                {i < config.maxAttempts - attemptsLeft
                  ? guesses[config.maxAttempts - attemptsLeft - 1 - i]?.direction === "correct" ? "✓" : "✗"
                  : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Game states */}
        {gameState === "won" && (
          <div className="glass-card rounded-2xl p-8 mb-6 text-center bounce-in" style={{ border: "1px solid rgba(34,197,94,0.4)" }}>
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#22c55e" }}>You Got It!</h2>
            <p className="text-lg mb-1" style={{ color: "#94a3b8" }}>
              The number was <strong style={{ color: "#e2e8f0" }}>{target}</strong>
            </p>
            <p className="text-sm mb-4" style={{ color: "#64748b" }}>
              {guesses.length} guess{guesses.length !== 1 ? "es" : ""} · {elapsed}s
            </p>
            <div className="text-4xl font-extrabold mb-6 neon-text" style={{ color: "#a78bfa" }}>
              {score.toLocaleString()} pts
            </div>
            {!nameSaved ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Your name for leaderboard…"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveScore()}
                  maxLength={20}
                  className="flex-1 px-4 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,58,237,0.3)", color: "#e2e8f0", outline: "none" }}
                />
                <button
                  onClick={handleSaveScore}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: "#7c3aed", color: "white" }}
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm" style={{ color: "#22c55e" }}>Score saved! Check the leaderboard.</p>
            )}
          </div>
        )}

        {gameState === "lost" && (
          <div className="glass-card rounded-2xl p-8 mb-6 text-center bounce-in" style={{ border: "1px solid rgba(239,68,68,0.4)" }}>
            <div className="text-5xl mb-3">💥</div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#ef4444" }}>Game Over!</h2>
            <p className="text-lg mb-1" style={{ color: "#94a3b8" }}>
              The number was <strong style={{ color: "#e2e8f0" }}>{target}</strong>
            </p>
            <p className="text-sm" style={{ color: "#64748b" }}>Better luck next time!</p>
          </div>
        )}

        {/* Input */}
        {gameState === "playing" && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <p className="text-sm mb-3 text-center" style={{ color: "#94a3b8" }}>
              Enter a number between <strong style={{ color: "#e2e8f0" }}>1</strong> and <strong style={{ color: "#e2e8f0" }}>{config.range}</strong>
            </p>
            <div className={`flex gap-3 ${shakeInput ? "shake" : ""}`}>
              <input
                ref={inputRef}
                type="number"
                min={1}
                max={config.range}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                placeholder={`1 – ${config.range}`}
                className="flex-1 px-4 py-3 rounded-xl text-xl font-bold text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "#e2e8f0",
                  outline: "none",
                }}
              />
              <button
                onClick={handleGuess}
                className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", minWidth: "100px" }}
              >
                Guess!
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleRestart}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
          >
            Restart
          </button>
          <Link
            href="/game"
            onClick={() => { setGameState("selecting"); }}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-center transition-all hover:opacity-80"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", textDecoration: "none" }}
          >
            Change Difficulty
          </Link>
          <Link
            href="/leaderboard"
            className="flex-1 py-2 rounded-xl text-sm font-medium text-center transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", textDecoration: "none" }}
          >
            Leaderboard
          </Link>
        </div>

        {/* Guess history */}
        {guesses.length > 0 && (
          <div className="glass-card rounded-2xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#64748b" }}>Guess History</h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {guesses.map((g, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2 rounded-lg number-slide"
                  style={{
                    background: g.direction === "correct"
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(239,68,68,0.05)",
                    border: `1px solid ${g.direction === "correct" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.15)"}`,
                  }}
                >
                  <span className="font-bold text-lg" style={{ color: "#e2e8f0" }}>{g.value}</span>
                  <span className="text-sm" style={{ color: g.direction === "correct" ? "#22c55e" : g.direction === "low" ? "#f59e0b" : "#06b6d4" }}>
                    {g.hint} {g.direction === "low" ? "↑" : g.direction === "high" ? "↓" : "✓"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]" style={{ color: "#94a3b8" }}>Loading...</div>}>
      <GameContent />
    </Suspense>
  );
}
