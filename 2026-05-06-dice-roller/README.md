# 🎲 Dice Roller

A modern, animated dice rolling app built with Next.js and Tailwind CSS. Roll any polyhedral die, track your roll history with statistics, and learn 6 classic dice games.

## Features

- **Roll any die**: d4, d6, d8, d10, d12, d20, d100
- **Multiple dice + modifiers**: roll up to 12 dice at once with +/− modifiers
- **Animated dice faces**: realistic SVG d6 dot patterns and polygon shapes for other dice
- **Roll history**: persisted in localStorage with timestamps and filtering
- **Statistics**: average, highest, lowest, and d6 face-distribution charts
- **Games Guide**: full rules and pro tips for Yahtzee, Craps, Farkle, D&D, Liar's Dice, and Zombie Dice
- **Quick presets**: 1d6, 2d6, 1d20, 4d6 (ability score), and more

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, server & client components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- localStorage for persistent roll history

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Description |
|------|-------------|
| `/` | Main dice roller with animations |
| `/history` | Roll history & statistics |
| `/games` | Classic dice games guide |
