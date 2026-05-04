import { Question } from "./types";

export const ALL_QUESTIONS: Question[] = [
  // Science
  {
    id: 1,
    category: "science",
    difficulty: "easy",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctIndex: 2,
    explanation: "Gold's symbol Au comes from the Latin word 'Aurum'.",
  },
  {
    id: 2,
    category: "science",
    difficulty: "easy",
    question: "How many bones are in the adult human body?",
    options: ["186", "206", "226", "246"],
    correctIndex: 1,
    explanation: "Adults have 206 bones; babies are born with around 270.",
  },
  {
    id: 3,
    category: "science",
    difficulty: "medium",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correctIndex: 2,
    explanation: "Mitochondria produce ATP, the cell's energy currency.",
  },
  {
    id: 4,
    category: "science",
    difficulty: "medium",
    question: "At what temperature (°C) does water boil at sea level?",
    options: ["90°C", "95°C", "100°C", "105°C"],
    correctIndex: 2,
    explanation: "Water boils at exactly 100°C (212°F) at standard atmospheric pressure.",
  },
  {
    id: 5,
    category: "science",
    difficulty: "hard",
    question: "What is the half-life of Carbon-14?",
    options: ["573 years", "5,730 years", "57,300 years", "573,000 years"],
    correctIndex: 1,
    explanation: "Carbon-14 has a half-life of ~5,730 years, used in radiocarbon dating.",
  },
  {
    id: 6,
    category: "science",
    difficulty: "hard",
    question: "Which subatomic particle has no electric charge?",
    options: ["Proton", "Electron", "Neutron", "Positron"],
    correctIndex: 2,
    explanation: "Neutrons carry no charge; protons are positive and electrons are negative.",
  },

  // History
  {
    id: 7,
    category: "history",
    difficulty: "easy",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctIndex: 2,
    explanation: "WWII ended in 1945: V-E Day (May 8) and V-J Day (September 2).",
  },
  {
    id: 8,
    category: "history",
    difficulty: "easy",
    question: "Who was the first President of the United States?",
    options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
    correctIndex: 2,
    explanation: "George Washington served two terms, 1789–1797.",
  },
  {
    id: 9,
    category: "history",
    difficulty: "medium",
    question: "The Berlin Wall fell in which year?",
    options: ["1987", "1988", "1989", "1990"],
    correctIndex: 2,
    explanation: "The Berlin Wall fell on November 9, 1989, reuniting East and West Germany.",
  },
  {
    id: 10,
    category: "history",
    difficulty: "medium",
    question: "Which empire was ruled by Julius Caesar?",
    options: ["Greek Empire", "Ottoman Empire", "Roman Empire", "Byzantine Empire"],
    correctIndex: 2,
    explanation: "Julius Caesar was a Roman general and statesman in the Roman Republic.",
  },
  {
    id: 11,
    category: "history",
    difficulty: "hard",
    question: "The Treaty of Westphalia (1648) ended which conflict?",
    options: ["Thirty Years War", "Hundred Years War", "Seven Years War", "Napoleonic Wars"],
    correctIndex: 0,
    explanation: "The Peace of Westphalia ended the Thirty Years' War and the Eighty Years' War.",
  },
  {
    id: 12,
    category: "history",
    difficulty: "hard",
    question: "Who commanded the Allied forces on D-Day (June 6, 1944)?",
    options: ["General Patton", "General MacArthur", "General Eisenhower", "Winston Churchill"],
    correctIndex: 2,
    explanation: "General Dwight D. Eisenhower served as Supreme Commander of Allied Forces.",
  },

  // Geography
  {
    id: 13,
    category: "geography",
    difficulty: "easy",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctIndex: 3,
    explanation: "The Pacific Ocean covers about 165 million km², more than all land combined.",
  },
  {
    id: 14,
    category: "geography",
    difficulty: "easy",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctIndex: 2,
    explanation: "Canberra is Australia's capital, chosen as a compromise between Sydney and Melbourne.",
  },
  {
    id: 15,
    category: "geography",
    difficulty: "medium",
    question: "Which country has the most natural lakes?",
    options: ["Russia", "Brazil", "United States", "Canada"],
    correctIndex: 3,
    explanation: "Canada has about 879,800 lakes — more than any other country.",
  },
  {
    id: 16,
    category: "geography",
    difficulty: "medium",
    question: "Mount Kilimanjaro is located in which country?",
    options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"],
    correctIndex: 1,
    explanation: "Kilimanjaro sits in northeastern Tanzania near the Kenyan border.",
  },
  {
    id: 17,
    category: "geography",
    difficulty: "hard",
    question: "The Strait of Malacca separates which two landmasses?",
    options: [
      "Sumatra and the Malay Peninsula",
      "Java and Bali",
      "Sri Lanka and India",
      "Taiwan and China",
    ],
    correctIndex: 0,
    explanation: "The Strait of Malacca is one of the world's most important shipping lanes.",
  },
  {
    id: 18,
    category: "geography",
    difficulty: "hard",
    question: "What is the smallest country in South America by area?",
    options: ["Uruguay", "Suriname", "Guyana", "Ecuador"],
    correctIndex: 1,
    explanation: "Suriname is the smallest sovereign country in South America at ~163,820 km².",
  },

  // Pop Culture
  {
    id: 19,
    category: "pop-culture",
    difficulty: "easy",
    question: "Which streaming service produced 'Stranger Things'?",
    options: ["HBO", "Amazon Prime", "Netflix", "Disney+"],
    correctIndex: 2,
    explanation: "Stranger Things premiered on Netflix in July 2016.",
  },
  {
    id: 20,
    category: "pop-culture",
    difficulty: "easy",
    question: "What is the best-selling video game of all time?",
    options: ["Tetris", "Minecraft", "Grand Theft Auto V", "Wii Sports"],
    correctIndex: 1,
    explanation: "Minecraft has sold over 300 million copies across all platforms.",
  },
  {
    id: 21,
    category: "pop-culture",
    difficulty: "medium",
    question: "Which band performed 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
    correctIndex: 2,
    explanation: "Bohemian Rhapsody was released by Queen in 1975, written by Freddie Mercury.",
  },
  {
    id: 22,
    category: "pop-culture",
    difficulty: "medium",
    question: "In the Marvel Cinematic Universe, who is Tony Stark's AI assistant?",
    options: ["FRIDAY", "JARVIS", "VISION", "EDITH"],
    correctIndex: 1,
    explanation: "JARVIS (Just A Rather Very Intelligent System) assists Tony Stark / Iron Man.",
  },
  {
    id: 23,
    category: "pop-culture",
    difficulty: "hard",
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctIndex: 2,
    explanation: "Steve Jobs unveiled the first iPhone on January 9, 2007, and it shipped June 29.",
  },
  {
    id: 24,
    category: "pop-culture",
    difficulty: "hard",
    question: "Which novel begins with 'It was a bright cold day in April, and the clocks were striking thirteen'?",
    options: ["Brave New World", "Fahrenheit 451", "1984", "We"],
    correctIndex: 2,
    explanation: "George Orwell's 1984 (1949) opens with that iconic line.",
  },

  // Technology
  {
    id: 25,
    category: "technology",
    difficulty: "easy",
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High-Tech Transmission Protocol",
      "HyperText Transport Procedure",
      "Hybrid Transfer Text Protocol",
    ],
    correctIndex: 0,
    explanation: "HTTP (HyperText Transfer Protocol) is the foundation of data on the World Wide Web.",
  },
  {
    id: 26,
    category: "technology",
    difficulty: "easy",
    question: "Which company created the Python programming language?",
    options: ["Google", "Microsoft", "Guido van Rossum (individual)", "Sun Microsystems"],
    correctIndex: 2,
    explanation: "Guido van Rossum created Python and released it in 1991.",
  },
  {
    id: 27,
    category: "technology",
    difficulty: "medium",
    question: "What does 'CPU' stand for?",
    options: [
      "Central Processing Unit",
      "Core Processing Utility",
      "Central Program Unit",
      "Computer Processing Unit",
    ],
    correctIndex: 0,
    explanation: "The CPU (Central Processing Unit) is the primary component that executes instructions.",
  },
  {
    id: 28,
    category: "technology",
    difficulty: "medium",
    question: "Which data structure uses LIFO (Last In, First Out) ordering?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    correctIndex: 1,
    explanation: "A Stack follows LIFO — the last element pushed is the first popped.",
  },
  {
    id: 29,
    category: "technology",
    difficulty: "hard",
    question: "In Big-O notation, what is the time complexity of binary search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Binary search halves the search space each step, giving O(log n) complexity.",
  },
  {
    id: 30,
    category: "technology",
    difficulty: "hard",
    question: "Which cryptographic algorithm does Bitcoin use for its proof-of-work?",
    options: ["MD5", "SHA-1", "SHA-256", "SHA-512"],
    correctIndex: 2,
    explanation: "Bitcoin's proof-of-work uses the SHA-256 hashing algorithm.",
  },
];

export function getQuestions(
  category: string,
  difficulty: string,
  count: number
): Question[] {
  let filtered = ALL_QUESTIONS;

  if (category !== "all") {
    filtered = filtered.filter((q) => q.category === category);
  }
  if (difficulty !== "all") {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }

  // Shuffle
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All Categories",
  science: "Science",
  history: "History",
  geography: "Geography",
  "pop-culture": "Pop Culture",
  technology: "Technology",
};

export const CATEGORY_ICONS: Record<string, string> = {
  all: "🌐",
  science: "🔬",
  history: "📜",
  geography: "🌍",
  "pop-culture": "🎬",
  technology: "💻",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  all: "All Difficulties",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
