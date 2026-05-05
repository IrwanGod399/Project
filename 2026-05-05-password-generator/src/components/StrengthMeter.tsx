"use client";

import { getStrength } from "@/lib/password";

interface Props {
  password: string;
}

const levelColors: Record<string, string> = {
  "Weak":       "text-red-400",
  "Fair":       "text-orange-400",
  "Good":       "text-yellow-400",
  "Strong":     "text-green-400",
  "Very Strong":"text-emerald-400",
};

export default function StrengthMeter({ password }: Props) {
  const { level, score, color } = getStrength(password);
  const segments = 8;
  const filled = Math.min(score, segments);

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < filled ? color : "bg-slate-700"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Password strength</span>
        <span className={`font-semibold ${levelColors[level] ?? "text-slate-400"}`}>{password ? level : "—"}</span>
      </div>
    </div>
  );
}
