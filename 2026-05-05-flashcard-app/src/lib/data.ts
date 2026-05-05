export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  cards: Flashcard[];
}

export const decks: Deck[] = [
  {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Core concepts every JS developer should know",
    category: "Programming",
    color: "from-yellow-400 to-orange-500",
    cards: [
      { id: "j1", question: "What is a closure in JavaScript?", answer: "A closure is a function that retains access to its outer scope even after the outer function has returned. It 'closes over' the variables from its parent scope." },
      { id: "j2", question: "What is the difference between == and ===?", answer: "== performs type coercion before comparison (loose equality), while === checks both value AND type without coercion (strict equality). Always prefer ===." },
      { id: "j3", question: "What is event bubbling?", answer: "Event bubbling is when an event triggered on a child element propagates up through its ancestors in the DOM. You can stop it with event.stopPropagation()." },
      { id: "j4", question: "What does 'use strict' do?", answer: "'use strict' enables strict mode, which catches common coding mistakes, prevents use of undeclared variables, and disables certain deprecated features." },
      { id: "j5", question: "What is a Promise?", answer: "A Promise is an object representing the eventual completion or failure of an async operation. It has three states: pending, fulfilled, and rejected." },
      { id: "j6", question: "What is the difference between let, const, and var?", answer: "var is function-scoped and hoisted. let is block-scoped and not hoisted. const is block-scoped, not hoisted, and cannot be reassigned (though objects can be mutated)." },
      { id: "j7", question: "What is destructuring?", answer: "Destructuring is a syntax that allows unpacking values from arrays or properties from objects into distinct variables. e.g., const { name, age } = person;" },
      { id: "j8", question: "What is the spread operator?", answer: "The spread operator (...) expands an iterable into individual elements. It can clone arrays/objects, merge collections, and pass array elements as function arguments." },
    ],
  },
  {
    id: "world-capitals",
    title: "World Capitals",
    description: "Test your knowledge of capital cities around the globe",
    category: "Geography",
    color: "from-blue-400 to-cyan-500",
    cards: [
      { id: "g1", question: "What is the capital of Japan?", answer: "Tokyo — the most populous metropolitan area in the world with over 37 million people." },
      { id: "g2", question: "What is the capital of Brazil?", answer: "Brasília — a planned city built in the 1950s, not Rio de Janeiro or São Paulo as many assume." },
      { id: "g3", question: "What is the capital of Australia?", answer: "Canberra — chosen as a compromise between Sydney and Melbourne, purpose-built as the capital." },
      { id: "g4", question: "What is the capital of Canada?", answer: "Ottawa, Ontario — located on the Ottawa River on the border of Ontario and Quebec." },
      { id: "g5", question: "What is the capital of South Africa?", answer: "South Africa has three capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)." },
      { id: "g6", question: "What is the capital of New Zealand?", answer: "Wellington — situated at the southern tip of the North Island, it's one of the windiest cities in the world." },
      { id: "g7", question: "What is the capital of Switzerland?", answer: "Bern — officially the 'federal city', as Switzerland has no official capital by its constitution." },
      { id: "g8", question: "What is the capital of India?", answer: "New Delhi — the capital territory within Delhi, home to the Indian government and Parliament." },
    ],
  },
  {
    id: "science-facts",
    title: "Science & Space",
    description: "Fascinating facts about physics, chemistry, and the cosmos",
    category: "Science",
    color: "from-purple-500 to-pink-500",
    cards: [
      { id: "s1", question: "How old is the universe?", answer: "Approximately 13.8 billion years old, based on measurements of the cosmic microwave background radiation and the expansion rate of the universe." },
      { id: "s2", question: "What is the speed of light?", answer: "299,792,458 meters per second (about 186,282 miles per second) in a vacuum. It's the universal speed limit according to special relativity." },
      { id: "s3", question: "What element has the atomic number 79?", answer: "Gold (Au) — a dense, soft, yellow metal that is highly malleable and ductile. It doesn't tarnish or corrode." },
      { id: "s4", question: "What is DNA's full name?", answer: "Deoxyribonucleic Acid — the molecule that carries genetic information in living organisms, structured as a double helix." },
      { id: "s5", question: "How many moons does Saturn have?", answer: "Saturn has 146 confirmed moons as of 2023, making it the planet with the most moons in our solar system." },
      { id: "s6", question: "What is the Higgs boson?", answer: "A fundamental particle associated with the Higgs field, which gives mass to other particles. Confirmed in 2012 at CERN's Large Hadron Collider." },
      { id: "s7", question: "What is absolute zero?", answer: "-273.15°C or -459.67°F (0 Kelvin) — the theoretical lowest temperature where all molecular motion stops." },
      { id: "s8", question: "What causes the northern lights (Aurora Borealis)?", answer: "Charged particles from the sun collide with Earth's atmosphere and interact with magnetic field lines, exciting gas molecules that emit colored light." },
    ],
  },
  {
    id: "history-events",
    title: "World History",
    description: "Key events that shaped the modern world",
    category: "History",
    color: "from-emerald-500 to-teal-600",
    cards: [
      { id: "h1", question: "When did World War II end?", answer: "1945 — V-E Day (Victory in Europe) was May 8, 1945, and V-J Day (Victory over Japan) was August 15, 1945, with formal surrender on September 2, 1945." },
      { id: "h2", question: "What year did the Berlin Wall fall?", answer: "1989 — The wall fell on November 9, 1989, marking the beginning of German reunification and symbolizing the end of the Cold War." },
      { id: "h3", question: "Who was the first person to walk on the moon?", answer: "Neil Armstrong on July 20, 1969, during the Apollo 11 mission. Buzz Aldrin joined him 20 minutes later." },
      { id: "h4", question: "When was the Magna Carta signed?", answer: "1215 — King John of England signed the Magna Carta on June 15, 1215, establishing for the first time that the king was subject to the rule of law." },
      { id: "h5", question: "What sparked World War I?", answer: "The assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on June 28, 1914, by Gavrilo Princip." },
      { id: "h6", question: "When did the French Revolution begin?", answer: "1789 — The storming of the Bastille on July 14, 1789 is considered the start, though tensions had been building since early 1789." },
      { id: "h7", question: "What was the Renaissance?", answer: "A cultural and intellectual movement in Europe from the 14th to 17th centuries that marked the transition from the Middle Ages to modernity, emphasizing humanism and classical learning." },
      { id: "h8", question: "When did the Roman Empire fall?", answer: "The Western Roman Empire fell in 476 AD when the last emperor Romulus Augustulus was deposed. The Eastern (Byzantine) Empire continued until 1453 AD." },
    ],
  },
];

export function getDeck(id: string): Deck | undefined {
  return decks.find((d) => d.id === id);
}
