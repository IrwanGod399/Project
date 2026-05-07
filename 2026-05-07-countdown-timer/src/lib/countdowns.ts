export type GradientKey =
  | "violet"
  | "blue"
  | "green"
  | "orange"
  | "pink"
  | "yellow"
  | "cyan"
  | "red";

export interface Countdown {
  id: string;
  name: string;
  date: string; // ISO date string YYYY-MM-DD
  emoji: string;
  gradient: GradientKey;
  createdAt: string;
}

export const GRADIENTS: Record<GradientKey, { from: string; to: string; label: string }> = {
  violet: { from: "#7c3aed", to: "#4f46e5", label: "Violet" },
  blue:   { from: "#2563eb", to: "#0891b2", label: "Blue" },
  green:  { from: "#059669", to: "#0d9488", label: "Green" },
  orange: { from: "#ea580c", to: "#dc2626", label: "Orange" },
  pink:   { from: "#db2777", to: "#9333ea", label: "Pink" },
  yellow: { from: "#d97706", to: "#ea580c", label: "Amber" },
  cyan:   { from: "#0891b2", to: "#2563eb", label: "Cyan" },
  red:    { from: "#dc2626", to: "#9333ea", label: "Red" },
};

export const DEFAULT_COUNTDOWNS: Countdown[] = [
  {
    id: "1",
    name: "New Year 2027",
    date: "2027-01-01",
    emoji: "🎆",
    gradient: "violet",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Christmas 2026",
    date: "2026-12-25",
    emoji: "🎄",
    gradient: "green",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Halloween 2026",
    date: "2026-10-31",
    emoji: "🎃",
    gradient: "orange",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Summer Solstice 2026",
    date: "2026-06-21",
    emoji: "☀️",
    gradient: "yellow",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Thanksgiving 2026",
    date: "2026-11-26",
    emoji: "🦃",
    gradient: "orange",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Valentine's Day 2027",
    date: "2027-02-14",
    emoji: "💝",
    gradient: "pink",
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = "countdown-timer-events";

export function loadCountdowns(): Countdown[] {
  if (typeof window === "undefined") return DEFAULT_COUNTDOWNS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COUNTDOWNS));
      return DEFAULT_COUNTDOWNS;
    }
    return JSON.parse(raw) as Countdown[];
  } catch {
    return DEFAULT_COUNTDOWNS;
  }
}

export function saveCountdowns(countdowns: Countdown[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
}

export function getTimeRemaining(dateStr: string): {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = Date.now();
  const diff = target - now;
  const isPast = diff <= 0;
  const total = Math.abs(diff);

  return {
    total,
    isPast,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
