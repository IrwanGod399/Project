# 🍽️ RecipeFinder

A beautiful recipe discovery app where you can explore, search, and save your favourite recipes — complete with step-by-step interactive cooking mode.

## Features

- **Home page** — hero banner, category grid, featured + top-rated recipe sections
- **Browse page** — real-time search by name, ingredient, or tag; filter by category, difficulty, and cook time; sort by rating, speed, or calories
- **Recipe detail page** — interactive ingredient checklist with serving-size scaler, step-by-step cooking tracker with progress bar, pro tips, and related recipes
- **Favorites page** — save recipes with the heart button; persisted in localStorage
- 12 real, detailed recipes across 6 categories: Breakfast, Lunch, Dinner, Dessert, Snack, Drinks

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 16** (App Router) | React framework with file-based routing |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **localStorage** | Client-side favorites persistence |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── browse/
│   │   ├── page.tsx          # Browse page (Suspense wrapper)
│   │   └── BrowseClient.tsx  # Interactive search & filter UI
│   ├── recipe/[id]/
│   │   └── page.tsx          # Recipe detail with cooking mode
│   └── favorites/
│       └── page.tsx          # Saved favorites
├── components/
│   ├── Navbar.tsx            # Sticky navigation
│   └── RecipeCard.tsx        # Recipe summary card
└── lib/
    └── data.ts               # Recipe data & helper functions
```
