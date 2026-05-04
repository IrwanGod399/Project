export interface Session {
  id: string;
  type: "focus" | "short-break" | "long-break";
  duration: number;
  completedAt: string;
  task?: string;
}

export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
};

export function getSessions(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("pomodoro-sessions") || "[]");
  } catch {
    return [];
  }
}

export function addSession(session: Session): void {
  if (typeof window === "undefined") return;
  const sessions = getSessions();
  sessions.unshift(session);
  localStorage.setItem("pomodoro-sessions", JSON.stringify(sessions.slice(0, 100)));
}

export function getSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem("pomodoro-settings");
    if (!stored) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("pomodoro-settings", JSON.stringify(settings));
}
