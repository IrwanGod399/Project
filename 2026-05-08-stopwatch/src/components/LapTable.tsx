"use client";

import { formatTime } from "@/lib/utils";
import type { Lap } from "@/lib/types";

interface Props {
  laps: Lap[];
}

export default function LapTable({ laps }: Props) {
  if (laps.length === 0) return null;

  const times = laps.map((l) => l.lapTime);
  const fastest = Math.min(...times);
  const slowest = Math.max(...times);

  return (
    <div className="mt-6 rounded-xl border border-slate-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900 text-slate-400 uppercase text-xs tracking-wider">
            <th className="px-4 py-2 text-left">Lap</th>
            <th className="px-4 py-2 text-right">Lap Time</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {[...laps].reverse().map((lap) => {
            const isFastest = laps.length > 1 && lap.lapTime === fastest;
            const isSlowest = laps.length > 1 && lap.lapTime === slowest;
            return (
              <tr
                key={lap.number}
                className={`border-t border-slate-800 fade-in transition-colors ${
                  isFastest ? "bg-green-950/30" : isSlowest ? "bg-red-950/30" : "hover:bg-slate-900/50"
                }`}
              >
                <td className="px-4 py-2.5 font-mono">
                  <span className="text-slate-400">#{lap.number}</span>
                  {isFastest && <span className="ml-2 text-xs text-green-400 font-medium">fastest</span>}
                  {isSlowest && <span className="ml-2 text-xs text-red-400 font-medium">slowest</span>}
                </td>
                <td className={`px-4 py-2.5 text-right font-mono font-semibold ${isFastest ? "text-green-400" : isSlowest ? "text-red-400" : "text-slate-200"}`}>
                  {formatTime(lap.lapTime)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-slate-400">
                  {formatTime(lap.totalTime)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
