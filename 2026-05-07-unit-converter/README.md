# ⚡ UnitFlow — Universal Unit Converter

A fast, clean, and comprehensive unit conversion tool built with Next.js and Tailwind CSS. Convert between any units instantly across 8 categories and 50+ units.

## Features

- **8 Categories**: Length, Weight, Temperature, Volume, Speed, Area, Data, Pressure
- **50+ Units** with precise conversion formulas
- **Instant bidirectional conversion** — type in either field
- **All-values table** — see every unit result at once, click to select
- **Conversion history** with category filtering and persistence via localStorage
- **Copy to clipboard** for quick sharing
- **Dark mode UI** with glassmorphism design
- 3 pages: Home (category grid), Converter, History, About

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- React Hooks (`useState`, `useEffect`, `useCallback`)
- `localStorage` for history persistence

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
│   ├── page.tsx                  # Home — category grid
│   ├── layout.tsx                # Root layout with Navbar
│   ├── globals.css               # Global styles & animations
│   ├── convert/[category]/
│   │   ├── page.tsx              # Server component (SSG)
│   │   └── ConverterClient.tsx   # Interactive converter UI
│   ├── history/page.tsx          # Saved conversions
│   └── about/page.tsx            # About & features page
├── components/
│   └── Navbar.tsx
└── lib/
    └── conversions.ts            # Unit definitions & conversion logic
```
