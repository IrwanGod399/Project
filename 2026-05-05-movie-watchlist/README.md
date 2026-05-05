# CineList – Movie Watchlist

A sleek, dark-themed movie watchlist app to track films you want to watch, are currently watching, or have already seen.

## Features

- **Browse** 12 curated movies with search by title/director and genre + sort filters
- **Movie Detail** page with full cast, synopsis, and personal tracking (status, rating 1-10, notes)
- **Watchlist** page with status tabs (Want to Watch / Watching / Watched) and quick status switching
- **Stats** page with genre breakdown bar charts, total runtime, average personal rating, and top-rated picks
- All data persisted in `localStorage` — no backend needed

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Local Storage for persistence

## Routes

| Route | Description |
|---|---|
| `/` | Browse & search all movies |
| `/movie/[id]` | Movie detail + personal tracking |
| `/watchlist` | Your tracked movies by status |
| `/stats` | Viewing stats and genre insights |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
