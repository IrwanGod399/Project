# NumQuest - Number Guessing Game

A neon-themed, interactive number guessing game built with Next.js. Test your instincts across three difficulty levels and compete on the leaderboard!

## Features

- **3 Difficulty Levels**: Easy (1–50, 10 tries), Medium (1–100, 7 tries), Hard (1–500, 5 tries)
- **Score System**: Bonus points for fewer attempts and faster completion, with difficulty multipliers
- **Hot/Cold Hints**: Directional feedback after every guess
- **Persistent Leaderboard**: Scores saved in localStorage with filtering by difficulty
- **Live Timer**: Track how fast you solve each round
- **Guess History**: Visual record of all guesses with direction arrows
- **Neon Dark UI**: Glowing purple/cyan theme with smooth animations

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home screen with difficulty cards and how-to-play guide |
| `/game` | Main game — difficulty selector + interactive guessing interface |
| `/leaderboard` | All-time scores with medal rankings and stat summaries |

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **localStorage** for score persistence

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
