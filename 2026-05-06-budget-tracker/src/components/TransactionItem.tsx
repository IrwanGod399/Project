"use client";

import { Transaction, CATEGORY_COLORS } from "@/lib/types";
import { useStore } from "@/lib/store";

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction: t }: Props) {
  const { deleteTransaction } = useStore();
  const color = CATEGORY_COLORS[t.category];

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors group">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + "22", border: `1px solid ${color}44` }}
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{t.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: color + "22", color }}
          >
            {t.category}
          </span>
          <span className="text-gray-500 text-xs">{t.date}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`font-bold text-lg ${
            t.type === "income" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <button
          onClick={() => deleteTransaction(t.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
