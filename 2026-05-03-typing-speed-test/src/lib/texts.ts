export type Difficulty = "easy" | "medium" | "hard";

export interface TextSample {
  id: number;
  text: string;
  difficulty: Difficulty;
  category: string;
}

export const textSamples: TextSample[] = [
  // Easy
  {
    id: 1,
    difficulty: "easy",
    category: "Nature",
    text: "The sun rises in the east and sets in the west. Birds sing in the trees as the morning begins. A cool breeze blows through the leaves.",
  },
  {
    id: 2,
    difficulty: "easy",
    category: "Food",
    text: "She baked a fresh loaf of bread and let it cool on the counter. The whole house smelled warm and wonderful.",
  },
  {
    id: 3,
    difficulty: "easy",
    category: "Travel",
    text: "We drove along the coast road with the windows down. The sea sparkled in the afternoon light and seagulls cried overhead.",
  },
  {
    id: 4,
    difficulty: "easy",
    category: "Sports",
    text: "He kicked the ball hard and it flew into the top corner of the net. The crowd cheered and jumped to their feet.",
  },
  // Medium
  {
    id: 5,
    difficulty: "medium",
    category: "Science",
    text: "Photosynthesis is the process by which plants convert sunlight into chemical energy. Chlorophyll in the leaves absorbs light, enabling the conversion of carbon dioxide and water into glucose and oxygen.",
  },
  {
    id: 6,
    difficulty: "medium",
    category: "Technology",
    text: "JavaScript is a dynamic, interpreted language primarily used for web development. It supports event-driven, functional, and object-oriented programming paradigms, making it incredibly versatile.",
  },
  {
    id: 7,
    difficulty: "medium",
    category: "History",
    text: "The Renaissance was a cultural movement that began in Italy during the 14th century. It marked a transition from the medieval period to modernity, celebrating humanism, art, and scientific inquiry.",
  },
  {
    id: 8,
    difficulty: "medium",
    category: "Philosophy",
    text: "Socrates believed that wisdom begins with recognizing one's own ignorance. His method of inquiry, now called the Socratic method, used systematic questioning to expose contradictions in people's beliefs.",
  },
  // Hard
  {
    id: 9,
    difficulty: "hard",
    category: "Literature",
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity — Charles Dickens.",
  },
  {
    id: 10,
    difficulty: "hard",
    category: "Programming",
    text: "const quickSort = (arr: number[]): number[] => arr.length <= 1 ? arr : [...quickSort(arr.slice(1).filter(x => x <= arr[0])), arr[0], ...quickSort(arr.slice(1).filter(x => x > arr[0]))];",
  },
  {
    id: 11,
    difficulty: "hard",
    category: "Science",
    text: "Quantum entanglement occurs when pairs of particles interact in ways such that the quantum state of each particle cannot be described independently, regardless of the distance separating them.",
  },
  {
    id: 12,
    difficulty: "hard",
    category: "Mathematics",
    text: "The Riemann hypothesis postulates that all non-trivial zeros of the Riemann zeta function have a real part equal to one-half. It remains one of the most famous unsolved problems in mathematics.",
  },
];

export function getRandomText(difficulty?: Difficulty): TextSample {
  const pool = difficulty
    ? textSamples.filter((t) => t.difficulty === difficulty)
    : textSamples;
  return pool[Math.floor(Math.random() * pool.length)];
}

export interface TestResult {
  wpm: number;
  accuracy: number;
  duration: number;
  difficulty: Difficulty;
  date: string;
  name: string;
}

export function saveResult(result: TestResult) {
  const existing = loadResults();
  const updated = [result, ...existing].slice(0, 50);
  localStorage.setItem("typeracer_results", JSON.stringify(updated));
}

export function loadResults(): TestResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("typeracer_results") || "[]");
  } catch {
    return [];
  }
}
