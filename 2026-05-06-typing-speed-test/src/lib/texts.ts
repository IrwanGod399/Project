import { TextSample, Difficulty } from "./types";

const texts: TextSample[] = [
  // Easy
  {
    id: "e1",
    difficulty: "easy",
    category: "Nature",
    text: "The sun rises in the east and sets in the west. Birds sing in the morning and crickets chirp at night. Rain falls from the clouds and rivers flow to the sea. Trees grow tall in the forest and flowers bloom in the spring.",
  },
  {
    id: "e2",
    difficulty: "easy",
    category: "Daily Life",
    text: "I wake up early every morning and make a cup of coffee. Then I read the news and check my email. After breakfast I go for a short walk in the park. Fresh air helps me think and feel ready for the day ahead.",
  },
  {
    id: "e3",
    difficulty: "easy",
    category: "Food",
    text: "Pizza is one of the most popular foods in the world. It has a crispy crust topped with tomato sauce and cheese. You can add pepperoni, mushrooms, or peppers as toppings. Many people enjoy sharing a pizza with friends and family.",
  },
  {
    id: "e4",
    difficulty: "easy",
    category: "Animals",
    text: "Dogs are loyal and friendly animals that love to play. They wag their tails when they are happy and bark to warn their owners. A dog needs food, water, and exercise every day. Many dogs love to fetch balls and go for walks in the park.",
  },
  // Medium
  {
    id: "m1",
    difficulty: "medium",
    category: "Science",
    text: "The human brain is the most complex organ in the body, containing approximately 86 billion neurons. These neurons communicate through synapses, forming intricate networks that enable thought, memory, and emotion. Scientists are still unraveling the mysteries of consciousness and how the brain processes information at such remarkable speeds.",
  },
  {
    id: "m2",
    difficulty: "medium",
    category: "Technology",
    text: "Artificial intelligence has transformed the way we interact with technology. Machine learning algorithms can now recognize speech, translate languages, and even generate creative content. These systems learn from vast datasets, improving their performance over time without explicit programming for each individual task.",
  },
  {
    id: "m3",
    difficulty: "medium",
    category: "History",
    text: "The Renaissance was a cultural movement that profoundly affected European intellectual life in the early modern period. Beginning in Italy, then spreading to the rest of Europe, its influence was felt in literature, philosophy, art, music, politics, science, and religion. It marked the transition from the medieval period to modernity.",
  },
  {
    id: "m4",
    difficulty: "medium",
    category: "Space",
    text: "The James Webb Space Telescope launched in December 2021 and has revolutionized our understanding of the universe. It can peer back over 13 billion years to observe some of the first galaxies ever formed. Its infrared capabilities allow it to see through cosmic dust clouds that were previously opaque to other telescopes.",
  },
  // Hard
  {
    id: "h1",
    difficulty: "hard",
    category: "Philosophy",
    text: "Epistemology, the branch of philosophy concerned with the theory of knowledge, grapples with fundamental questions: What constitutes justified belief? How do we distinguish between knowledge and mere opinion? Descartes' methodological skepticism proposed doubting everything until reaching the indubitable cogito ergo sum, while contemporary externalists argue that knowledge depends on reliable causal connections to the external world.",
  },
  {
    id: "h2",
    difficulty: "hard",
    category: "Programming",
    text: "Functional programming paradigms emphasize immutability, pure functions, and declarative code composition. Monads, a concept borrowed from category theory, provide a way to chain computations while managing side effects in a controlled manner. Languages like Haskell enforce referential transparency, ensuring that expressions always evaluate to the same result given identical inputs.",
  },
  {
    id: "h3",
    difficulty: "hard",
    category: "Literature",
    text: "Stream of consciousness, a narrative technique pioneered by James Joyce and Virginia Woolf, attempts to replicate the turbulent flow of thoughts, memories, and sensations that characterize human cognition. Unlike conventional linear narration, it juxtaposes fragments of perception with internal monologue, creating a polyphonic texture that challenges traditional notions of authorial omniscience and narrative coherence.",
  },
  {
    id: "h4",
    difficulty: "hard",
    category: "Economics",
    text: "Keynesian macroeconomic theory posits that aggregate demand is the primary driver of economic output and employment. During recessions, when private sector demand contracts, fiscal stimulus through government expenditure can offset deflationary pressures and restore equilibrium. Critics from the monetarist school argue that such interventions crowd out private investment and generate inflationary expectations that ultimately undermine long-run stability.",
  },
];

export function getRandomText(difficulty: Difficulty): TextSample {
  const filtered = texts.filter((t) => t.difficulty === difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getAllTexts(): TextSample[] {
  return texts;
}
