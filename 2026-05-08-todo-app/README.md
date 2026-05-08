# Taskly – Smart Todo App

A beautiful, feature-rich todo application built with Next.js 15 and Tailwind CSS. Manage your tasks across categories, track priorities, and visualize your productivity through an analytics dashboard.

## Features

- **Task Management** – Add, complete, and delete tasks with titles, descriptions, priorities, due dates, and tags
- **Smart Filtering** – Search tasks by text/tags; filter by status, category, and priority level
- **Categories** – Organize tasks into color-coded categories with custom icons; create your own
- **Analytics** – Visual stats: completion rate ring, breakdowns by priority and category, popular tags
- **Persistent Storage** – All data saved to `localStorage` via Zustand
- **Overdue Detection** – Automatically flags tasks past their due date

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main task list with search, filter, and add modal |
| `/stats` | Analytics dashboard with charts and breakdowns |
| `/categories` | Category management with per-category stats |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with localStorage persistence)
- **Icons**: Lucide React

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
