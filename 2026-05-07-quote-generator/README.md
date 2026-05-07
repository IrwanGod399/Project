# QuoteVerse – Daily Inspiration Quote Generator

A beautifully designed quote generator app that lets you explore, discover, and save inspiring quotes across six curated categories.

## Features

- **Random Quote Generator** – Spin a new quote instantly with animation
- **6 Categories** – Motivation, Wisdom, Life, Success, Creativity, Mindfulness
- **Favorites** – Save quotes to your personal collection (persisted in localStorage)
- **Copy & Tweet** – Share any quote with one click
- **Smooth Animations** – Fade-in transitions and hover effects throughout
- **36 Curated Quotes** – Real quotes from notable thinkers, leaders, and artists

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** React hooks + localStorage for favorites
- **Routing:** File-based App Router with dynamic `[category]` routes

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Home — random quote generator with category grid |
| `/categories` | Browse all 6 categories with quote previews |
| `/categories/[category]` | All quotes in a specific category |
| `/favorites` | Your saved favorite quotes |

## How to Run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```
