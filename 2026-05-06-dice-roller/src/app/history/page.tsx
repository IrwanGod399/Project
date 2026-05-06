"use client";
import { useState, useEffect, useMemo } from "react";
import { loadHistory, clearHistory, RollRecord } from "@/lib/storage";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)  return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-7 text-right shrink-0">{label}</span>
      <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-6 shrink-0">{value}</span>
    </div>
  );
}

export default function HistoryPage() {
  const [history, setHistory]   = useState<RollRecord[]>([]);
  const [filter, setFilter]     = useState("all");
  const [showClear, setShowClear] = useState(false);

  useEffect(() => { setHistory(loadHistory()); }, []);

  const diceTypes = useMemo(() => {
    const types = new Set(history.map((r) => r.diceType));
    return ["all", ...Array.from(types).sort()];
  }, [history]);

  const filtered = useMemo(
    () => filter === "all" ? history : history.filter((r) => r.diceType === filter),
    [history, filter]
  );

  const stats = useMemo(() => {
    if (filtered.length === 0) return null;
    const totals = filtered.map((r) => r.total);
    const avg    = totals.reduce((s, t) => s + t, 0) / totals.length;
    const max    = Math.max(...totals);
    const min    = Math.min(...totals);
    return { avg: avg.toFixed(1), max, min, count: filtered.length };
  }, [filtered]);

  // Individual die value distribution for d6 history
  const distribution = useMemo(() => {
    const d6rolls = filtered.filter((r) => r.diceType === "d6");
    if (d6rolls.length === 0) return null;
    const freq: Record<number, number> = {};
    for (const roll of d6rolls) {
      for (const v of roll.results) {
        freq[v] = (freq[v] ?? 0) + 1;
      }
    }
    const maxFreq = Math.max(...Object.values(freq));
    return { freq, maxFreq };
  }, [filtered]);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setShowClear(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Roll History
        </h1>
        <p className="text-gray-400 mt-1 text-sm">Your recent rolls and statistics</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-5xl mb-4">🎲</p>
          <p className="text-lg">No rolls yet — head to the roller to get started!</p>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Rolls", value: stats.count,  color: "text-purple-400" },
                { label: "Average",     value: stats.avg,    color: "text-fuchsia-400" },
                { label: "Highest",     value: stats.max,    color: "text-green-400"  },
                { label: "Lowest",      value: stats.min,    color: "text-red-400"    },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                  <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* d6 distribution */}
          {distribution && filter !== "all" && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                d6 Face Distribution
              </h2>
              <div className="space-y-1.5">
                {[1, 2, 3, 4, 5, 6].map((face) => (
                  <Bar
                    key={face}
                    label={`${face}`}
                    value={distribution.freq[face] ?? 0}
                    max={distribution.maxFreq}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Filter & clear */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1.5 flex-wrap">
              {diceTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    filter === t
                      ? "border-purple-500 bg-purple-600/30 text-purple-300"
                      : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  {t === "all" ? "All" : t}
                </button>
              ))}
            </div>
            {!showClear ? (
              <button
                onClick={() => setShowClear(true)}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Clear history
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Are you sure?</span>
                <button onClick={handleClear} className="text-xs text-red-400 hover:text-red-300 font-semibold">
                  Yes, clear
                </button>
                <button onClick={() => setShowClear(false)} className="text-xs text-gray-500 hover:text-white">
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Roll list */}
          <div className="space-y-2">
            {filtered.map((roll) => (
              <div
                key={roll.id}
                className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-purple-400 w-10 text-right">
                    {roll.total}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {roll.count}{roll.diceType}
                      {roll.modifier !== 0 && (
                        <span className={roll.modifier > 0 ? "text-green-400" : "text-red-400"}>
                          {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      [{roll.results.join(", ")}]
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{timeAgo(roll.timestamp)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
