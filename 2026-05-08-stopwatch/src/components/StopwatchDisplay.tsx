"use client";

import { formatTime } from "@/lib/utils";

interface Props {
  elapsed: number;
  isRunning: boolean;
}

export default function StopwatchDisplay({ elapsed, isRunning }: Props) {
  const [mins, rest] = formatTime(elapsed).split(":");
  const [secs, cs] = rest.split(".");

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-full w-64 h-64 mx-auto border-2 transition-all duration-500 ${
        isRunning
          ? "border-violet-500 running-glow"
          : elapsed > 0
          ? "border-slate-600"
          : "border-slate-700"
      }`}
      style={{ background: "radial-gradient(circle at center, #13131f 60%, #0a0a0f 100%)" }}
    >
      <div className="font-mono text-5xl font-bold tracking-tighter text-slate-100 select-none tabular-nums">
        {mins}:{secs}
      </div>
      <div className="font-mono text-2xl text-violet-400 font-semibold tabular-nums">.{cs}</div>
      {isRunning && (
        <span className="absolute top-4 right-6 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      )}
    </div>
  );
}
