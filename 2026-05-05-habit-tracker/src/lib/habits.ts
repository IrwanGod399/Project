import { Habit } from "./types";

const STORAGE_KEY = "habit-tracker-data";

export const DEFAULT_HABITS: Habit[] = [
  {
    id: "1",
    name: "Morning Exercise",
    icon: "🏃",
    color: "emerald",
    createdAt: "2026-04-25",
    completions: [],
  },
  {
    id: "2",
    name: "Read 30 Minutes",
    icon: "📚",
    color: "blue",
    createdAt: "2026-04-25",
    completions: [],
  },
  {
    id: "3",
    name: "Meditate",
    icon: "🧘",
    color: "purple",
    createdAt: "2026-04-25",
    completions: [],
  },
  {
    id: "4",
    name: "Drink 8 Glasses of Water",
    icon: "💧",
    color: "cyan",
    createdAt: "2026-04-25",
    completions: [],
  },
  {
    id: "5",
    name: "No Social Media",
    icon: "📵",
    color: "rose",
    createdAt: "2026-04-25",
    completions: [],
  },
  {
    id: "6",
    name: "Journal Writing",
    icon: "✍️",
    color: "amber",
    createdAt: "2026-04-25",
    completions: [],
  },
];

export function loadHabits(): Habit[] {
  if (typeof window === "undefined") return DEFAULT_HABITS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedCompletions(DEFAULT_HABITS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_HABITS;
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getStreak(habit: Habit): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    if (habit.completions.includes(ds)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getCompletionRate(habit: Habit, days = 7): number {
  const today = new Date();
  let count = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    if (habit.completions.includes(ds)) count++;
  }
  return Math.round((count / days) * 100);
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function seedCompletions(habits: Habit[]): Habit[] {
  const today = new Date();
  return habits.map((habit) => {
    const completions: string[] = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (Math.random() > 0.3) {
        completions.push(d.toISOString().split("T")[0]);
      }
    }
    return { ...habit, completions };
  });
}

export const COLOR_MAP: Record<string, { bg: string; text: string; ring: string; light: string }> = {
  emerald: { bg: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-400", light: "bg-emerald-50" },
  blue: { bg: "bg-blue-500", text: "text-blue-600", ring: "ring-blue-400", light: "bg-blue-50" },
  purple: { bg: "bg-purple-500", text: "text-purple-600", ring: "ring-purple-400", light: "bg-purple-50" },
  cyan: { bg: "bg-cyan-500", text: "text-cyan-600", ring: "ring-cyan-400", light: "bg-cyan-50" },
  rose: { bg: "bg-rose-500", text: "text-rose-600", ring: "ring-rose-400", light: "bg-rose-50" },
  amber: { bg: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-400", light: "bg-amber-50" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-600", ring: "ring-indigo-400", light: "bg-indigo-50" },
  pink: { bg: "bg-pink-500", text: "text-pink-600", ring: "ring-pink-400", light: "bg-pink-50" },
  teal: { bg: "bg-teal-500", text: "text-teal-600", ring: "ring-teal-400", light: "bg-teal-50" },
  orange: { bg: "bg-orange-500", text: "text-orange-600", ring: "ring-orange-400", light: "bg-orange-50" },
};
