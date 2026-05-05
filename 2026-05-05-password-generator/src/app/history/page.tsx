"use client";

import { useState, useEffect } from "react";
import { loadHistory, clearHistory, type HistoryEntry } from "@/lib/password";

const strengthColors: Record<string, string> = {
  "Weak":        "text-red-400 bg-red-400/10 border-red-400/30",
  "Fair":        "text-orange-400 bg-orange-400/10 border-orange-400/30",
  "Good":        "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "Strong":      "text-green-400 bg-green-400/10 border-green-400/30",
  "Very Strong": "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleCopy = async (entry: HistoryEntry) => {
    await navigator.clipboard.writeText(entry.password);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const strengths = ["All", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const filtered = filter === "All" ? history : history.filter(e => e.strength === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Password History</h1>
          <p className="text-slate-400 mt-1">{history.length} password{history.length !== 1 ? "s" : ""} saved</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30 text-sm font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter tabs */}
      {history.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {strengths.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                filter === s
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔐</div>
          <p className="text-slate-400 text-lg">
            {history.length === 0 ? "No saved passwords yet." : "No passwords match this filter."}
          </p>
          {history.length === 0 && (
            <p className="text-slate-500 text-sm">Generate a password and hit Save to see it here.</p>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map(entry => (
            <li
              key={entry.id}
              className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white break-all">{entry.password}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${strengthColors[entry.strength] ?? ""}`}>
                    {entry.strength}
                  </span>
                  <span className="text-xs text-slate-500">{entry.length} chars</span>
                  <span className="text-xs text-slate-500">{timeAgo(entry.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(entry)}
                className="shrink-0 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-300 transition-colors"
              >
                {copiedId === entry.id ? "✓" : "Copy"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
