"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Difficulty, TextSample, TestResult } from "@/lib/types";
import { getRandomText } from "@/lib/texts";
import { saveResult } from "@/lib/storage";

type CharState = "idle" | "correct" | "error" | "cursor";

const DURATION_OPTIONS = [30, 60, 120];

export default function TypingTest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlDifficulty = searchParams.get("difficulty") as Difficulty | null;

  const [difficulty, setDifficulty] = useState<Difficulty>(urlDifficulty ?? "medium");
  const [duration, setDuration] = useState(60);
  const [sample, setSample] = useState<TextSample>(() => getRandomText(urlDifficulty ?? "medium"));
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [result, setResult] = useState<TestResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const targetText = sample.text;

  const computeResult = useCallback(
    (typedStr: string, elapsed: number): TestResult => {
      const words = typedStr.trim().split(/\s+/).filter(Boolean).length;
      const minutes = elapsed / 60;
      const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

      let errors = 0;
      for (let i = 0; i < typedStr.length; i++) {
        if (typedStr[i] !== targetText[i]) errors++;
      }
      const accuracy =
        typedStr.length > 0
          ? Math.round(((typedStr.length - errors) / typedStr.length) * 100)
          : 100;

      return {
        id: crypto.randomUUID(),
        wpm,
        accuracy,
        difficulty,
        duration: elapsed,
        timestamp: Date.now(),
        errors,
        totalChars: typedStr.length,
      };
    },
    [targetText, difficulty]
  );

  const finishTest = useCallback(
    (typedStr: string) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const r = computeResult(typedStr, elapsed);
      setResult(r);
      saveResult(r);
      setFinished(true);
    },
    [computeResult]
  );

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, duration - elapsed);
        setTimeLeft(Math.ceil(remaining));
        if (remaining <= 0) {
          finishTest(typed);
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, finished, duration, typed, finishTest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (finished) return;

    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (val.length > targetText.length) return;
    setTyped(val);

    if (val === targetText) {
      finishTest(val);
    }
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newSample = getRandomText(difficulty);
    setSample(newSample);
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(duration);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    if (timerRef.current) clearInterval(timerRef.current);
    setSample(getRandomText(d));
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(duration);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleDurationChange = (d: number) => {
    setDuration(d);
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(d);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const getCharState = (index: number): CharState => {
    if (index === typed.length) return "cursor";
    if (index >= typed.length) return "idle";
    return typed[index] === targetText[index] ? "correct" : "error";
  };

  const progress = Math.min((typed.length / targetText.length) * 100, 100);
  const liveWpm = (() => {
    if (!started || !startTimeRef.current) return 0;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const words = typed.trim().split(/\s+/).filter(Boolean).length;
    return elapsed > 0 ? Math.round(words / (elapsed / 60)) : 0;
  })();

  const difficultyColors: Record<Difficulty, string> = {
    easy: "bg-green-600 text-white",
    medium: "bg-yellow-600 text-white",
    hard: "bg-red-600 text-white",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Typing Test</h1>
          <p className="text-sm text-gray-400">Category: {sample.category}</p>
        </div>
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => handleDifficultyChange(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                difficulty === d
                  ? difficultyColors[d]
                  : "bg-gray-800 text-gray-400 hover:text-gray-100"
              }`}
            >
              {d}
            </button>
          ))}
          <div className="w-px bg-gray-700 mx-1" />
          {DURATION_OPTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => handleDurationChange(sec)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                duration === sec
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-gray-100"
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <div className={`text-3xl font-bold font-mono ${timeLeft <= 10 && started ? "text-red-400 animate-pulse" : "text-indigo-400"}`}>
            {finished ? "0" : timeLeft}
          </div>
          <div className="text-xs text-gray-500 mt-1">seconds</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold font-mono text-purple-400">
            {finished ? result?.wpm ?? 0 : liveWpm}
          </div>
          <div className="text-xs text-gray-500 mt-1">wpm</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold font-mono text-pink-400">
            {finished
              ? `${result?.accuracy ?? 0}%`
              : typed.length > 0
              ? `${Math.round(
                  ((typed.split("").filter((c, i) => c === targetText[i]).length) /
                    typed.length) *
                    100
                )}%`
              : "—"}
          </div>
          <div className="text-xs text-gray-500 mt-1">accuracy</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Text display */}
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-lg leading-relaxed cursor-text select-none"
        onClick={() => inputRef.current?.focus()}
      >
        {targetText.split("").map((char, i) => {
          const state = getCharState(i);
          return (
            <span
              key={i}
              className={
                state === "cursor"
                  ? "border-l-2 border-indigo-400 animate-pulse"
                  : state === "correct"
                  ? "text-gray-200"
                  : state === "error"
                  ? "text-red-400 bg-red-950/40"
                  : "text-gray-500"
              }
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        disabled={finished}
        autoFocus
        className="opacity-0 absolute -top-96 w-0 h-0"
        aria-label="Type the text above"
      />

      {!started && !finished && (
        <p className="text-center text-gray-500 text-sm animate-pulse">
          Click on the text above or start typing to begin the timer...
        </p>
      )}

      {/* Finished overlay */}
      {finished && result && (
        <div className="bg-gray-900 border border-indigo-800/50 rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-gray-100">
            Test Complete!
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <Stat label="WPM" value={result.wpm} unit="" color="text-indigo-400" />
            <Stat label="Accuracy" value={result.accuracy} unit="%" color="text-purple-400" />
            <Stat label="Errors" value={result.errors} unit="" color="text-red-400" />
            <Stat label="Characters" value={result.totalChars} unit="" color="text-pink-400" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/stats")}
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              View Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3">
      <div className={`text-2xl font-bold font-mono ${color}`}>
        {value}
        {unit}
      </div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
