export type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

export type Deck = {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  cards: Flashcard[];
};

export const decks: Deck[] = [
  {
    id: "world-capitals",
    title: "World Capitals",
    description: "Test your knowledge of capital cities around the world.",
    category: "Geography",
    color: "from-blue-500 to-cyan-500",
    cards: [
      { id: "wc1", question: "What is the capital of Japan?", answer: "Tokyo" },
      { id: "wc2", question: "What is the capital of Brazil?", answer: "Brasília" },
      { id: "wc3", question: "What is the capital of Australia?", answer: "Canberra" },
      { id: "wc4", question: "What is the capital of Canada?", answer: "Ottawa" },
      { id: "wc5", question: "What is the capital of Egypt?", answer: "Cairo" },
      { id: "wc6", question: "What is the capital of South Africa?", answer: "Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)" },
      { id: "wc7", question: "What is the capital of Argentina?", answer: "Buenos Aires" },
      { id: "wc8", question: "What is the capital of Norway?", answer: "Oslo" },
    ],
  },
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description: "Core JavaScript concepts every developer should know.",
    category: "Programming",
    color: "from-yellow-400 to-orange-500",
    cards: [
      { id: "js1", question: "What does 'typeof null' return in JavaScript?", answer: "'object' — a well-known JavaScript quirk/bug that was never fixed for backwards compatibility." },
      { id: "js2", question: "What is a closure?", answer: "A function that retains access to variables from its outer (enclosing) scope even after that scope has finished executing." },
      { id: "js3", question: "What is the difference between '==' and '==='?", answer: "'==' performs type coercion before comparing; '===' checks both value and type without coercion." },
      { id: "js4", question: "What does the 'async/await' syntax do?", answer: "It allows writing asynchronous code in a synchronous style. 'async' marks a function as asynchronous; 'await' pauses execution until a Promise resolves." },
      { id: "js5", question: "What is the event loop?", answer: "A mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the browser/Node, then executing callbacks when the call stack is empty." },
      { id: "js6", question: "What is 'hoisting' in JavaScript?", answer: "The behavior where variable and function declarations are moved to the top of their scope before execution. 'var' is hoisted and initialized as undefined; 'let'/'const' are hoisted but not initialized (temporal dead zone)." },
      { id: "js7", question: "What is the difference between 'null' and 'undefined'?", answer: "'undefined' means a variable has been declared but not assigned a value. 'null' is an intentional assignment representing 'no value'." },
    ],
  },
  {
    id: "human-anatomy",
    title: "Human Anatomy",
    description: "Key facts about the human body and its systems.",
    category: "Science",
    color: "from-red-400 to-pink-500",
    cards: [
      { id: "ha1", question: "How many bones are in the adult human body?", answer: "206 bones" },
      { id: "ha2", question: "What is the largest organ in the human body?", answer: "The skin (integumentary system)" },
      { id: "ha3", question: "How many chambers does the human heart have?", answer: "4 chambers: right atrium, right ventricle, left atrium, and left ventricle." },
      { id: "ha4", question: "What is the longest bone in the human body?", answer: "The femur (thigh bone)" },
      { id: "ha5", question: "Which organ produces insulin?", answer: "The pancreas" },
      { id: "ha6", question: "How many muscles are in the human body?", answer: "Approximately 600 skeletal muscles, plus smooth and cardiac muscles." },
      { id: "ha7", question: "What is the smallest bone in the human body?", answer: "The stapes, located in the middle ear." },
      { id: "ha8", question: "What is the function of red blood cells?", answer: "To carry oxygen from the lungs to the rest of the body via hemoglobin, and return carbon dioxide back to the lungs." },
    ],
  },
  {
    id: "world-history",
    title: "World History",
    description: "Major events and figures that shaped human civilization.",
    category: "History",
    color: "from-amber-500 to-yellow-600",
    cards: [
      { id: "wh1", question: "In what year did World War II end?", answer: "1945 — VE Day (Victory in Europe) was May 8, 1945; VJ Day (Victory over Japan) was August 15, 1945." },
      { id: "wh2", question: "Who was the first Emperor of China?", answer: "Qin Shi Huang, who unified the warring states in 221 BC." },
      { id: "wh3", question: "What event triggered the start of World War I?", answer: "The assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, in Sarajevo." },
      { id: "wh4", question: "When did the Berlin Wall fall?", answer: "November 9, 1989" },
      { id: "wh5", question: "Who wrote the Declaration of Independence?", answer: "Thomas Jefferson was the primary author, with contributions from Benjamin Franklin and John Adams." },
      { id: "wh6", question: "What was the Renaissance?", answer: "A cultural and intellectual movement in Europe (14th–17th centuries) marked by renewed interest in classical antiquity, humanism, science, and the arts." },
    ],
  },
  {
    id: "music-theory",
    title: "Music Theory",
    description: "Fundamentals of reading, writing, and understanding music.",
    category: "Arts",
    color: "from-purple-500 to-violet-600",
    cards: [
      { id: "mt1", question: "How many semitones are in an octave?", answer: "12 semitones" },
      { id: "mt2", question: "What is a major scale?", answer: "A diatonic scale following the interval pattern: W-W-H-W-W-W-H (whole and half steps)." },
      { id: "mt3", question: "What does 'tempo' mean in music?", answer: "The speed at which a piece of music is played, typically measured in beats per minute (BPM)." },
      { id: "mt4", question: "What is a chord?", answer: "Three or more notes played simultaneously. A basic triad consists of a root, a third, and a fifth." },
      { id: "mt5", question: "What is the time signature 4/4?", answer: "It means there are 4 beats per measure, and the quarter note gets one beat. It's the most common time signature." },
      { id: "mt6", question: "What is the difference between major and minor keys?", answer: "Major keys generally sound bright and happy; minor keys sound darker and more melancholic. The difference lies in the interval pattern of the scale." },
    ],
  },
];

export function getDeckById(id: string): Deck | undefined {
  return decks.find((d) => d.id === id);
}
