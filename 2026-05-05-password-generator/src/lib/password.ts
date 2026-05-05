export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;':\",./<>?",
};

export function generatePassword(opts: PasswordOptions): string {
  let pool = "";
  const required: string[] = [];

  if (opts.uppercase) { pool += CHARS.uppercase; required.push(CHARS.uppercase[Math.floor(Math.random() * CHARS.uppercase.length)]); }
  if (opts.lowercase) { pool += CHARS.lowercase; required.push(CHARS.lowercase[Math.floor(Math.random() * CHARS.lowercase.length)]); }
  if (opts.numbers)   { pool += CHARS.numbers;   required.push(CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)]); }
  if (opts.symbols)   { pool += CHARS.symbols;   required.push(CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)]); }

  if (!pool) return "";

  const remaining = Array.from({ length: opts.length - required.length }, () =>
    pool[Math.floor(Math.random() * pool.length)]
  );

  return [...required, ...remaining]
    .sort(() => Math.random() - 0.5)
    .join("");
}

export type StrengthLevel = "Weak" | "Fair" | "Good" | "Strong" | "Very Strong";

export function getStrength(password: string): { level: StrengthLevel; score: number; color: string } {
  if (!password) return { level: "Weak", score: 0, color: "bg-red-500" };

  let score = 0;
  if (password.length >= 8)  score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;

  const levels: { level: StrengthLevel; color: string; min: number }[] = [
    { level: "Weak",       color: "bg-red-500",    min: 0 },
    { level: "Fair",       color: "bg-orange-500", min: 3 },
    { level: "Good",       color: "bg-yellow-500", min: 5 },
    { level: "Strong",     color: "bg-green-500",  min: 6 },
    { level: "Very Strong",color: "bg-emerald-400",min: 7 },
  ];

  const matched = [...levels].reverse().find(l => score >= l.min) ?? levels[0];
  return { level: matched.level, score, color: matched.color };
}

export interface HistoryEntry {
  id: string;
  password: string;
  createdAt: string;
  strength: StrengthLevel;
  length: number;
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("passforge-history") ?? "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(entry: Omit<HistoryEntry, "id" | "createdAt">): HistoryEntry {
  const history = loadHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newEntry, ...history].slice(0, 50);
  localStorage.setItem("passforge-history", JSON.stringify(updated));
  return newEntry;
}

export function clearHistory(): void {
  localStorage.removeItem("passforge-history");
}
