# TypeRacerPro — Typing Speed Test

A sleek, real-time typing speed test built with Next.js and Tailwind CSS. Test your WPM across different word modes and difficulty levels.

## Features

- **3 Word Modes**: Common English words, Programming terms, Famous quotes
- **4 Timer Options**: 15s, 30s, 60s, 120s tests
- **Real-time feedback**: Character-level highlighting (green/red) as you type
- **Detailed results**: WPM, accuracy %, correct/incorrect words, raw speed
- **Leaderboard**: Compare your scores against top performers
- **Keyboard shortcuts**: Press Tab to instantly restart

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Home — features overview, quick-start presets, top score |
| `/test` | Typing test with configurable duration & word set |
| `/results` | Post-test stats with performance rating |
| `/leaderboard` | Top scores sorted by WPM |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React hooks (useState, useEffect, useRef, useCallback)

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
