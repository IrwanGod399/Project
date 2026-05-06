# BudgetWise – Personal Budget Tracker

A clean, dark-themed personal finance tracker built with Next.js and Tailwind CSS.

## Features

- **Dashboard** – Balance overview, savings rate, income/expense summary cards, and recent transactions
- **Transactions** – Full transaction list with live search, type/category filtering, and sort by date or amount
- **Analytics** – Visual bar charts showing spending by category, income breakdown, and financial insights
- **Add/Delete** – Modal form to add new income or expense transactions; hover-to-delete on any item
- **Persistent storage** – Transactions saved to `localStorage` so data survives page refreshes

## Tech Stack

- [Next.js 15](https://nextjs.org/) – App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- React `useReducer` + Context API for state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
