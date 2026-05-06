import { TestResult } from "./types";

const STORAGE_KEY = "typing_speed_results";

export function saveResult(result: TestResult): void {
  if (typeof window === "undefined") return;
  const existing = getResults();
  const updated = [result, ...existing].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getResults(): TestResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearResults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getBestResult(): TestResult | null {
  const results = getResults();
  if (!results.length) return null;
  return results.reduce((best, curr) => (curr.wpm > best.wpm ? curr : best));
}

export function getAverageWpm(): number {
  const results = getResults();
  if (!results.length) return 0;
  return Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
}
