export type Category =
  | "motivation"
  | "wisdom"
  | "life"
  | "success"
  | "creativity"
  | "mindfulness";

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: Category;
}

export const quotes: Quote[] = [
  // Motivation
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
  },
  {
    id: 2,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "motivation",
  },
  {
    id: 3,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivation",
  },
  {
    id: 4,
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "motivation",
  },
  {
    id: 5,
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
    category: "motivation",
  },
  {
    id: 6,
    text: "Great things never come from comfort zones.",
    author: "Unknown",
    category: "motivation",
  },

  // Wisdom
  {
    id: 7,
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "wisdom",
  },
  {
    id: 8,
    text: "To know thyself is the beginning of wisdom.",
    author: "Socrates",
    category: "wisdom",
  },
  {
    id: 9,
    text: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
    author: "William Shakespeare",
    category: "wisdom",
  },
  {
    id: 10,
    text: "Wonder is the beginning of wisdom.",
    author: "Socrates",
    category: "wisdom",
  },
  {
    id: 11,
    text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    author: "Rumi",
    category: "wisdom",
  },
  {
    id: 12,
    text: "The more I learn, the more I realize how much I don't know.",
    author: "Albert Einstein",
    category: "wisdom",
  },

  // Life
  {
    id: 13,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
  },
  {
    id: 14,
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "life",
  },
  {
    id: 15,
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    category: "life",
  },
  {
    id: 16,
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "life",
  },
  {
    id: 17,
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
  },
  {
    id: 18,
    text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Maya Angelou",
    category: "life",
  },

  // Success
  {
    id: 19,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
  },
  {
    id: 20,
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "success",
  },
  {
    id: 21,
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "success",
  },
  {
    id: 22,
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    category: "success",
  },
  {
    id: 23,
    text: "The secret of success is to do the common thing uncommonly well.",
    author: "John D. Rockefeller Jr.",
    category: "success",
  },
  {
    id: 24,
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
    category: "success",
  },

  // Creativity
  {
    id: 25,
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    category: "creativity",
  },
  {
    id: 26,
    text: "You can't use up creativity. The more you use, the more you have.",
    author: "Maya Angelou",
    category: "creativity",
  },
  {
    id: 27,
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    category: "creativity",
  },
  {
    id: 28,
    text: "Every artist dips his brush in his own soul, and paints his own nature into his pictures.",
    author: "Henry Ward Beecher",
    category: "creativity",
  },
  {
    id: 29,
    text: "The creative adult is the child who survived.",
    author: "Ursula K. Le Guin",
    category: "creativity",
  },
  {
    id: 30,
    text: "Art enables us to find ourselves and lose ourselves at the same time.",
    author: "Thomas Merton",
    category: "creativity",
  },

  // Mindfulness
  {
    id: 31,
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "mindfulness",
  },
  {
    id: 32,
    text: "The present moment is the only time over which we have dominion.",
    author: "Thich Nhat Hanh",
    category: "mindfulness",
  },
  {
    id: 33,
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
    category: "mindfulness",
  },
  {
    id: 34,
    text: "You have power over your mind—not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "mindfulness",
  },
  {
    id: 35,
    text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.",
    author: "Eckhart Tolle",
    category: "mindfulness",
  },
  {
    id: 36,
    text: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
    category: "mindfulness",
  },
];

export const categoryMeta: Record<
  Category,
  { label: string; color: string; bg: string; icon: string }
> = {
  motivation: {
    label: "Motivation",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    icon: "🔥",
  },
  wisdom: {
    label: "Wisdom",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    icon: "🦉",
  },
  life: {
    label: "Life",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: "🌱",
  },
  success: {
    label: "Success",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: "🏆",
  },
  creativity: {
    label: "Creativity",
    color: "text-pink-600",
    bg: "bg-pink-50 border-pink-200",
    icon: "✨",
  },
  mindfulness: {
    label: "Mindfulness",
    color: "text-teal-600",
    bg: "bg-teal-50 border-teal-200",
    icon: "🧘",
  },
};

export function getRandomQuote(exclude?: number): Quote {
  const pool = exclude !== undefined ? quotes.filter((q) => q.id !== exclude) : quotes;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuotesByCategory(category: Category): Quote[] {
  return quotes.filter((q) => q.category === category);
}
