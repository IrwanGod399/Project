"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Countdown, GRADIENTS, getTimeRemaining, formatDate } from "@/lib/countdowns";

interface Props {
  countdown: Countdown;
  onDelete?: (id: string) => void;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-widest opacity-60 mt-1">{label}</span>
    </div>
  );
}

export default function CountdownCard({ countdown, onDelete }: Props) {
  const [time, setTime] = useState(() => getTimeRemaining(countdown.date));
  const grad = GRADIENTS[countdown.gradient];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(countdown.date));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown.date]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl group transition-transform hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
      }}
    >
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{countdown.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{countdown.name}</h3>
              <p className="text-white/60 text-xs mt-0.5">{formatDate(countdown.date)}</p>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={(e) => { e.preventDefault(); onDelete(countdown.id); }}
              className="text-white/40 hover:text-white/90 transition-colors text-lg leading-none p-1"
              aria-label="Delete"
            >
              ×
            </button>
          )}
        </div>

        {time.isPast ? (
          <div className="text-center py-2">
            <span className="text-white text-2xl font-bold">🎉 Event Passed!</span>
          </div>
        ) : (
          <div className="flex justify-between text-white mt-2">
            <TimeUnit value={time.days} label="Days" />
            <div className="text-white/40 text-2xl font-light self-start mt-1">:</div>
            <TimeUnit value={time.hours} label="Hours" />
            <div className="text-white/40 text-2xl font-light self-start mt-1">:</div>
            <TimeUnit value={time.minutes} label="Mins" />
            <div className="text-white/40 text-2xl font-light self-start mt-1">:</div>
            <TimeUnit value={time.seconds} label="Secs" />
          </div>
        )}

        <Link
          href={`/countdown/${countdown.id}`}
          className="mt-4 block text-center text-xs text-white/50 hover:text-white/90 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
