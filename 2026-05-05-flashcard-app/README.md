# FlashMind — Interactive Flashcard App

A sleek, interactive flashcard study app built with Next.js and Tailwind CSS. Flip cards, track your progress, and master any subject with beautifully designed study decks.

## Features

- **4 Curated Decks** — JavaScript Fundamentals, World Capitals, Science & Space, World History
- **3D Card Flip Animation** — Click any card to reveal the answer with a smooth flip effect
- **Progress Tracking** — Mark cards as "Got It" or "Didn't Know" and get a final score
- **Deck Browser** — Search and filter decks by category
- **Results Screen** — See your score, correct/wrong counts, and retry with shuffled cards
- **Dot Progress Indicator** — Visual overview of answered vs. remaining cards

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, featured decks |
| `/decks` | Browse all decks with search & category filter |
| `/study/[deckId]` | Interactive study session with flip cards |

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
