"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import TimerRing from "@/components/TimerRing";
import { Mode, Settings, DEFAULT_SETTINGS, MODE_LABELS, MODE_COLORS } from "@/lib/types";
import { addSession, getSettings } from "@/lib/storage";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const TASKS = [
  "Deep work session",
  "Code review",
  "Writing",
  "Study",
  "Design work",
  "Research",
  "Planning",
];

export default function TimerPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SETTINGS.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSeconds = useRef(DEFAULT_SETTINGS.focusDuration * 60);

  useEffect(() => {
    const s = getSettings();
    setSettings(s);
    totalSeconds.current = s.focusDuration * 60;
    setSecondsLeft(s.focusDuration * 60);
  }, []);

  const getDuration = useCallback((m: Mode, s: Settings) => {
    if (m === "focus") return s.focusDuration * 60;
    if (m === "short") return s.shortBreak * 60;
    return s.longBreak * 60;
  }, []);

  const finishSession = useCallback(() => {
    setIsRunning(false);
    setCompleted(true);

    addSession({
      id: crypto.randomUUID(),
      mode,
      duration: totalSeconds.current,
      completedAt: new Date().toISOString(),
      label: mode === "focus" ? TASKS[taskIndex] : MODE_LABELS[mode],
    });

    if (mode === "focus") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      const nextMode: Mode =
        newCount % settings.longBreakInterval === 0 ? "long" : "short";
      setTimeout(() => {
        setMode(nextMode);
        const dur = getDuration(nextMode, settings);
        totalSeconds.current = dur;
        setSecondsLeft(dur);
        setCompleted(false);
        if (settings.autoStartBreaks) setIsRunning(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setMode("focus");
        const dur = getDuration("focus", settings);
        totalSeconds.current = dur;
        setSecondsLeft(dur);
        setCompleted(false);
        if (settings.autoStartFocus) setIsRunning(true);
      }, 1500);
    }
  }, [mode, pomodoroCount, settings, taskIndex, getDuration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            finishSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, finishSession]);

  function switchMode(newMode: Mode) {
    setIsRunning(false);
    setCompleted(false);
    setMode(newMode);
    const dur = getDuration(newMode, settings);
    totalSeconds.current = dur;
    setSecondsLeft(dur);
  }

  function handleReset() {
    setIsRunning(false);
    setCompleted(false);
    const dur = getDuration(mode, settings);
    totalSeconds.current = dur;
    setSecondsLeft(dur);
  }

  const progress = totalSeconds.current > 0 ? 1 - secondsLeft / totalSeconds.current : 0;
  const color = MODE_COLORS[mode];

  const glowClass =
    mode === "focus"
      ? "timer-glow-focus"
      : mode === "short"
      ? "timer-glow-short"
      : "timer-glow-long";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-md mx-auto fade-in">
        {/* Mode tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl mb-10">
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === m
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Timer ring */}
        <div className="flex items-center justify-center mb-10">
          <div
            className={`relative flex items-center justify-center w-[280px] h-[280px] rounded-full transition-all duration-500 ${glowClass}`}
          >
            <TimerRing progress={progress} color={color} size={280} />
            <div className="text-center z-10">
              <div
                className="text-7xl font-bold tracking-tight tabular-nums"
                style={{ color: completed ? color : "white" }}
              >
                {completed ? "✓" : formatTime(secondsLeft)}
              </div>
              <div className="text-white/40 text-sm mt-1 font-medium">
                {MODE_LABELS[mode]}
              </div>
            </div>
          </div>
        </div>

        {/* Task picker */}
        {mode === "focus" && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-white/30 text-sm">Task:</span>
            <button
              onClick={() => setTaskIndex((i) => (i + 1) % TASKS.length)}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors border border-white/10 rounded-full px-3 py-1 hover:border-white/30"
            >
              {TASKS[taskIndex]} ↻
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center justify-center text-xl"
            title="Reset"
          >
            ↺
          </button>
          <button
            onClick={() => setIsRunning((r) => !r)}
            className="w-20 h-20 rounded-full font-bold text-white text-xl transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
            style={{ backgroundColor: color }}
          >
            {isRunning ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => {
              const modes: Mode[] = ["focus", "short", "long"];
              const next = modes[(modes.indexOf(mode) + 1) % modes.length];
              switchMode(next);
            }}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center justify-center text-xl"
            title="Skip"
          >
            ⏭
          </button>
        </div>

        {/* Pomodoro progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: settings.longBreakInterval }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i < pomodoroCount % settings.longBreakInterval
                  ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                  : "bg-white/10"
              }`}
            />
          ))}
          <span className="text-white/30 text-xs ml-2">{pomodoroCount} completed</span>
        </div>
      </div>
    </main>
  );
}
