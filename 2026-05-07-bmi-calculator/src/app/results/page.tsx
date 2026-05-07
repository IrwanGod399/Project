"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/bmi";
import BmiGauge from "@/components/BmiGauge";

function ResultsContent() {
  const params = useSearchParams();
  const router = useRouter();

  const bmi = parseFloat(params.get("bmi") ?? "0");
  const categoryLabel = params.get("category") ?? "";
  const weight = parseFloat(params.get("weight") ?? "0");
  const height = parseFloat(params.get("height") ?? "0");
  const unit = params.get("unit") ?? "metric";
  const idealMin = parseFloat(params.get("idealMin") ?? "0");
  const idealMax = parseFloat(params.get("idealMax") ?? "0");

  if (!bmi) {
    router.push("/");
    return null;
  }

  const category = getCategory(bmi);
  const weightUnit = unit === "metric" ? "kg" : "lbs";

  const heightDisplay =
    unit === "metric"
      ? `${height} cm`
      : `${Math.floor(height / 12)} ft ${Math.round(height % 12)} in`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-2">Your Results</h1>
      <p className="text-slate-400 text-center mb-10">
        Based on your measurements, here is your BMI breakdown.
      </p>

      {/* Gauge + category card */}
      <div className={`rounded-2xl border p-8 mb-6 ${category.bg}`}>
        <BmiGauge bmi={bmi} />
        <div className="text-center mt-4">
          <span className={`text-2xl font-bold ${category.color}`}>{category.label}</span>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed max-w-md mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "BMI Score", value: bmi.toFixed(1) },
          { label: "Weight", value: `${weight} ${weightUnit}` },
          { label: "Height", value: heightDisplay },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Ideal weight range */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-slate-200 mb-1">Ideal Weight Range for Your Height</h2>
        <p className="text-emerald-400 text-xl font-bold">
          {idealMin} – {idealMax} {weightUnit}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          This corresponds to BMI 18.5 – 24.9 (normal weight range).
        </p>
      </div>

      {/* Tips */}
      <div className={`rounded-xl border p-6 mb-8 ${category.bg}`}>
        <h2 className={`font-bold text-lg mb-3 ${category.color}`}>Health Tips</h2>
        <ul className="space-y-2">
          {category.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className={`mt-0.5 ${category.color}`}>✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/"
          className="flex-1 text-center py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
        >
          ← Recalculate
        </Link>
        <Link
          href="/history"
          className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
        >
          View History →
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading results…</div>}>
      <ResultsContent />
    </Suspense>
  );
}
