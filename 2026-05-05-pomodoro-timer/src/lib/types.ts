export type Mode = "focus" | "short" | "long";

export interface Session {
  id: string;
  mode: Mode;
  duration: number; // seconds
  completedAt: string; // ISO date string
  label: string;
}

export interface Settings {
  focusDuration: number;   // minutes
  shortBreak: number;      // minutes
  longBreak: number;       // minutes
  longBreakInterval: number; // pomodoros before long break
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
};

export const MODE_LABELS: Record<Mode, string> = {
  focus: "Focus",
  short: "Short Break",
  long: "Long Break",
};

export const MODE_COLORS: Record<Mode, string> = {
  focus: "#ef4444",
  short: "#22c55e",
  long: "#3b82f6",
};
