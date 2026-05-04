# Word Scramble Game

A fast-paced word scramble game where you unscramble letters, race against the clock, and climb the leaderboard across 5 vocabulary categories.

## Features

- **5 Categories**: Animals, Food, Science, Sports, Countries — or play a Random Mix
- **Timed Rounds**: 30 seconds per word with a live countdown timer
- **Scoring System**: 100 base points + 5 pts per second remaining; hints cost 25 pts
- **Leaderboard**: Persistent local high scores with podium display and category filters
- **Hint System**: Reveal a word's meaning for a point penalty
- **Rules Page**: Full scoring reference and pro tips

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- React hooks for game state management
- `localStorage` for score persistence

## Pages / Routes

| Route | Description |
|---|---|
| `/` | Home page with category picker and hero |
| `/game` | Interactive game with setup, play, and results screens |
| `/leaderboard` | High scores with podium and category filter |
| `/rules` | How to play, scoring reference, and pro tips |

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
