# HabitFlow – Daily Habit Tracker

A clean, modern habit tracking app built with Next.js 16 and Tailwind CSS. Build streaks, track progress, and visualize your daily habits with a polished UI.

## Features

- **Dashboard** – See all habits at a glance with today's progress bar and category filters
- **Habit Detail** – Interactive 30-day calendar, streak stats, and one-tap check-ins
- **Add Habit** – Fully customizable habits with icon picker, color, category, and target days
- **Statistics** – Activity heatmap, per-habit completion rates, and streak leaderboard
- **Persistent Storage** – All data saved in localStorage; pre-loaded with 6 sample habits
- **Streak Tracking** – Current streak, longest streak, and 7-day mini history per habit

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- localStorage for client-side persistence

## Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard – all habits + daily progress |
| `/stats` | Statistics – heatmap + per-habit breakdown |
| `/habits/new` | Add a new habit |
| `/habits/[id]` | Habit detail – calendar, stats, delete |

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
