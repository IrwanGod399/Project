"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { Category, CATEGORY_COLORS } from "@/lib/types";

interface CategoryStat {
  category: Category;
  amount: number;
  count: number;
  percentage: number;
}

export default function AnalyticsPage() {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const expenseByCategory = useMemo<CategoryStat[]>(() => {
    const map = new Map<Category, { amount: number; count: number }>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const prev = map.get(t.category) ?? { amount: 0, count: 0 };
        map.set(t.category, { amount: prev.amount + t.amount, count: prev.count + 1 });
      });
    return Array.from(map.entries())
      .map(([category, { amount, count }]) => ({
        category,
        amount,
        count,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, totalExpenses]);

  const incomeByCategory = useMemo<CategoryStat[]>(() => {
    const map = new Map<Category, { amount: number; count: number }>();
    transactions
      .filter((t) => t.type === "income")
      .forEach((t) => {
        const prev = map.get(t.category) ?? { amount: 0, count: 0 };
        map.set(t.category, { amount: prev.amount + t.amount, count: prev.count + 1 });
      });
    return Array.from(map.entries())
      .map(([category, { amount, count }]) => ({
        category,
        amount,
        count,
        percentage: totalIncome > 0 ? (amount / totalIncome) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, totalIncome]);

  const balance = totalIncome - totalExpenses;
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Detailed breakdown of your spending and income</p>
      </div>

      {/* Overview bars */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold text-lg mb-5">Income vs Expenses</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Income</span>
              <span className="text-emerald-400 font-semibold">{fmt(totalIncome)}</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${totalIncome > 0 ? 100 : 0}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Expenses</span>
              <span className="text-red-400 font-semibold">{fmt(totalExpenses)}</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-700"
                style={{ width: `${totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Net Savings</span>
              <span className={`font-semibold ${balance >= 0 ? "text-indigo-400" : "text-red-400"}`}>
                {balance < 0 ? "-" : ""}{fmt(Math.abs(balance))}
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${balance >= 0 ? "bg-indigo-500" : "bg-red-500"}`}
                style={{
                  width: `${totalIncome > 0 ? Math.min((Math.abs(balance) / totalIncome) * 100, 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expenses by category */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5">Expenses by Category</h2>
          {expenseByCategory.length === 0 ? (
            <p className="text-gray-500 text-sm">No expense data yet</p>
          ) : (
            <div className="space-y-4">
              {expenseByCategory.map(({ category, amount, count, percentage }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[category] }}
                      />
                      <span className="text-gray-300 text-sm">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-semibold">{fmt(amount)}</span>
                      <span className="text-gray-500 text-xs ml-2">({count}x)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: CATEGORY_COLORS[category],
                      }}
                    />
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5 text-right">{percentage.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Income by category */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5">Income by Category</h2>
          {incomeByCategory.length === 0 ? (
            <p className="text-gray-500 text-sm">No income data yet</p>
          ) : (
            <div className="space-y-4">
              {incomeByCategory.map(({ category, amount, count, percentage }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[category] }}
                      />
                      <span className="text-gray-300 text-sm">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-semibold">{fmt(amount)}</span>
                      <span className="text-gray-500 text-xs ml-2">({count}x)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: CATEGORY_COLORS[category],
                      }}
                    />
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5 text-right">{percentage.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top expense */}
      {expenseByCategory.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Biggest Expense Category</p>
              <p className="text-white font-semibold">{expenseByCategory[0].category}</p>
              <p className="text-red-400 text-sm">{fmt(expenseByCategory[0].amount)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Avg Transaction</p>
              <p className="text-white font-semibold">
                {fmt(totalExpenses / (transactions.filter(t => t.type === "expense").length || 1))}
              </p>
              <p className="text-gray-400 text-sm">per expense</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Categories Used</p>
              <p className="text-white font-semibold">{expenseByCategory.length}</p>
              <p className="text-gray-400 text-sm">expense categories</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
