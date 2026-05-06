# MarkdownFlow — Live Markdown Previewer

A fast, beautiful, in-browser Markdown editor with live preview, a template library, and one-click export. No sign-up required.

## Features

- **Real-time split-pane preview** — See formatted output as you type
- **3 view modes** — Split, Editor-only, or Preview-only
- **Quick-insert toolbar** — Bold, italic, code, links, and more with one click
- **Template library** — 6 professional templates (README, blog post, meeting notes, API docs, weekly review, changelog)
- **Export options** — Copy raw Markdown or rendered HTML to clipboard
- **Live stats** — Word count, character count, line count, estimated reading time
- **Dark-mode UI** — Sleek dark theme with syntax-highlighted code blocks

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [React 19](https://react.dev/) — UI framework
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown (tables, strikethrough, task lists)
- TypeScript — Type safety

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature highlights and live demo preview |
| `/editor` | Full-featured Markdown editor with live preview |
| `/templates` | Searchable and filterable template library |

## Getting Started

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Go to `/editor` to start writing Markdown
2. Use the toolbar to switch between Split / Edit / Preview modes
3. Browse `/templates` to pick a starter template — it opens directly in the editor
4. Copy your Markdown or rendered HTML with the export buttons
