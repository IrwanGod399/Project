"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Transaction } from "./types";

const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "income", amount: 4500, category: "Salary", description: "Monthly salary", date: "2026-05-01" },
  { id: "2", type: "expense", amount: 1200, category: "Housing", description: "Rent payment", date: "2026-05-02" },
  { id: "3", type: "expense", amount: 85, category: "Food & Dining", description: "Grocery shopping", date: "2026-05-03" },
  { id: "4", type: "expense", amount: 45, category: "Transport", description: "Monthly bus pass", date: "2026-05-03" },
  { id: "5", type: "income", amount: 750, category: "Freelance", description: "Web design project", date: "2026-05-04" },
  { id: "6", type: "expense", amount: 120, category: "Entertainment", description: "Concert tickets", date: "2026-05-04" },
  { id: "7", type: "expense", amount: 60, category: "Utilities", description: "Electricity bill", date: "2026-05-05" },
  { id: "8", type: "expense", amount: 200, category: "Healthcare", description: "Doctor visit", date: "2026-05-05" },
  { id: "9", type: "expense", amount: 340, category: "Shopping", description: "New shoes and clothes", date: "2026-05-06" },
  { id: "10", type: "income", amount: 200, category: "Investment", description: "Dividend payout", date: "2026-04-28" },
  { id: "11", type: "expense", amount: 95, category: "Food & Dining", description: "Restaurant dinner", date: "2026-04-27" },
  { id: "12", type: "expense", amount: 150, category: "Education", description: "Online course", date: "2026-04-25" },
  { id: "13", type: "expense", amount: 30, category: "Food & Dining", description: "Coffee shop", date: "2026-04-24" },
  { id: "14", type: "income", amount: 300, category: "Freelance", description: "Logo design gig", date: "2026-04-22" },
  { id: "15", type: "expense", amount: 75, category: "Transport", description: "Taxi rides", date: "2026-04-20" },
];

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "LOAD_TRANSACTIONS"; payload: Transaction[] };

function reducer(state: Transaction[], action: Action): Transaction[] {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [action.payload, ...state];
    case "DELETE_TRANSACTION":
      return state.filter((t) => t.id !== action.payload);
    case "LOAD_TRANSACTIONS":
      return action.payload;
    default:
      return state;
  }
}

interface StoreContextType {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [transactions, dispatch] = useReducer(reducer, SAMPLE_TRANSACTIONS);

  useEffect(() => {
    const saved = localStorage.getItem("budget-transactions");
    if (saved) {
      dispatch({ type: "LOAD_TRANSACTIONS", payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget-transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Transaction) =>
    dispatch({ type: "ADD_TRANSACTION", payload: t });

  const deleteTransaction = (id: string) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  return (
    <StoreContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
