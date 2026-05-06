export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Food & Dining"
  | "Housing"
  | "Transport"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Utilities"
  | "Education"
  | "Other";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export const INCOME_CATEGORIES: Category[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const EXPENSE_CATEGORIES: Category[] = [
  "Food & Dining",
  "Housing",
  "Transport",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Utilities",
  "Education",
  "Other",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: "#6366f1",
  Freelance: "#8b5cf6",
  Investment: "#a855f7",
  "Food & Dining": "#f59e0b",
  Housing: "#ef4444",
  Transport: "#3b82f6",
  Entertainment: "#ec4899",
  Healthcare: "#10b981",
  Shopping: "#f97316",
  Utilities: "#14b8a6",
  Education: "#06b6d4",
  Other: "#6b7280",
};
