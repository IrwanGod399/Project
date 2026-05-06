# TypeRacer — Typing Speed Test

A fast, clean typing speed test app built with Next.js and Tailwind CSS. Test your WPM, track accuracy, and review your progress over time — all without an account or login.

## Features

- **Real-time WPM** — Words-per-minute updates live as you type
- **Accuracy tracking** — Per-character error highlighting and accuracy percentage
- **3 difficulty levels** — Easy, Medium, and Hard texts across diverse topics
- **3 time limits** — 30s, 60s, and 120s test durations
- **Stats dashboard** — Historical results with a WPM bar chart, best/average stats, and per-test breakdown
- **Persistent storage** — Results stored in localStorage (no backend needed)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with feature overview and difficulty cards |
| `/test` | Interactive typing test with live WPM and accuracy |
| `/stats` | Stats dashboard with history, trends, and summary cards |

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** for result persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start typing.

## How It Works

1. Pick a difficulty (Easy / Medium / Hard) and duration (30s / 60s / 120s)
2. Click on the text or start typing — the timer begins automatically
3. Each character is highlighted green (correct) or red (error) in real time
4. When time runs out (or you finish the passage), your results are shown and saved
5. Head to `/stats` to review your history and track improvement
