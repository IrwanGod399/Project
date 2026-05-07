"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcBmi, getCategory, idealWeightRange, saveRecord, type Unit } from "@/lib/bmi";

export default function CalculatorPage() {
  const router = useRouter();
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    let h: number;

    if (unit === "imperial") {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      h = ft * 12 + inches;
    } else {
      h = parseFloat(height);
    }

    if (!w || !h || w <= 0 || h <= 0) {
      setError("Please enter valid positive values for weight and height.");
      return;
    }

    const bmi = calcBmi(w, h, unit);
    const category = getCategory(bmi);
    const [idealMin, idealMax] = idealWeightRange(h, unit);

    const record = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      bmi: parseFloat(bmi.toFixed(1)),
      category: category.label,
      weight: w,
      height: h,
      unit,
    };

    saveRecord(record);

    const params = new URLSearchParams({
      bmi: bmi.toFixed(1),
      category: category.label,
      weight: w.toString(),
      height: h.toString(),
      unit,
      idealMin: idealMin.toFixed(1),
      idealMax: idealMax.toFixed(1),
    });

    router.push(`/results?${params.toString()}`);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold mb-3">
          BMI <span className="text-indigo-400">Calculator</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Discover your Body Mass Index and get personalised health insights.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 space-y-6 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Unit Toggle */}
        <div className="flex rounded-xl overflow-hidden border border-slate-700 w-full">
          {(["metric", "imperial"] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => {
                setUnit(u);
                setWeight("");
                setHeight("");
                setHeightFt("");
                setHeightIn("");
              }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                unit === u
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              {u === "metric" ? "Metric (kg / cm)" : "Imperial (lbs / ft·in)"}
            </button>
          ))}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            min="1"
            step="0.1"
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Height ({unit === "metric" ? "cm" : "ft & in"})
          </label>
          {unit === "metric" ? (
            <input
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          ) : (
            <div className="flex gap-3">
              <input
                type="number"
                min="1"
                step="1"
                placeholder="ft"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-1/2 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <input
                type="number"
                min="0"
                max="11"
                step="1"
                placeholder="in"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-1/2 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-200 text-lg shadow-lg shadow-indigo-500/20"
        >
          Calculate BMI →
        </button>
      </form>

      {/* Quick reference cards */}
      <div
        className="mt-8 grid grid-cols-2 gap-3 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {[
          { label: "Underweight", range: "< 18.5", color: "border-blue-500/50 text-blue-400" },
          { label: "Normal", range: "18.5 – 24.9", color: "border-emerald-500/50 text-emerald-400" },
          { label: "Overweight", range: "25 – 29.9", color: "border-amber-500/50 text-amber-400" },
          { label: "Obese", range: "≥ 30", color: "border-red-500/50 text-red-400" },
        ].map((cat) => (
          <div
            key={cat.label}
            className={`rounded-xl border bg-slate-800/40 px-4 py-3 ${cat.color}`}
          >
            <div className="font-semibold text-sm">{cat.label}</div>
            <div className="text-slate-400 text-xs mt-0.5">BMI {cat.range}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
