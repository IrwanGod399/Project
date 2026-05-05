export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  completions: string[]; // ISO date strings "YYYY-MM-DD"
}

export interface HabitStore {
  habits: Habit[];
}
