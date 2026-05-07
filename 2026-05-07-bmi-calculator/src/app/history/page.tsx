"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadHistory, clearHistory, getCategory, type BmiRecord } from "@/lib/bmi";

export default function HistoryPage() {
  const [records, setRecords] = useState<BmiRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecords(loadHistory());
  }, []);

  function handleClear() {
    if (confirm("Clear all history? This cannot be undone.")) {
      clearHistory();
      setRecords([]);
    }
  }

  if (!mounted) return null;

  const avg = records.length
    ? records.reduce((s, r) => s + r.bmi, 0) / records.length
    : null;

  const lowest = records.length ? Math.min(...records.map((r) => r.bmi)) : null;
  const highest = records.length ? Math.max(...records.map((r) => r.bmi)) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">BMI History</h1>
          <p className="text-slate-400 mt-1">{records.length} reading{records.length !== 1 ? "s" : ""} saved</p>
        </div>
        {records.length > 0 && (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-600/30 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-700/50">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-slate-400 text-lg mb-6">No readings yet.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
          >
            Calculate Your BMI
          </Link>
        </div>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Average BMI", value: avg!.toFixed(1), cat: getCategory(avg!) },
              { label: "Lowest BMI", value: lowest!.toFixed(1), cat: getCategory(lowest!) },
              { label: "Highest BMI", value: highest!.toFixed(1), cat: getCategory(highest!) },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border p-4 text-center ${stat.cat.bg}`}
              >
                <div className={`text-2xl font-bold ${stat.cat.color}`}>{stat.value}</div>
                <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Record list */}
          <div className="space-y-3">
            {records.map((record, i) => {
              const cat = getCategory(record.bmi);
              const date = new Date(record.date);
              const heightDisplay =
                record.unit === "metric"
                  ? `${record.height} cm`
                  : `${Math.floor(record.height / 12)} ft ${Math.round(record.height % 12)} in`;
              return (
                <div
                  key={record.id}
                  className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 ${cat.color} ${cat.bg}`}>
                    {record.bmi.toFixed(1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold ${cat.color}`}>{record.category}</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {record.weight} {record.unit === "metric" ? "kg" : "lbs"} · {heightDisplay}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-slate-300 text-sm">{date.toLocaleDateString()}</div>
                    <div className="text-slate-500 text-xs">{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
