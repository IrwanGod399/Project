export type Difficulty = "easy" | "medium" | "hard";

export type Category =
  | "science"
  | "history"
  | "geography"
  | "pop-culture"
  | "technology";

export interface Question {
  id: number;
  category: Category;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizConfig {
  category: Category | "all";
  difficulty: Difficulty | "all";
  questionCount: number;
}

export interface AnswerRecord {
  questionId: number;
  selectedIndex: number;
  correct: boolean;
  timeTaken: number;
}

export interface QuizSession {
  config: QuizConfig;
  questions: Question[];
  answers: AnswerRecord[];
  startedAt: number;
}
