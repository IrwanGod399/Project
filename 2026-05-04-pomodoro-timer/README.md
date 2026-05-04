# Pomodoro Timer

A sleek, dark-themed Pomodoro productivity timer built with Next.js and Tailwind CSS. Stay focused with timed work sessions, earn breaks, and track your progress over time.

## Features

- **Three timer modes** — Focus (25m), Short Break (5m), Long Break (15m)
- **Animated SVG progress ring** — smooth, color-coded for each mode
- **Session tracking** — session dots show progress toward long break
- **Task labeling** — tag what you're working on during focus sessions
- **Audio notification** — gentle three-note chime on session complete
- **Statistics page** — weekly bar chart, streaks, session history
- **Settings page** — customize all durations, toggle auto-start, set sessions per cycle
- **Persistent storage** — all data saved to localStorage

## Pages

| Route | Description |
|---|---|
| `/` | Main Pomodoro timer |
| `/stats` | Session history, streak, weekly chart |
| `/settings` | Customize timer durations and behavior |

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Web Audio API** for notification sounds
- **localStorage** for persistent settings and session history

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
