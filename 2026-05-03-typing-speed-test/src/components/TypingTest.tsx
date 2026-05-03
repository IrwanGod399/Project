"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { textSamples, type Difficulty, type TextSample, saveResult } from "@/lib/texts";

const DURATION = 60;

type CharState = "correct" | "wrong" | "pending" | "current";

function getCharClass(state: CharState) {
  switch (state) {
    case "correct": return "text-green-400";
    case "wrong": return "text-red-400 bg-red-400/10 rounded-sm";
    case "current": return "bg-violet-500/30 text-violet-200 rounded-sm";
    case "pending": return "text-slate-500";
  }
}

export default function TypingTest() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [sample, setSample] = useState<TextSample>(() => getRandomSample("easy"));
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  function getRandomSample(diff: Difficulty): TextSample {
    const pool = textSamples.filter((t) => t.difficulty === diff);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const computeStats = useCallback((typedText: string) => {
    const target = sample.text;
    let correct = 0;
    let errorCount = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === target[i]) correct++;
      else errorCount++;
    }
    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const calculatedWpm = elapsed > 0 ? Math.round(wordsTyped / elapsed) : 0;
    const calculatedAccuracy = typedText.length > 0
      ? Math.round((correct / typedText.length) * 100)
      : 100;
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setErrors(errorCount);
  }, [sample.text]);

  const endTest = useCallback((typedText: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFinished(true);
    setStarted(false);
    computeStats(typedText);
  }, [computeStats]);

  useEffect(() => {
    if (started) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            endTest(typed);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, typed, endTest]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (finished) return;

    if (!started && value.length === 1) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (value.length > sample.text.length) return;
    setTyped(value);
    computeStats(value);

    if (value === sample.text) {
      endTest(value);
    }
  };

  const reset = (newDiff?: Difficulty) => {
    const d = newDiff ?? difficulty;
    if (newDiff) setDifficulty(newDiff);
    setSample(getRandomSample(d));
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(DURATION);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setSaved(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSave = () => {
    if (!playerName.trim() || saved) return;
    saveResult({
      wpm,
      accuracy,
      duration: DURATION - timeLeft,
      difficulty,
      date: new Date().toISOString(),
      name: playerName.trim(),
    });
    setSaved(true);
  };

  const chars = sample.text.split("").map((char, i) => {
    let state: CharState = "pending";
    if (i < typed.length) {
      state = typed[i] === char ? "correct" : "wrong";
    } else if (i === typed.length) {
      state = "current";
    }
    return { char, state };
  });

  const progress = (typed.length / sample.text.length) * 100;
  const timeProgress = (timeLeft / DURATION) * 100;

  const diffColors: Record<Difficulty, string> = {
    easy: "text-green-400 border-green-500/30 bg-green-500/10",
    medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    hard: "text-red-400 border-red-500/30 bg-red-500/10",
  };

  return (
    <div className="space-y-6">
      {/* Difficulty selector */}
      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-sm">Difficulty:</span>
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => reset(d)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              difficulty === d
                ? diffColors[d]
                : "text-slate-500 border-slate-700 hover:border-slate-500"
            }`}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-slate-400 text-sm">
          <span>📚</span>
          <span>{sample.category}</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "WPM", value: wpm, color: "text-cyan-400" },
          { label: "Accuracy", value: `${accuracy}%`, color: "text-green-400" },
          { label: "Errors", value: errors, color: errors > 0 ? "text-red-400" : "text-slate-400" },
          {
            label: "Time",
            value: `${timeLeft}s`,
            color: timeLeft <= 10 ? "text-red-400" : "text-violet-400",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-center">
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-slate-600 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Timer bar */}
      <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            timeLeft <= 10 ? "bg-red-500" : "bg-violet-500"
          }`}
          style={{ width: `${timeProgress}%` }}
        />
      </div>

      {/* Text display */}
      <div
        className="rounded-2xl bg-slate-900 border border-slate-800 p-6 cursor-text relative"
        onClick={() => inputRef.current?.focus()}
      >
        {!started && !finished && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-sm z-10">
            <p className="text-slate-400 text-lg animate-pulse">Click here or start typing…</p>
          </div>
        )}
        <p className="text-xl leading-relaxed tracking-wide font-mono select-none">
          {chars.map(({ char, state }, i) => (
            <span key={i} className={`${getCharClass(state)} relative`}>
              {state === "current" && (
                <span className="absolute -left-px top-0 bottom-0 w-0.5 bg-violet-400 caret-blink" />
              )}
              {char === " " && state === "wrong" ? "·" : char}
            </span>
          ))}
        </p>

        {/* Progress bar inside text box */}
        <div className="mt-4 h-0.5 rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hidden textarea for input capture */}
      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleInput}
        disabled={finished}
        className="opacity-0 absolute w-0 h-0 pointer-events-none"
        autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      {/* Finished overlay */}
      {finished && (
        <div className="rounded-2xl bg-slate-900 border border-violet-500/30 p-8 space-y-6 fade-in">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {wpm >= 100 ? "🚀" : wpm >= 70 ? "🔥" : wpm >= 50 ? "👍" : "💪"}
            </div>
            <h2 className="text-2xl font-bold text-white">Test Complete!</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-800 p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
              <div className="text-slate-500 text-sm">WPM</div>
            </div>
            <div className="rounded-xl bg-slate-800 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
              <div className="text-slate-500 text-sm">Accuracy</div>
            </div>
            <div className="rounded-xl bg-slate-800 p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{errors}</div>
              <div className="text-slate-500 text-sm">Errors</div>
            </div>
          </div>

          {/* Save to leaderboard */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Your name (for leaderboard)"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              maxLength={20}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim() || saved}
              className="px-5 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed"
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => reset(difficulty)}
              className="flex-1 px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all"
            >
              New Text
            </button>
          </div>
        </div>
      )}

      {/* Reset button while typing */}
      {!finished && (
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Press Tab to reset • Start typing to begin the timer</span>
          <button
            onClick={() => reset()}
            className="text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
