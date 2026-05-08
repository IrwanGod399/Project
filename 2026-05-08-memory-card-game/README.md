# 🎴 MemoryFlip

A beautiful memory card matching game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **3 Difficulty levels** — Easy (4×4), Medium (6×6), Hard (8×8)
- **3D card flip animations** — Smooth CSS 3D transforms on every card
- **Live stats** — Move counter, timer, and progress bar during gameplay
- **High scores** — Persistent leaderboard stored in localStorage with difficulty filtering
- **Win detection** — Celebration modal with stats summary on game completion
- **Responsive design** — Works on desktop and mobile

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling + custom CSS animations
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — Score persistence

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — difficulty selection and how-to-play guide |
| `/game` | Game board — interactive card matching game |
| `/scores` | Leaderboard — filterable high scores with rankings |

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. Click a card to flip it and reveal the hidden animal emoji
2. Click a second card to find its matching pair
3. Matched pairs stay face-up — unmatched cards flip back face-down
4. Match all pairs with the fewest moves and fastest time for a perfect score!
