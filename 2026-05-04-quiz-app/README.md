# BrainBlast Quiz App

A fast-paced trivia quiz app with 30 hand-crafted questions across five categories, a per-question countdown timer, instant explanations, and a personal leaderboard stored in localStorage.

## Features

- **5 categories**: Science, History, Geography, Pop Culture, Technology
- **3 difficulty levels**: Easy, Medium, Hard — or mix them all
- **Configurable length**: 5, 10, 15, or 20 questions per round
- **20-second countdown timer** per question — auto-submits on timeout
- **Live feedback**: correct/incorrect highlighting + explanation after each answer
- **Results summary**: score, accuracy %, average time per question, and per-question breakdown
- **Leaderboard**: persists top-20 scores locally with best/average stats

## Routes

| Route | Description |
|---|---|
| `/` | Home — configure category, difficulty, and question count |
| `/quiz` | Active quiz with timer and answer reveal |
| `/results` | Score summary and question breakdown |
| `/leaderboard` | Personal score history from localStorage |

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** — lightweight client-side state management

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
