export type Difficulty = "easy" | "medium" | "hard";

export interface DifficultyConfig {
  label: string;
  range: number;
  maxAttempts: number;
  color: string;
  emoji: string;
  description: string;
  scoreMultiplier: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  difficulty: Difficulty;
  attempts: number;
  timeSeconds: number;
  date: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: "Easy",
    range: 50,
    maxAttempts: 10,
    color: "#22c55e",
    emoji: "🌱",
    description: "Guess 1–50 in 10 tries",
    scoreMultiplier: 1,
  },
  medium: {
    label: "Medium",
    range: 100,
    maxAttempts: 7,
    color: "#f59e0b",
    emoji: "🔥",
    description: "Guess 1–100 in 7 tries",
    scoreMultiplier: 2,
  },
  hard: {
    label: "Hard",
    range: 500,
    maxAttempts: 5,
    color: "#ef4444",
    emoji: "💀",
    description: "Guess 1–500 in 5 tries",
    scoreMultiplier: 4,
  },
};

export function calculateScore(
  difficulty: Difficulty,
  attemptsUsed: number,
  timeSeconds: number
): number {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const attemptsRemaining = config.maxAttempts - attemptsUsed + 1;
  const timeBonus = Math.max(0, 60 - timeSeconds);
  const baseScore = attemptsRemaining * 100;
  return Math.round((baseScore + timeBonus * 5) * config.scoreMultiplier);
}

export function getHint(guess: number, target: number, range: number): string {
  const diff = Math.abs(guess - target);
  const pct = diff / range;
  if (pct > 0.5) return guess < target ? "Way too low!" : "Way too high!";
  if (pct > 0.25) return guess < target ? "Too low!" : "Too high!";
  if (pct > 0.1) return guess < target ? "A bit low!" : "A bit high!";
  return guess < target ? "Very close, go higher!" : "Very close, go lower!";
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("numquest_leaderboard");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToLeaderboard(entry: Omit<LeaderboardEntry, "id" | "date">): void {
  const board = getLeaderboard();
  board.push({
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem("numquest_leaderboard", JSON.stringify(board.slice(0, 50)));
}
