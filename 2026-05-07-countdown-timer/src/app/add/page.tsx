"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Countdown,
  GradientKey,
  GRADIENTS,
  loadCountdowns,
  saveCountdowns,
  getTimeRemaining,
  formatDate,
} from "@/lib/countdowns";

const EMOJI_OPTIONS = [
  "🎆", "🎄", "🎃", "☀️", "🦃", "💝", "🎂", "🚀", "🏆", "🎵",
  "✈️", "🎓", "💍", "🏠", "🌍", "⭐", "🎯", "🎉", "🌸", "🏄",
  "🎸", "📚", "💪", "🌙", "🦋", "🍕", "⚽", "🎨", "🧪", "🎪",
];

function TimePreview({ dateStr }: { dateStr: string }) {
  const time = getTimeRemaining(dateStr);
  if (time.isPast) return <p className="text-red-400 text-sm">This date is in the past</p>;
  return (
    <div className="flex gap-3 text-white text-sm">
      {[
        { v: time.days, l: "days" },
        { v: time.hours, l: "hrs" },
        { v: time.minutes, l: "min" },
      ].map(({ v, l }) => (
        <span key={l} className="text-slate-300">
          <span className="font-bold text-white">{v}</span> {l}
        </span>
      ))}
    </div>
  );
}

export default function AddPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [emoji, setEmoji] = useState("🎆");
  const [gradient, setGradient] = useState<GradientKey>("violet");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const gradKeys = Object.keys(GRADIENTS) as GradientKey[];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter an event name"); return; }
    if (!date) { setError("Please select a date"); return; }

    const newItem: Countdown = {
      id: Date.now().toString(),
      name: name.trim(),
      date,
      emoji,
      gradient,
      createdAt: new Date().toISOString(),
    };

    const all = loadCountdowns();
    saveCountdowns([...all, newItem]);
    router.push("/");
  }

  const grad = GRADIENTS[gradient];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          ← Back to events
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Add New Event</h1>
        <p className="text-slate-400 mb-8">Create a countdown for your next big moment.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="e.g. My Birthday 2027"
                maxLength={40}
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => { setDate(e.target.value); setError(""); }}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all [color-scheme:dark]"
              />
              {date && <div className="mt-2 pl-1">{<TimePreview dateStr={date} />}</div>}
            </div>

            {/* Emoji */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Pick an Emoji
              </label>
              <div className="grid grid-cols-10 gap-1.5 bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`text-xl p-1.5 rounded-lg transition-all hover:scale-110 ${
                      emoji === e
                        ? "bg-violet-600 shadow-lg shadow-violet-600/30"
                        : "hover:bg-slate-700"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Card Color
              </label>
              <div className="flex flex-wrap gap-2">
                {gradKeys.map((key) => {
                  const g = GRADIENTS[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGradient(key)}
                      className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                        gradient === key ? "ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110" : ""
                      }`}
                      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                      title={g.label}
                    />
                  );
                })}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
              >
                Create Countdown
              </button>
              <Link
                href="/"
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Live preview */}
          <div>
            <p className="text-sm font-medium text-slate-400 mb-3">Preview</p>
            <div
              className="rounded-2xl p-6 text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                minHeight: "180px",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{emoji}</span>
                <div>
                  <p className="font-bold text-lg leading-tight">{name || "Your Event Name"}</p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {date ? formatDate(date) : "Select a date"}
                  </p>
                </div>
              </div>
              {date ? (
                <div className="flex justify-between text-white mt-2">
                  {[
                    { v: getTimeRemaining(date).days, l: "Days" },
                    { v: getTimeRemaining(date).hours, l: "Hours" },
                    { v: getTimeRemaining(date).minutes, l: "Mins" },
                    { v: getTimeRemaining(date).seconds, l: "Secs" },
                  ].map(({ v, l }) => (
                    <div key={l} className="flex flex-col items-center">
                      <span className="text-2xl font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
                      <span className="text-xs uppercase tracking-widest opacity-60 mt-1">{l}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between text-white/40 mt-2">
                  {["Days", "Hours", "Mins", "Secs"].map((l) => (
                    <div key={l} className="flex flex-col items-center">
                      <span className="text-2xl font-bold">--</span>
                      <span className="text-xs uppercase tracking-widest mt-1">{l}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-400 space-y-1">
              <p className="text-slate-300 font-medium">Tips</p>
              <p>• Your events are saved in your browser</p>
              <p>• Countdowns update every second</p>
              <p>• Click a card to see its full details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
