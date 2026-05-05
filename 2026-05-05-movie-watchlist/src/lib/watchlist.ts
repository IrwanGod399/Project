import { WatchlistEntry } from "./movies";

const STORAGE_KEY = "movie-watchlist";

export function getWatchlist(): WatchlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(entries: WatchlistEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addToWatchlist(movieId: number): void {
  const list = getWatchlist();
  if (list.find((e) => e.movieId === movieId)) return;
  list.push({ movieId, status: "want-to-watch", addedAt: new Date().toISOString() });
  saveWatchlist(list);
}

export function removeFromWatchlist(movieId: number): void {
  const list = getWatchlist().filter((e) => e.movieId !== movieId);
  saveWatchlist(list);
}

export function updateWatchlistEntry(movieId: number, updates: Partial<WatchlistEntry>): void {
  const list = getWatchlist().map((e) =>
    e.movieId === movieId ? { ...e, ...updates } : e
  );
  saveWatchlist(list);
}

export function isInWatchlist(movieId: number): boolean {
  return getWatchlist().some((e) => e.movieId === movieId);
}
