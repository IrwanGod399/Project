# RecipeBrowse 🍳

A clean, interactive recipe browser built with Next.js App Router and Tailwind CSS. Discover recipes from around the world, filter by category, search by ingredient, and save your favorites — all with no backend required.

## Features

- **Home page** with hero search, featured recipes, quick-meal section, and stats
- **Browse page** with real-time category filtering and keyword search (by title, ingredient, cuisine, or tag)
- **Recipe detail page** with ingredients list, step-by-step instructions, metadata (time, servings, calories), and tag links
- **Favorites page** powered by localStorage — save and revisit your favorite recipes
- 12 real sample recipes across 6 categories and 7 cuisines

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, SSG, Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- No database — data lives in `src/lib/recipes.ts`

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
│   ├── page.tsx          # Home
│   ├── browse/page.tsx   # Browse & search
│   ├── recipe/[id]/      # Recipe detail (SSG)
│   └── favorites/        # Saved favorites
├── components/
│   ├── Navbar.tsx
│   ├── RecipeCard.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── FavoriteButton.tsx
│   └── FavoritesClient.tsx
└── lib/
    └── recipes.ts        # All recipe data + search logic
```
