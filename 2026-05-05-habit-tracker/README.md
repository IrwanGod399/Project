# HabitFlow — Habit Tracker

A clean, modern daily habit tracker built with Next.js and Tailwind CSS.

## Features

- **Today view** — Check off daily habits with satisfying animations and a progress bar
- **Habit manager** — Add, edit, and delete habits with custom icons and colors
- **Stats dashboard** — Visual bar chart, per-habit completion grids, streaks, and top performers
- Persistent storage via `localStorage` — your data survives page refreshes
- Streak counter with 🔥 indicators
- Fully responsive and mobile-friendly

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- LocalStorage for data persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Path | Description |
|------|-------------|
| `/` | Today's habits — check off your daily goals |
| `/habits` | Manage habits — add, edit, delete |
| `/stats` | Statistics — streaks, completion rates, charts |
