"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type HistoryEntry = {
  id: string;
  category: string;
  categoryIcon: string;
  from: string;
  to: string;
  fromValue: string;
  toValue: string;
  timestamp: number;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("unitflow-history") || "[]");
    setHistory(stored);
    setLoaded(true);
  }, []);

  const categories = ["All", ...Array.from(new Set(history.map((h) => h.category)))];
  const filtered = filter === "All" ? history : history.filter((h) => h.category === filter);

  const clearHistory = () => {
    localStorage.removeItem("unitflow-history");
    setHistory([]);
    setFilter("All");
  };

  const removeEntry = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("unitflow-history", JSON.stringify(updated));
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - ts;
    if (diff < 60_000) return "Just now";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Conversion History</h1>
          <p className="text-gray-400 mt-1">Your saved conversions</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-all duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      {history.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "glass text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {!loaded ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-white mb-2">No history yet</h2>
          <p className="text-gray-500 mb-6">
            {filter !== "All"
              ? `No entries for ${filter}.`
              : "Start converting units and save them here."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 hover:bg-indigo-500/30 transition-all duration-200"
          >
            ← Browse categories
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4"
            >
              <span className="text-2xl flex-shrink-0">{entry.categoryIcon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-white font-semibold">{entry.fromValue}</span>
                  <span className="text-gray-500 text-sm">{entry.from}</span>
                  <span className="text-gray-600">→</span>
                  <span className="text-purple-300 font-semibold">{entry.toValue}</span>
                  <span className="text-gray-500 text-sm">{entry.to}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-md">{entry.category}</span>
                  <span className="text-xs text-gray-600">{formatTime(entry.timestamp)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/convert/${entry.category.toLowerCase()}`}
                  className="text-xs px-3 py-1.5 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Reuse
                </Link>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-gray-600 pt-2">
            {filtered.length} conversion{filtered.length !== 1 ? "s" : ""} shown
          </p>
        </div>
      )}
    </div>
  );
}
