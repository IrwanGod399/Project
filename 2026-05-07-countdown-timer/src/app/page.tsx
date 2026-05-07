"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CountdownCard from "@/components/CountdownCard";
import { Countdown, loadCountdowns, saveCountdowns } from "@/lib/countdowns";

export default function Home() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCountdowns(loadCountdowns());
    setMounted(true);
  }, []);

  function handleDelete(id: string) {
    const updated = countdowns.filter((c) => c.id !== id);
    setCountdowns(updated);
    saveCountdowns(updated);
  }

  const upcoming = countdowns
    .filter((c) => new Date(c.date + "T00:00:00").getTime() >= Date.now() - 86400000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = countdowns
    .filter((c) => new Date(c.date + "T00:00:00").getTime() < Date.now() - 86400000)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-lg animate-pulse">Loading your events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div
        className="relative overflow-hidden py-16 px-4"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1a1035 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${180 + i * 70}px`,
                height: `${180 + i * 70}px`,
                opacity: 0.08,
                background: i % 2 === 0 ? "#7c3aed" : "#3b82f6",
                left: `${(i * 20) % 85}%`,
                top: `${(i * 30) % 75}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="pulse-dot w-2 h-2 rounded-full bg-violet-400 inline-block" />
            <span className="text-violet-400 text-sm font-medium uppercase tracking-widest">
              Live Countdowns
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Every Moment
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #60a5fa)" }}
            >
              Counts
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            Track the time until your most important events and milestones.
          </p>
          <Link
            href="/add"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}
          >
            <span className="text-lg">+</span> Add New Event
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 text-sm">
          <span className="text-slate-400">
            <span className="text-white font-semibold">{upcoming.length}</span> upcoming
          </span>
          <span className="text-slate-400">
            <span className="text-white font-semibold">{past.length}</span> past
          </span>
          <span className="text-slate-400">
            <span className="text-white font-semibold">{countdowns.length}</span> total
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {countdowns.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗓️</div>
            <h2 className="text-2xl font-bold text-white mb-2">No events yet</h2>
            <p className="text-slate-400 mb-6">Add your first countdown to get started!</p>
            <Link
              href="/add"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
            >
              + Add Event
            </Link>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full inline-block" style={{ background: "#7c3aed" }} />
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map((c) => (
                    <CountdownCard key={c.id} countdown={c} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-400 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-slate-600 rounded-full inline-block" />
                  Past Events
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                  {past.map((c) => (
                    <CountdownCard key={c.id} countdown={c} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
