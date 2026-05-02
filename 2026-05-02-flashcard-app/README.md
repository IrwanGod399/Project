# FlashMind — Flashcard Study App

A sleek, interactive flashcard app for studying any topic. Built with Next.js 16 and Tailwind CSS.

## Features

- **5 pre-built decks** covering World Capitals, JavaScript Basics, Human Anatomy, World History, and Music Theory
- **3D card flip animation** — click any card to reveal the answer
- **Study session tracking** — mark cards as "Got it!" or "Still learning" to track progress
- **Session summary** — see your score after completing a deck
- **Searchable deck browser** with category filtering
- Shuffled card order every session
- Fully static — no backend required

## Pages / Routes

| Route | Description |
|---|---|
| `/` | Home — deck overview with stats |
| `/decks` | Browse & search all decks with category filter |
| `/decks/[id]` | Deck detail — see all Q&A cards |
| `/study/[id]` | Interactive study mode with flip animation |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Rendering:** Static Site Generation (SSG)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start studying.

## Build for Production

```bash
npm run build
npm start
```
