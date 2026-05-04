export interface Person {
  id: string;
  name: string;
  color: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidById: string;
  splitAmong: string[];
  category: ExpenseCategory;
  date: string;
}

export type ExpenseCategory =
  | "food"
  | "transport"
  | "accommodation"
  | "entertainment"
  | "shopping"
  | "utilities"
  | "other";

export interface Group {
  id: string;
  name: string;
  description: string;
  emoji: string;
  members: Person[];
  expenses: Expense[];
  createdAt: string;
}

export interface Balance {
  personId: string;
  amount: number; // positive = owed to this person, negative = owes others
}

export interface Settlement {
  fromId: string;
  toId: string;
  amount: number;
}
