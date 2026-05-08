export type Difficulty = "easy" | "medium" | "hard";

export interface CardData {
  id: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface ScoreEntry {
  id: string;
  difficulty: Difficulty;
  moves: number;
  time: number;
  date: string;
}

export const DIFFICULTY_CONFIG = {
  easy: { pairs: 8, cols: 4, label: "Easy", description: "4×4 grid — 8 pairs" },
  medium: { pairs: 18, cols: 6, label: "Medium", description: "6×6 grid — 18 pairs" },
  hard: { pairs: 32, cols: 8, label: "Hard", description: "8×8 grid — 32 pairs" },
};

const ALL_EMOJIS = [
  { emoji: "🦊", name: "Fox" },
  { emoji: "🐬", name: "Dolphin" },
  { emoji: "🦁", name: "Lion" },
  { emoji: "🐘", name: "Elephant" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🐙", name: "Octopus" },
  { emoji: "🦚", name: "Peacock" },
  { emoji: "🐺", name: "Wolf" },
  { emoji: "🦜", name: "Parrot" },
  { emoji: "🐳", name: "Whale" },
  { emoji: "🦄", name: "Unicorn" },
  { emoji: "🐲", name: "Dragon" },
  { emoji: "🦩", name: "Flamingo" },
  { emoji: "🐆", name: "Leopard" },
  { emoji: "🦋", name: "Butterfly2" },
  { emoji: "🦑", name: "Squid" },
  { emoji: "🦭", name: "Seal" },
  { emoji: "🦦", name: "Otter" },
  { emoji: "🦅", name: "Eagle" },
  { emoji: "🐊", name: "Crocodile" },
  { emoji: "🦘", name: "Kangaroo" },
  { emoji: "🦙", name: "Llama" },
  { emoji: "🦛", name: "Hippo" },
  { emoji: "🦒", name: "Giraffe" },
  { emoji: "🐡", name: "Pufferfish" },
  { emoji: "🦈", name: "Shark" },
  { emoji: "🐋", name: "Blue Whale" },
  { emoji: "🦐", name: "Shrimp" },
  { emoji: "🦞", name: "Lobster" },
  { emoji: "🦀", name: "Crab" },
  { emoji: "🐢", name: "Turtle" },
  { emoji: "🦎", name: "Lizard" },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateCards(difficulty: Difficulty): CardData[] {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const selectedEmojis = shuffleArray(ALL_EMOJIS).slice(0, pairs);

  const cards = selectedEmojis.flatMap((item, index) => [
    { id: index * 2, emoji: item.emoji, name: item.name, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, emoji: item.emoji, name: item.name, isFlipped: false, isMatched: false },
  ]);

  return shuffleArray(cards);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function getScores(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("memoryGameScores") || "[]");
  } catch {
    return [];
  }
}

export function saveScore(entry: Omit<ScoreEntry, "id" | "date">): void {
  const scores = getScores();
  const newEntry: ScoreEntry = {
    ...entry,
    id: Math.random().toString(36).slice(2),
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };
  scores.unshift(newEntry);
  // Keep top 50 scores
  const trimmed = scores.slice(0, 50);
  localStorage.setItem("memoryGameScores", JSON.stringify(trimmed));
}

export function clearScores(): void {
  localStorage.removeItem("memoryGameScores");
}
