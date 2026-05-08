export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  color: HabitColor;
  icon: string;
  targetDays: number[];
  completedDates: string[];
  createdAt: string;
}

export type HabitCategory =
  | "health"
  | "fitness"
  | "learning"
  | "mindfulness"
  | "productivity"
  | "social";

export type HabitColor =
  | "emerald"
  | "blue"
  | "violet"
  | "rose"
  | "amber"
  | "cyan";

export interface HabitStats {
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  thisWeekCompletions: number;
  thisMonthCompletions: number;
}
