# 💸 SplitWise Lite — Expense Splitter

A clean, interactive expense-splitting app for groups — track shared costs, see who owes whom, and settle up with minimal fuss.

## Features

- **Multiple groups** — create groups for trips, apartments, game nights, etc.
- **Add expenses** — log costs with category, payer, and custom split among any subset of members
- **Live balance tracking** — see instantly who is owed money and who owes
- **Smart settlements** — minimal-transaction algorithm to settle debts with the fewest payments
- **Search & filter** — filter expenses by category or search by description
- **Persistent storage** — all data saved to localStorage; sample data included on first load
- **Settlement tracking** — mark individual payments as done with a progress bar

## Routes

| Route | Description |
|-------|-------------|
| `/` | Groups dashboard — view, create, and delete groups |
| `/groups/[id]` | Group detail — expenses list, balances, add/remove expenses |
| `/groups/[id]/settle` | Settle up — payment plan, individual balances, mark-as-paid |

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** for persistence (no backend needed)

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Sample data (3 groups with real expenses) is pre-loaded automatically on first visit.
