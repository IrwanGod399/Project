# ChronoTrack — Precision Stopwatch

A sleek, dark-themed stopwatch app with lap tracking, live stats, and persistent session history.

## Features

- **Stopwatch** — Start, pause, resume, and reset with millisecond precision (using `requestAnimationFrame`)
- **Lap Tracking** — Record splits while running; fastest/slowest laps highlighted automatically
- **Save Sessions** — Name and save any session to browser localStorage
- **Session History** — Browse all past sessions with expandable lap details and delete controls
- **Live Stats** — Average lap time and total elapsed shown in real time
- **About Page** — Feature overview and use case examples

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Main stopwatch with controls and lap table |
| `/history` | Saved session browser with expandable lap data |
| `/about` | Feature guide and tech stack info |

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **localStorage** (session persistence)

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
