# Palettify — Color Palette Generator

A beautiful, interactive color palette generator built with Next.js and Tailwind CSS. Generate harmonious color palettes using proven color theory principles, save your favorites, and export them as CSS variables.

## Features

- **7 Harmony Modes**: Random, Complementary, Analogous, Triadic, Tetradic, Monochromatic, and Split-Complementary
- **Interactive Swatches**: Hover to reveal hex/HSL values, click to copy to clipboard
- **Lock Colors**: Lock individual swatches to keep them while regenerating the rest
- **Keyboard Shortcut**: Press `Space` to instantly generate a new palette
- **Save & Manage**: Save favorite palettes to localStorage, view and delete them from the Saved page
- **CSS Export**: Copy any palette as CSS custom property variables (`:root { --color-1: #... }`)
- **Explore Page**: Learn color theory with descriptions, live examples, and a quick-reference table

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** for palette persistence
- No external UI libraries — all icons are inline SVG

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main palette generator with harmony mode selector |
| `/saved` | View, copy, and delete saved palettes |
| `/explore` | Learn about each color harmony type with live examples |

## How to Run

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```
