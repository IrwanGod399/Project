"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import StopwatchDisplay from "./StopwatchDisplay";
import LapTable from "./LapTable";
import { generateId, formatTime } from "@/lib/utils";
import type { Lap, Session } from "@/lib/types";

export default function StopwatchApp() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [sessionName, setSessionName] = useState("");
  const [saved, setSaved] = useState(false);

  const startTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    setElapsed(offsetRef.current + (Date.now() - startTimeRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      offsetRef.current = elapsed;
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleStartStop = () => {
    setSaved(false);
    setIsRunning((r) => !r);
  };

  const handleLap = () => {
    if (!isRunning) return;
    const lapStart = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
    setLaps((prev) => [
      ...prev,
      { number: prev.length + 1, lapTime: elapsed - lapStart, totalTime: elapsed },
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    cancelAnimationFrame(rafRef.current);
    offsetRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setSaved(false);
    setSessionName("");
  };

  const handleSave = () => {
    if (elapsed === 0) return;
    const session: Session = {
      id: generateId(),
      name: sessionName.trim() || `Session ${new Date().toLocaleTimeString()}`,
      date: new Date().toISOString(),
      duration: elapsed,
      laps,
    };
    const existing = JSON.parse(localStorage.getItem("chronotrack-sessions") || "[]");
    localStorage.setItem("chronotrack-sessions", JSON.stringify([session, ...existing]));
    setSaved(true);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <StopwatchDisplay elapsed={elapsed} isRunning={isRunning} />

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="px-5 py-2.5 rounded-full text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Lap
        </button>
        <button
          onClick={handleStartStop}
          className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg ${
            isRunning
              ? "bg-red-600 hover:bg-red-500 text-white shadow-red-900/40"
              : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40"
          }`}
        >
          {isRunning ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
        </button>
        <button
          onClick={handleReset}
          disabled={elapsed === 0}
          className="px-5 py-2.5 rounded-full text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Reset
        </button>
      </div>

      {/* Save session */}
      {elapsed > 0 && !isRunning && (
        <div className="fade-in flex gap-2 w-full max-w-sm">
          <input
            type="text"
            placeholder="Name this session…"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button
            onClick={handleSave}
            disabled={saved}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              saved
                ? "bg-green-700 text-white cursor-default"
                : "bg-violet-700 hover:bg-violet-600 text-white"
            }`}
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
        </div>
      )}

      {/* Stats bar */}
      {laps.length > 0 && (
        <div className="w-full flex gap-4 text-xs text-slate-400 justify-center">
          <span>Total: <span className="text-slate-200 font-mono">{formatTime(elapsed)}</span></span>
          <span>Laps: <span className="text-slate-200 font-mono">{laps.length}</span></span>
          <span>Avg: <span className="text-slate-200 font-mono">{formatTime(Math.round(elapsed / laps.length))}</span></span>
        </div>
      )}

      <LapTable laps={laps} />
    </div>
  );
}
