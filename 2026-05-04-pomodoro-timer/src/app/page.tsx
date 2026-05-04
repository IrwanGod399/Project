"use client";

import { useState, useEffect, useRef } from "react";
import CircularTimer from "@/components/CircularTimer";
import { getSettings, addSession, Settings, DEFAULT_SETTINGS } from "@/lib/storage";

type Mode = "focus" | "short-break" | "long-break";

const LABELS: Record<Mode, string> = {
  focus: "Focus",
  "short-break": "Short Break",
  "long-break": "Long Break",
};

const BG: Record<Mode, string> = {
  focus: "bg-rose-500",
  "short-break": "bg-emerald-500",
  "long-break": "bg-blue-500",
};

const TEXT: Record<Mode, string> = {
  focus: "text-rose-400",
  "short-break": "text-emerald-400",
  "long-break": "text-blue-400",
};

const BORDER: Record<Mode, string> = {
  focus: "border-rose-500/30",
  "short-break": "border-emerald-500/30",
  "long-break": "border-blue-500/30",
};

function getDuration(m: Mode, s: Settings): number {
  if (m === "focus") return s.focusDuration * 60;
  if (m === "short-break") return s.shortBreakDuration * 60;
  return s.longBreakDuration * 60;
}

function playDing() {
  try {
    const ctx = new AudioContext();
    const notes = [880, 1100, 660];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.22;
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  } catch {
    // AudioContext not available
  }
}

export default function TimerPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SETTINGS.focusDuration * 60);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_SETTINGS.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const [task, setTask] = useState("");

  // Always-fresh ref so timer callbacks read latest values
  const fresh = useRef({ mode, settings, completedFocus, task, isRunning });
  fresh.current = { mode, settings, completedFocus, task, isRunning };

  useEffect(() => {
    const s = getSettings();
    setSettings(s);
    const dur = s.focusDuration * 60;
    setSecondsLeft(dur);
    setTotalSeconds(dur);
  }, []);

  // Session complete handler — runs outside the interval, reads fresh ref
  const handleComplete = () => {
    const { mode: m, settings: s, completedFocus: cf, task: t } = fresh.current;

    setIsRunning(false);

    const durationMin =
      m === "focus" ? s.focusDuration : m === "short-break" ? s.shortBreakDuration : s.longBreakDuration;

    addSession({
      id: Date.now().toString(),
      type: m,
      duration: durationMin,
      completedAt: new Date().toISOString(),
      task: t || undefined,
    });

    playDing();

    if (m === "focus") {
      const newFocus = cf + 1;
      setCompletedFocus(newFocus);
      const next: Mode = newFocus % s.sessionsUntilLongBreak === 0 ? "long-break" : "short-break";
      const nextDur = getDuration(next, s);
      setMode(next);
      setSecondsLeft(nextDur);
      setTotalSeconds(nextDur);
      if (s.autoStartBreaks) setTimeout(() => setIsRunning(true), 600);
    } else {
      const nextDur = getDuration("focus", s);
      setMode("focus");
      setSecondsLeft(nextDur);
      setTotalSeconds(nextDur);
      if (s.autoStartFocus) setTimeout(() => setIsRunning(true), 600);
    }
  };

  // Interval — uses setTimeout to escape the updater function for side effects
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimeout(handleComplete, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const changeMode = (m: Mode) => {
    setMode(m);
    setIsRunning(false);
    const dur = getDuration(m, settings);
    setSecondsLeft(dur);
    setTotalSeconds(dur);
  };

  const reset = () => {
    setIsRunning(false);
    const dur = getDuration(mode, settings);
    setSecondsLeft(dur);
    setTotalSeconds(dur);
  };

  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const cyclesCompleted = Math.floor(completedFocus / settings.sessionsUntilLongBreak);
  const dotsActive = completedFocus % settings.sessionsUntilLongBreak;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-8 px-4 py-12 select-none">
      {/* Mode tabs */}
      <div className={`flex gap-1.5 bg-slate-900 border rounded-2xl p-1.5 transition-colors ${BORDER[mode]}`}>
        {(["focus", "short-break", "long-break"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => changeMode(m)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              mode === m ? `${BG[m]} text-white shadow-lg` : "text-slate-400 hover:text-white"
            }`}
          >
            {LABELS[m]}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="relative">
        <CircularTimer progress={progress} mode={mode}>
          <div className="text-center">
            <div className={`text-7xl font-mono font-bold tracking-tight transition-colors ${TEXT[mode]}`}>
              {mm}:{ss}
            </div>
            <div className="text-slate-500 text-xs mt-3 uppercase tracking-[0.2em] font-medium">
              {LABELS[mode]}
            </div>
          </div>
        </CircularTimer>
        {/* Pulse ring when running */}
        {isRunning && (
          <div
            className={`absolute inset-0 rounded-full animate-ping opacity-5 ${BG[mode]}`}
            style={{ animationDuration: "2s" }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all font-medium text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`px-14 py-3.5 rounded-xl font-bold text-lg text-white transition-all shadow-xl ${
            isRunning
              ? "bg-slate-800 hover:bg-slate-700 border border-slate-700"
              : `${BG[mode]} hover:opacity-90 shadow-lg`
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            changeMode(mode === "focus" ? "short-break" : "focus");
          }}
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all font-medium text-sm"
          title="Skip"
        >
          Skip
        </button>
      </div>

      {/* Task input */}
      {mode === "focus" && (
        <div className="w-full max-w-xs">
          <input
            type="text"
            placeholder="What are you working on?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            maxLength={80}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/40 focus:bg-slate-900 transition-all"
          />
        </div>
      )}

      {/* Session progress dots */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          {Array.from({ length: settings.sessionsUntilLongBreak }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < dotsActive
                  ? "w-3.5 h-3.5 bg-rose-500 shadow-lg shadow-rose-500/30"
                  : "w-2.5 h-2.5 bg-slate-800"
              }`}
            />
          ))}
          {cyclesCompleted > 0 && (
            <span className="ml-1 text-xs text-slate-500 font-medium">×{cyclesCompleted}</span>
          )}
        </div>
        <p className="text-slate-600 text-xs">
          {completedFocus} focus {completedFocus === 1 ? "session" : "sessions"} completed today
        </p>
      </div>

      {/* Tip */}
      <div className="max-w-xs text-center">
        <p className="text-slate-700 text-xs leading-relaxed">
          {mode === "focus"
            ? "Stay focused. Eliminate distractions. One task at a time."
            : mode === "short-break"
            ? "Take a breath. Stretch. Rest your eyes."
            : "Great work! Take a longer break — you earned it."}
        </p>
      </div>
    </div>
  );
}
