"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Countdown,
  GRADIENTS,
  loadCountdowns,
  saveCountdowns,
  getTimeRemaining,
  formatDate,
} from "@/lib/countdowns";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

function Confetti() {
  const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#7c3aed", "#3b82f6", "#ec4899", "#10b981", "#f59e0b"][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 10,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function BigTimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[90px] text-center border border-white/20">
        <span className="text-5xl md:text-7xl font-bold tabular-nums leading-none text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-white/50 mt-3">{label}</span>
    </div>
  );
}

export default function CountdownDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [time, setTime] = useState({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const confettiShown = useRef(false);

  useEffect(() => {
    const all = loadCountdowns();
    const found = all.find((c) => c.id === id) || null;
    setCountdown(found);
    if (found) {
      const t = getTimeRemaining(found.date);
      setTime(t);
      if (t.isPast && !confettiShown.current) {
        setShowConfetti(true);
        confettiShown.current = true;
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!countdown) return;
    const interval = setInterval(() => {
      const t = getTimeRemaining(countdown.date);
      setTime(t);
      if (t.total <= 1000 && !t.isPast && !confettiShown.current) {
        setShowConfetti(true);
        confettiShown.current = true;
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  function handleDelete() {
    if (!countdown) return;
    const updated = loadCountdowns().filter((c) => c.id !== countdown.id);
    saveCountdowns(updated);
    router.push("/");
  }

  if (!countdown) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">🔍</div>
        <p className="text-white text-xl font-semibold">Event not found</p>
        <Link href="/" className="text-violet-400 hover:text-violet-300 transition-colors">
          ← Back to events
        </Link>
      </div>
    );
  }

  const grad = GRADIENTS[countdown.gradient];
  const totalDaysFromNow = Math.floor(time.total / (1000 * 60 * 60 * 24));
  const progressPct = Math.min(
    100,
    (1 - time.total / Math.abs(new Date(countdown.date + "T00:00:00").getTime() - new Date(countdown.createdAt).getTime())) * 100
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${grad.from}22 0%, #0f172a 40%, #0f172a 100%)` }}
    >
      {showConfetti && <Confetti />}

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: grad.from, top: "-10%", right: "-10%" }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: grad.to, bottom: "10%", left: "-10%" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors">
            ← All Events
          </Link>
          <button
            onClick={handleDelete}
            className="text-slate-500 hover:text-red-400 text-sm transition-colors flex items-center gap-1"
          >
            🗑 Delete
          </button>
        </div>

        {/* Event header */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-4 bounce-in">{countdown.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{countdown.name}</h1>
          <p className="text-slate-400 text-lg">{formatDate(countdown.date)}</p>
        </div>

        {time.isPast ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">This event has passed!</h2>
            <p className="text-slate-400">It was {totalDaysFromNow} days ago.</p>
          </div>
        ) : (
          <>
            {/* Big countdown display */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <BigTimeUnit value={time.days} label="Days" />
              <div className="text-white/30 text-5xl self-center font-light mt-[-20px]">:</div>
              <BigTimeUnit value={time.hours} label="Hours" />
              <div className="text-white/30 text-5xl self-center font-light mt-[-20px]">:</div>
              <BigTimeUnit value={time.minutes} label="Minutes" />
              <div className="text-white/30 text-5xl self-center font-light mt-[-20px]">:</div>
              <BigTimeUnit value={time.seconds} label="Seconds" />
            </div>

            {/* Progress info */}
            <div
              className="rounded-2xl p-6 border mb-6"
              style={{
                background: "rgba(15,23,42,0.8)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{time.days}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">Days Left</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{Math.floor(time.total / (1000 * 60 * 60))}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">Total Hours</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{Math.floor(time.total / (1000 * 60))}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">Total Mins</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(Math.max(0, progressPct))}% complete</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.max(0, progressPct)}%`,
                      background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${countdown.emoji} ${countdown.name} — ${formatDate(countdown.date)} (${time.days} days away)`
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all border border-slate-700"
          >
            {copied ? "✓ Copied!" : "📋 Copy Info"}
          </button>
          <Link
            href="/add"
            className="px-5 py-2.5 text-white rounded-xl text-sm font-medium transition-all"
            style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
          >
            + New Event
          </Link>
        </div>
      </div>
    </div>
  );
}
