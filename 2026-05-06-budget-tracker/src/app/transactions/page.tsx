"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import TransactionItem from "@/components/TransactionItem";
import AddTransactionModal from "@/components/AddTransactionModal";
import { TransactionType, Category, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/types";

const ALL_CATEGORIES = ["All", ...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES.filter(c => c !== "Other"), "Other"] as const;

export default function TransactionsPage() {
  const { transactions } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (typeFilter !== "all") result = result.filter((t) => t.type === typeFilter);
    if (categoryFilter !== "All") result = result.filter((t) => t.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.amount - a.amount;
    });

    return result;
  }, [transactions, typeFilter, categoryFilter, search, sortBy]);

  const totalFiltered = filtered.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Transactions</h1>
            <p className="text-gray-400 mt-1">{filtered.length} of {transactions.length} transactions</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Type filter */}
            <div className="flex rounded-xl bg-gray-800 p-1 gap-1">
              {(["all", "income", "expense"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                    typeFilter === t
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
              className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary row */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Showing</p>
              <p className="text-white font-bold">{filtered.length}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Income</p>
              <p className="text-emerald-400 font-bold">${totalFiltered.income.toLocaleString()}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Expenses</p>
              <p className="text-red-400 font-bold">${totalFiltered.expense.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No transactions found</p>
              <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map((t) => <TransactionItem key={t.id} transaction={t} />)
          )}
        </div>
      </div>
    </>
  );
}
