"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TypingTest from "@/components/TypingTest";
import { WordSet, Duration } from "@/lib/words";

function TestContent() {
  const searchParams = useSearchParams();
  const initialDuration = (Number(searchParams.get("duration")) || 30) as Duration;
  const initialWordSet = (searchParams.get("wordSet") || "common") as WordSet;

  const [duration, setDuration] = useState<Duration>(initialDuration);
  const [wordSet, setWordSet] = useState<WordSet>(initialWordSet);
  const [testKey, setTestKey] = useState(0);

  const restart = () => setTestKey((k) => k + 1);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-100">Typing Test</h1>
        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            {([15, 30, 60, 120] as Duration[]).map((d) => (
              <button
                key={d}
                onClick={() => { setDuration(d); restart(); }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  duration === d
                    ? "bg-amber-400 text-slate-900"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {d}s
              </button>
            ))}
          </div>
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            {(["common", "programming", "quotes"] as WordSet[]).map((ws) => (
              <button
                key={ws}
                onClick={() => { setWordSet(ws); restart(); }}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  wordSet === ws
                    ? "bg-amber-400 text-slate-900"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {ws}
              </button>
            ))}
          </div>
        </div>
      </div>

      <TypingTest key={testKey} wordSet={wordSet} duration={duration} />

      <div className="text-center">
        <button
          onClick={restart}
          className="text-slate-500 hover:text-amber-400 text-sm transition-colors"
        >
          ↻ Restart Test
        </button>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading...</div>}>
      <TestContent />
    </Suspense>
  );
}
