# TypeRacer — Typing Speed Test

A sleek, real-time typing speed test built with Next.js 16, TypeScript, and Tailwind CSS. Test your WPM, track accuracy, and compete on a local leaderboard.

## Features

- **Real-time WPM & accuracy** — stats update as you type
- **60-second countdown timer** with visual progress bar
- **3 difficulty levels** — Easy, Medium, Hard (sentences, quotes, code snippets)
- **Character-level feedback** — green for correct, red for wrong, violet cursor
- **Local leaderboard** — save your score with a name and compare results
- **12 handpicked text samples** across Nature, Science, Tech, Literature, and more

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with feature overview |
| `/test` | Interactive typing test |
| `/leaderboard` | Ranked results saved to localStorage |

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **JetBrains Mono** font
- **localStorage** for persisting results

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. Go to **/test**
2. Choose a difficulty (Easy / Medium / Hard)
3. Click the text area and start typing — the timer starts on your first keystroke
4. Finish the text or wait for the 60-second timer to end
5. Enter your name and save your score to the leaderboard
