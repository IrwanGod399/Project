export interface WordEntry {
  word: string;
  hint: string;
  category: string;
}

export const categories = ["Animals", "Food", "Science", "Sports", "Countries"] as const;
export type Category = (typeof categories)[number];

export const wordBank: Record<Category, WordEntry[]> = {
  Animals: [
    { word: "ELEPHANT", hint: "The largest land animal", category: "Animals" },
    { word: "GIRAFFE", hint: "Has the longest neck", category: "Animals" },
    { word: "PENGUIN", hint: "A bird that cannot fly but swims", category: "Animals" },
    { word: "DOLPHIN", hint: "A highly intelligent marine mammal", category: "Animals" },
    { word: "CHEETAH", hint: "The fastest land animal", category: "Animals" },
    { word: "GORILLA", hint: "Our closest relative in the ape family", category: "Animals" },
    { word: "OCTOPUS", hint: "Has eight arms and three hearts", category: "Animals" },
    { word: "PLATYPUS", hint: "A mammal that lays eggs", category: "Animals" },
    { word: "FLAMINGO", hint: "A pink bird that stands on one leg", category: "Animals" },
    { word: "CHAMELEON", hint: "Can change its skin color", category: "Animals" },
  ],
  Food: [
    { word: "AVOCADO", hint: "A creamy green fruit used in guacamole", category: "Food" },
    { word: "BROCCOLI", hint: "A green vegetable shaped like a tree", category: "Food" },
    { word: "SPAGHETTI", hint: "Long thin Italian pasta", category: "Food" },
    { word: "CROISSANT", hint: "A flaky French pastry", category: "Food" },
    { word: "BLUEBERRY", hint: "Small blue fruit packed with antioxidants", category: "Food" },
    { word: "ASPARAGUS", hint: "A green vegetable with edible stalks", category: "Food" },
    { word: "CINNAMON", hint: "A warm spice from tree bark", category: "Food" },
    { word: "ARTICHOKE", hint: "A vegetable with edible petals", category: "Food" },
    { word: "RASPBERRY", hint: "A small red berry with seeds", category: "Food" },
    { word: "WATERMELON", hint: "A large green fruit with red flesh", category: "Food" },
  ],
  Science: [
    { word: "GRAVITY", hint: "The force that pulls objects toward Earth", category: "Science" },
    { word: "MOLECULE", hint: "The smallest unit of a substance", category: "Science" },
    { word: "PHOTON", hint: "A particle of light", category: "Science" },
    { word: "NUCLEUS", hint: "The center of an atom", category: "Science" },
    { word: "OSMOSIS", hint: "Water moving through a membrane", category: "Science" },
    { word: "CATALYST", hint: "Something that speeds up a reaction", category: "Science" },
    { word: "ELECTRON", hint: "A negatively charged particle", category: "Science" },
    { word: "CHROMOSOME", hint: "Carries genetic information in a cell", category: "Science" },
    { word: "ECOSYSTEM", hint: "A community of living things and their environment", category: "Science" },
    { word: "NEUTRON", hint: "A neutral particle in an atom's nucleus", category: "Science" },
  ],
  Sports: [
    { word: "BASKETBALL", hint: "A sport played with a round ball and a hoop", category: "Sports" },
    { word: "VOLLEYBALL", hint: "A net sport played by two teams of six", category: "Sports" },
    { word: "BADMINTON", hint: "A racket sport played with a shuttlecock", category: "Sports" },
    { word: "GYMNASTICS", hint: "A sport involving balance and acrobatics", category: "Sports" },
    { word: "SWIMMING", hint: "Moving through water using your body", category: "Sports" },
    { word: "WRESTLING", hint: "A combat sport involving grappling", category: "Sports" },
    { word: "ARCHERY", hint: "Shooting arrows at a target", category: "Sports" },
    { word: "MARATHON", hint: "A long-distance running race of 26.2 miles", category: "Sports" },
    { word: "FENCING", hint: "A sword-fighting sport", category: "Sports" },
    { word: "TRIATHLON", hint: "A race combining swim, bike, and run", category: "Sports" },
  ],
  Countries: [
    { word: "AUSTRALIA", hint: "A country and a continent down under", category: "Countries" },
    { word: "ARGENTINA", hint: "South American country known for tango", category: "Countries" },
    { word: "PORTUGAL", hint: "A country in southwestern Europe", category: "Countries" },
    { word: "ETHIOPIA", hint: "The most populous landlocked country in the world", category: "Countries" },
    { word: "SINGAPORE", hint: "A city-state in Southeast Asia", category: "Countries" },
    { word: "UKRAINE", hint: "The largest country entirely in Europe", category: "Countries" },
    { word: "COLOMBIA", hint: "Named after Christopher Columbus", category: "Countries" },
    { word: "INDONESIA", hint: "The world's largest archipelago nation", category: "Countries" },
    { word: "MALAYSIA", hint: "A Southeast Asian country split by the South China Sea", category: "Countries" },
    { word: "MOROCCO", hint: "An African country bordering the Mediterranean", category: "Countries" },
  ],
};

export function scrambleWord(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
}

export function getRandomWords(category: Category, count: number): WordEntry[] {
  const pool = [...wordBank[category]];
  const result: WordEntry[] = [];
  while (result.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
