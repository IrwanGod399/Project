"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HabitCategory, HabitColor } from "@/lib/types";
import { addHabit } from "@/lib/storage";
import { categoryLabels, categoryIcons, colorMap } from "@/lib/utils";

const ICONS = ["🏃", "📚", "🧘", "💧", "📵", "📞", "🎯", "✍️", "🎸", "🍎", "😴", "🏋️", "🚴", "🧹", "💊", "🖊️"];
const COLORS: HabitColor[] = ["emerald", "blue", "violet", "rose", "amber", "cyan"];
const CATEGORIES: HabitCategory[] = ["health", "fitness", "learning", "mindfulness", "productivity", "social"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AddHabitPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "health" as HabitCategory,
    color: "emerald" as HabitColor,
    icon: "🎯",
    targetDays: [0, 1, 2, 3, 4, 5, 6] as number[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleDay = (day: number) => {
    setForm((f) => ({
      ...f,
      targetDays: f.targetDays.includes(day)
        ? f.targetDays.filter((d) => d !== day)
        : [...f.targetDays, day].sort(),
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Habit name is required";
    if (form.name.trim().length > 40) e.name = "Name must be under 40 characters";
    if (form.targetDays.length === 0) e.targetDays = "Select at least one day";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addHabit({
      id: Date.now().toString(),
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      completedDates: [],
      createdAt: new Date().toISOString().split("T")[0],
    });
    router.push("/");
  };

  const colors = colorMap[form.color];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Habit</h1>
        <p className="text-gray-500 mt-1">Build a routine that sticks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Icon picker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Choose an Icon</label>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setForm((f) => ({ ...f, icon }))}
                className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all duration-150 ${
                  form.icon === icon
                    ? `${colors.light} ring-2 ${colors.ring}`
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Name & description */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Habit Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Morning Run"
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 ${
                errors.name
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What does this habit mean to you?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat }))}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  form.category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{categoryIcons[cat]}</span>
                <span>{categoryLabels[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Color</label>
          <div className="flex gap-3">
            {COLORS.map((color) => {
              const c = colorMap[color];
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, color }))}
                  className={`w-9 h-9 rounded-full ${c.bg} transition-transform hover:scale-110 ${
                    form.color === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Target days */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Target Days</label>
          <div className="flex gap-2">
            {DAYS.map((day, i) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(i)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  form.targetDays.includes(i)
                    ? `${colors.bg} text-white`
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.targetDays && (
            <p className="text-red-500 text-xs mt-2">{errors.targetDays}</p>
          )}
        </div>

        {/* Preview */}
        <div className={`${colors.light} rounded-2xl border-2 border-current ${colors.text} p-5`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm`}>
              {form.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{form.name || "Your habit name"}</p>
              <p className="text-sm text-gray-500">{form.description || "Description"}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Create Habit
          </button>
        </div>
      </form>
    </div>
  );
}
