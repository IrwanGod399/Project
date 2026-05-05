# Pomodoflow

A sleek, dark-themed Pomodoro productivity timer built with Next.js and Tailwind CSS.

## Features

- **Three modes**: Focus (25 min), Short Break (5 min), Long Break (15 min)
- **Animated ring progress** with per-mode color coding (red / green / blue)
- **Session history** stored locally — view completed sessions grouped by day
- **Streak counter** — tracks consecutive days you've used the timer
- **Customizable settings** — drag sliders for each duration, toggle auto-start, pick from preset configs
- **Task picker** — cycle through common task labels for each focus session
- **Pomodoro dot tracker** — visualize progress toward the next long break

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Main Pomodoro timer |
| `/stats` | Session history & statistics |
| `/settings` | Timer duration and behavior settings |

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** for persistence (no backend required)

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
