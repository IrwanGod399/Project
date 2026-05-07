# CountDown Timer ⏳

A beautiful, real-time countdown app to track your most important events and milestones.

## Features

- **Live Countdowns** — All timers update every second with days, hours, minutes, and seconds
- **3 Pages / Routes** — Home (event grid), Add Event (form with live preview), Event Detail (full-screen countdown)
- **6 Pre-loaded Events** — New Year, Christmas, Halloween, Summer Solstice, Thanksgiving, Valentine's Day
- **Custom Events** — Add your own events with a name, date, emoji, and gradient color
- **Confetti Celebration** — Animated confetti fires when an event's countdown reaches zero
- **Copy Info** — One-click copy countdown details to clipboard
- **LocalStorage Persistence** — All events saved in-browser, no backend needed
- **Dark UI** — Polished dark theme with gradient cards and animated backgrounds

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React Hooks** (useState, useEffect)

## Run It

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — grid of all countdowns with live timers |
| `/add` | Add a new event with live card preview |
| `/countdown/[id]` | Full-screen countdown detail with confetti |
