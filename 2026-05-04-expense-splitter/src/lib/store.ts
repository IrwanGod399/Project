"use client";

import { Group, Expense, Person, Balance, Settlement } from "./types";

const STORAGE_KEY = "expense-splitter-groups";

const SAMPLE_GROUPS: Group[] = [
  {
    id: "g1",
    name: "Bali Trip 2026",
    description: "5 days in Bali with the squad",
    emoji: "🏖️",
    createdAt: "2026-04-20",
    members: [
      { id: "p1", name: "Alice", color: "#6366f1" },
      { id: "p2", name: "Bob", color: "#f59e0b" },
      { id: "p3", name: "Carol", color: "#10b981" },
      { id: "p4", name: "Dave", color: "#ef4444" },
    ],
    expenses: [
      {
        id: "e1",
        description: "Hotel (3 nights)",
        amount: 480,
        paidById: "p1",
        splitAmong: ["p1", "p2", "p3", "p4"],
        category: "accommodation",
        date: "2026-04-21",
      },
      {
        id: "e2",
        description: "Airport taxi",
        amount: 60,
        paidById: "p2",
        splitAmong: ["p1", "p2", "p3", "p4"],
        category: "transport",
        date: "2026-04-21",
      },
      {
        id: "e3",
        description: "Seafood dinner",
        amount: 145,
        paidById: "p3",
        splitAmong: ["p1", "p2", "p3", "p4"],
        category: "food",
        date: "2026-04-22",
      },
      {
        id: "e4",
        description: "Surfing lesson",
        amount: 200,
        paidById: "p1",
        splitAmong: ["p1", "p2", "p4"],
        category: "entertainment",
        date: "2026-04-23",
      },
      {
        id: "e5",
        description: "Souvenir shopping",
        amount: 90,
        paidById: "p4",
        splitAmong: ["p2", "p3", "p4"],
        category: "shopping",
        date: "2026-04-24",
      },
    ],
  },
  {
    id: "g2",
    name: "Apartment Bills",
    description: "Monthly shared expenses",
    emoji: "🏠",
    createdAt: "2026-01-01",
    members: [
      { id: "p5", name: "Emma", color: "#8b5cf6" },
      { id: "p6", name: "Frank", color: "#06b6d4" },
      { id: "p7", name: "Grace", color: "#f97316" },
    ],
    expenses: [
      {
        id: "e6",
        description: "Electricity bill",
        amount: 120,
        paidById: "p5",
        splitAmong: ["p5", "p6", "p7"],
        category: "utilities",
        date: "2026-04-01",
      },
      {
        id: "e7",
        description: "Internet",
        amount: 75,
        paidById: "p6",
        splitAmong: ["p5", "p6", "p7"],
        category: "utilities",
        date: "2026-04-01",
      },
      {
        id: "e8",
        description: "Groceries",
        amount: 210,
        paidById: "p7",
        splitAmong: ["p5", "p6", "p7"],
        category: "food",
        date: "2026-04-10",
      },
      {
        id: "e9",
        description: "Cleaning supplies",
        amount: 45,
        paidById: "p5",
        splitAmong: ["p5", "p6", "p7"],
        category: "other",
        date: "2026-04-15",
      },
    ],
  },
  {
    id: "g3",
    name: "Friday Game Night",
    description: "Weekly board game evenings",
    emoji: "🎲",
    createdAt: "2026-03-01",
    members: [
      { id: "p8", name: "Henry", color: "#dc2626" },
      { id: "p9", name: "Iris", color: "#16a34a" },
      { id: "p10", name: "Jake", color: "#2563eb" },
    ],
    expenses: [
      {
        id: "e10",
        description: "Board games bundle",
        amount: 130,
        paidById: "p8",
        splitAmong: ["p8", "p9", "p10"],
        category: "entertainment",
        date: "2026-03-07",
      },
      {
        id: "e11",
        description: "Snacks & drinks",
        amount: 55,
        paidById: "p9",
        splitAmong: ["p8", "p9", "p10"],
        category: "food",
        date: "2026-03-07",
      },
      {
        id: "e12",
        description: "Pizza delivery",
        amount: 72,
        paidById: "p10",
        splitAmong: ["p8", "p9", "p10"],
        category: "food",
        date: "2026-03-14",
      },
    ],
  },
];

export function loadGroups(): Group[] {
  if (typeof window === "undefined") return SAMPLE_GROUPS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveGroups(SAMPLE_GROUPS);
      return SAMPLE_GROUPS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_GROUPS;
  }
}

export function saveGroups(groups: Group[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

export function getGroup(groups: Group[], id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}

export function calcBalances(group: Group): Balance[] {
  const totals: Record<string, number> = {};
  group.members.forEach((m) => (totals[m.id] = 0));

  group.expenses.forEach((exp) => {
    const share = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((pid) => {
      totals[pid] = (totals[pid] ?? 0) - share;
    });
    totals[exp.paidById] = (totals[exp.paidById] ?? 0) + exp.amount;
  });

  return Object.entries(totals).map(([personId, amount]) => ({
    personId,
    amount: Math.round(amount * 100) / 100,
  }));
}

export function calcSettlements(balances: Balance[]): Settlement[] {
  const creditors = balances
    .filter((b) => b.amount > 0.01)
    .map((b) => ({ ...b }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = balances
    .filter((b) => b.amount < -0.01)
    .map((b) => ({ ...b }))
    .sort((a, b) => a.amount - b.amount);

  const settlements: Settlement[] = [];
  let ci = 0;
  let di = 0;

  while (ci < creditors.length && di < debtors.length) {
    const credit = creditors[ci];
    const debt = debtors[di];
    const amount = Math.min(credit.amount, -debt.amount);
    settlements.push({
      fromId: debt.personId,
      toId: credit.personId,
      amount: Math.round(amount * 100) / 100,
    });
    credit.amount -= amount;
    debt.amount += amount;
    if (credit.amount < 0.01) ci++;
    if (debt.amount > -0.01) di++;
  }

  return settlements;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const CATEGORY_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  food: { label: "Food & Drink", icon: "🍕", color: "bg-orange-100 text-orange-700" },
  transport: { label: "Transport", icon: "🚗", color: "bg-blue-100 text-blue-700" },
  accommodation: { label: "Accommodation", icon: "🏨", color: "bg-purple-100 text-purple-700" },
  entertainment: { label: "Entertainment", icon: "🎉", color: "bg-pink-100 text-pink-700" },
  shopping: { label: "Shopping", icon: "🛍️", color: "bg-yellow-100 text-yellow-700" },
  utilities: { label: "Utilities", icon: "💡", color: "bg-teal-100 text-teal-700" },
  other: { label: "Other", icon: "📦", color: "bg-gray-100 text-gray-700" },
};
