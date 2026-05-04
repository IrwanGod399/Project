export const WORD_SETS = {
  common: [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
    "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
    "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know",
    "take", "people", "into", "year", "your", "good", "some", "could",
    "them", "see", "other", "than", "then", "now", "look", "only", "come",
    "its", "over", "think", "also", "back", "after", "use", "two", "how",
    "our", "work", "first", "well", "way", "even", "new", "want", "because",
    "any", "these", "give", "day", "most", "us", "great", "between", "need",
    "large", "often", "hand", "high", "place", "hold", "turn", "help", "move",
  ],
  programming: [
    "function", "const", "return", "import", "export", "class", "interface",
    "string", "number", "boolean", "array", "object", "null", "undefined",
    "async", "await", "promise", "callback", "component", "render", "state",
    "props", "effect", "hook", "router", "server", "client", "database",
    "query", "mutation", "fetch", "request", "response", "error", "catch",
    "try", "throw", "extends", "implements", "generic", "type", "enum",
    "module", "package", "install", "deploy", "build", "test", "lint",
    "format", "debug", "console", "variable", "parameter", "argument",
    "loop", "iterate", "filter", "reduce", "map", "sort", "find", "index",
    "length", "push", "pop", "shift", "slice", "splice", "concat", "spread",
  ],
  quotes: [
    "The only way to do great work is to love what you do",
    "Life is what happens when you are busy making other plans",
    "The future belongs to those who believe in the beauty of their dreams",
    "In the middle of every difficulty lies opportunity",
    "It does not matter how slowly you go as long as you do not stop",
    "Success is not final failure is not fatal it is the courage to continue that counts",
    "The only limit to our realization of tomorrow is our doubts of today",
    "Do not watch the clock do what it does keep going",
    "Everything you have ever wanted is on the other side of fear",
    "Believe you can and you are halfway there",
  ],
};

export type Difficulty = "easy" | "medium" | "hard";
export type WordSet = "common" | "programming" | "quotes";
export type Duration = 15 | 30 | 60 | 120;

export function generateWordList(wordSet: WordSet, count: number): string[] {
  if (wordSet === "quotes") {
    const quote = WORD_SETS.quotes[Math.floor(Math.random() * WORD_SETS.quotes.length)];
    return quote.split(" ");
  }
  const words = WORD_SETS[wordSet];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result;
}

export interface TestResult {
  wpm: number;
  accuracy: number;
  correctWords: number;
  incorrectWords: number;
  totalChars: number;
  duration: number;
  wordSet: WordSet;
  date: string;
}

export const LEADERBOARD_DATA: TestResult[] = [
  { wpm: 142, accuracy: 98.5, correctWords: 71, incorrectWords: 1, totalChars: 358, duration: 30, wordSet: "common", date: "2026-05-03" },
  { wpm: 128, accuracy: 97.2, correctWords: 64, incorrectWords: 2, totalChars: 324, duration: 30, wordSet: "programming", date: "2026-05-03" },
  { wpm: 115, accuracy: 99.1, correctWords: 115, incorrectWords: 1, totalChars: 579, duration: 60, wordSet: "common", date: "2026-05-02" },
  { wpm: 98, accuracy: 95.8, correctWords: 49, incorrectWords: 2, totalChars: 248, duration: 30, wordSet: "common", date: "2026-05-02" },
  { wpm: 87, accuracy: 96.4, correctWords: 43, incorrectWords: 2, totalChars: 219, duration: 30, wordSet: "programming", date: "2026-05-01" },
];
