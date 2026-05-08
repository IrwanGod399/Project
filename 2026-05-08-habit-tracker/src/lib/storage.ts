"use client";

import { Habit } from "./types";

const STORAGE_KEY = "habit-tracker-habits";

export function getHabits(): Habit[] {
  if (typeof window === "undefined") return getDefaultHabits();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const defaults = getDefaultHabits();
    saveHabits(defaults);
    return defaults;
  }
  return JSON.parse(raw);
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function getHabitById(id: string): Habit | undefined {
  return getHabits().find((h) => h.id === id);
}

export function addHabit(habit: Habit): void {
  const habits = getHabits();
  saveHabits([...habits, habit]);
}

export function updateHabit(updated: Habit): void {
  const habits = getHabits().map((h) => (h.id === updated.id ? updated : h));
  saveHabits(habits);
}

export function deleteHabit(id: string): void {
  saveHabits(getHabits().filter((h) => h.id !== id));
}

export function toggleHabitDate(id: string, date: string): void {
  const habits = getHabits();
  const habit = habits.find((h) => h.id === id);
  if (!habit) return;
  const idx = habit.completedDates.indexOf(date);
  if (idx >= 0) {
    habit.completedDates.splice(idx, 1);
  } else {
    habit.completedDates.push(date);
  }
  saveHabits(habits);
}

function getDefaultHabits(): Habit[] {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const past = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return fmt(d);
  };

  return [
    {
      id: "1",
      name: "Morning Run",
      description: "30-minute jog to start the day fresh",
      category: "fitness",
      color: "emerald",
      icon: "🏃",
      targetDays: [1, 2, 3, 4, 5],
      completedDates: [
        past(0), past(1), past(2), past(4), past(5),
        past(7), past(8), past(9), past(11), past(12),
        past(14), past(15), past(16), past(18), past(19),
      ],
      createdAt: past(30),
    },
    {
      id: "2",
      name: "Read 20 Pages",
      description: "Daily reading to expand knowledge",
      category: "learning",
      color: "blue",
      icon: "📚",
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [
        past(0), past(1), past(3), past(4), past(5),
        past(6), past(7), past(8), past(10), past(11),
        past(12), past(13), past(14), past(15), past(17),
        past(18), past(20), past(21), past(22), past(24),
      ],
      createdAt: past(30),
    },
    {
      id: "3",
      name: "Meditate",
      description: "10 minutes of mindful meditation",
      category: "mindfulness",
      color: "violet",
      icon: "🧘",
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [
        past(0), past(1), past(2), past(3), past(4),
        past(5), past(6), past(7), past(8), past(9),
        past(10), past(11), past(12),
      ],
      createdAt: past(25),
    },
    {
      id: "4",
      name: "Drink 8 Glasses",
      description: "Stay hydrated throughout the day",
      category: "health",
      color: "cyan",
      icon: "💧",
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [
        past(0), past(2), past(3), past(4), past(6),
        past(7), past(9), past(10), past(12), past(14),
        past(16), past(18), past(20),
      ],
      createdAt: past(28),
    },
    {
      id: "5",
      name: "No Social Media",
      description: "Avoid social media before 10am",
      category: "productivity",
      color: "amber",
      icon: "📵",
      targetDays: [1, 2, 3, 4, 5],
      completedDates: [
        past(1), past(2), past(4), past(5),
        past(8), past(9), past(11), past(12),
        past(15), past(16),
      ],
      createdAt: past(20),
    },
    {
      id: "6",
      name: "Call a Friend",
      description: "Maintain meaningful relationships",
      category: "social",
      color: "rose",
      icon: "📞",
      targetDays: [0, 6],
      completedDates: [
        past(1), past(7), past(8), past(14), past(21),
      ],
      createdAt: past(30),
    },
  ];
}
