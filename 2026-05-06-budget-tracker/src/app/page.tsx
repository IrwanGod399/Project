"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import TransactionItem from "@/components/TransactionItem";
import AddTransactionModal from "@/components/AddTransactionModal";
import Link from "next/link";

export default function DashboardPage() {
  const { transactions } = useStore();
  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : "0";

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Your financial overview for May 2026</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Transaction
          </button>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full" />
            <div className="absolute -bottom-16 -left-8 w-64 h-64 bg-white rounded-full" />
          </div>
          <p className="text-indigo-200 text-sm font-medium relative">Total Balance</p>
          <p className={`text-5xl font-bold mt-2 relative ${balance >= 0 ? "text-white" : "text-red-300"}`}>
            {balance < 0 ? "-" : ""}{fmt(Math.abs(balance))}
          </p>
          <p className="text-indigo-200 text-sm mt-3 relative">
            Savings rate: <span className="text-white font-semibold">{savingsRate}%</span> of income saved
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">Total Income</p>
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{fmt(totalIncome)}</p>
            <p className="text-gray-500 text-xs mt-1">{transactions.filter(t => t.type === "income").length} transactions</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-red-400">{fmt(totalExpenses)}</p>
            <p className="text-gray-500 text-xs mt-1">{transactions.filter(t => t.type === "expense").length} transactions</p>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Recent Transactions</h2>
            <Link
              href="/transactions"
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {recent.map((t) => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
