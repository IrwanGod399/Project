import { Habit, HabitStats } from "./types";

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function today(): string {
  return formatDate(new Date());
}

export function isCompletedToday(habit: Habit): boolean {
  return habit.completedDates.includes(today());
}

export function getStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort((a, b) => b.localeCompare(a));
  const todayStr = today();
  let streak = 0;
  let check = new Date();

  if (sorted[0] !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (sorted[0] !== formatDate(yesterday)) return 0;
    check = yesterday;
  }

  for (let i = 0; i <= 365; i++) {
    const d = formatDate(check);
    if (sorted.includes(d)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getLongestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  return longest;
}

export function getHabitStats(habit: Habit): HabitStats {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const thisWeekCompletions = habit.completedDates.filter(
    (d) => new Date(d) >= weekAgo
  ).length;

  const thisMonthCompletions = habit.completedDates.filter(
    (d) => new Date(d) >= monthAgo
  ).length;

  const createdAt = new Date(habit.createdAt);
  const daysSinceCreated = Math.max(
    1,
    Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  const targetDaysInPeriod = Math.min(daysSinceCreated, 30) * (habit.targetDays.length / 7);
  const completionRate =
    targetDaysInPeriod > 0
      ? Math.min(100, Math.round((thisMonthCompletions / targetDaysInPeriod) * 100))
      : 0;

  return {
    totalCompletions: habit.completedDates.length,
    currentStreak: getStreak(habit.completedDates),
    longestStreak: getLongestStreak(habit.completedDates),
    completionRate,
    thisWeekCompletions,
    thisMonthCompletions,
  };
}

export function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}

export const colorMap: Record<string, { bg: string; text: string; ring: string; light: string; dot: string }> = {
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    ring: "ring-emerald-500",
    light: "bg-emerald-50",
    dot: "bg-emerald-400",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    ring: "ring-blue-500",
    light: "bg-blue-50",
    dot: "bg-blue-400",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-600",
    ring: "ring-violet-500",
    light: "bg-violet-50",
    dot: "bg-violet-400",
  },
  rose: {
    bg: "bg-rose-500",
    text: "text-rose-600",
    ring: "ring-rose-500",
    light: "bg-rose-50",
    dot: "bg-rose-400",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-600",
    ring: "ring-amber-500",
    light: "bg-amber-50",
    dot: "bg-amber-400",
  },
  cyan: {
    bg: "bg-cyan-500",
    text: "text-cyan-600",
    ring: "ring-cyan-500",
    light: "bg-cyan-50",
    dot: "bg-cyan-400",
  },
};

export const categoryLabels: Record<string, string> = {
  health: "Health",
  fitness: "Fitness",
  learning: "Learning",
  mindfulness: "Mindfulness",
  productivity: "Productivity",
  social: "Social",
};

export const categoryIcons: Record<string, string> = {
  health: "❤️",
  fitness: "💪",
  learning: "🎓",
  mindfulness: "🌿",
  productivity: "⚡",
  social: "🤝",
};
