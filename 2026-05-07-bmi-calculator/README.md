# BMI Calculator

A sleek, interactive Body Mass Index calculator with health insights, history tracking, and a visual gauge — built with Next.js and Tailwind CSS.

## Features

- **Calculator** – Supports both metric (kg/cm) and imperial (lbs/ft·in) units with instant BMI computation
- **Results** – Animated half-circle SVG gauge, category badge, ideal weight range, and personalised health tips
- **History** – Persistent local storage log with summary stats (average, lowest, highest BMI)
- **BMI Info** – Detailed category descriptions, formula reference, and interactive FAQ accordion

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, server & client components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- SVG canvas gauge (no external chart library)
- `localStorage` for client-side persistence

## Getting Started

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Path | Description |
|------|-------------|
| `/` | BMI calculator form |
| `/results` | Detailed results with gauge and health tips |
| `/history` | Saved readings with aggregate stats |
| `/info` | BMI categories, formula reference, and FAQ |
