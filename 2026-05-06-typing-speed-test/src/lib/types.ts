export type Difficulty = "easy" | "medium" | "hard";

export interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  duration: number;
  timestamp: number;
  errors: number;
  totalChars: number;
}

export interface TextSample {
  id: string;
  text: string;
  difficulty: Difficulty;
  category: string;
}
