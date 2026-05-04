"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Group, Settlement } from "@/lib/types";
import { loadGroups, getGroup, calcBalances, calcSettlements } from "@/lib/store";

export default function SettlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [group, setGroup] = useState<Group | null>(null);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [settled, setSettled] = useState<Set<string>>(new Set());

  useEffect(() => {
    const groups = loadGroups();
    const g = getGroup(groups, id);
    if (!g) { router.push("/"); return; }
    setGroup(g);
    const balances = calcBalances(g);
    setSettlements(calcSettlements(balances));
  }, [id, router]);

  if (!group) return null;

  function getMember(pid: string) {
    return group!.members.find((m) => m.id === pid);
  }

  function toggleSettled(key: string) {
    setSettled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const balances = calcBalances(group);
  const totalSpent = group.expenses.reduce((s, e) => s + e.amount, 0);
  const perPerson = totalSpent / group.members.length;

  const settledCount = settled.size;
  const progress = settlements.length > 0 ? (settledCount / settlements.length) * 100 : 100;
  const allSettled = settlements.length === 0 || settledCount === settlements.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Groups</Link>
        <span>›</span>
        <Link href={`/groups/${id}`} className="hover:text-indigo-600 transition-colors">{group.name}</Link>
        <span>›</span>
        <span className="text-slate-800 font-medium">Settle Up</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 fade-in">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{group.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Settle Up</h1>
            <p className="text-slate-500 text-sm">{group.name}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-800">${totalSpent.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-0.5">Total Spent</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-800">${perPerson.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-0.5">Per Person (avg)</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-800">{group.expenses.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Expenses</p>
          </div>
        </div>

        {/* Progress */}
        {settlements.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-slate-600 font-medium">Settlement progress</span>
              <span className="text-slate-500">{settledCount}/{settlements.length} done</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Balances */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-5 fade-in">
        <h2 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Individual Balances</h2>
        <div className="space-y-2">
          {balances.map((b) => {
            const member = getMember(b.personId);
            if (!member) return null;
            const isPositive = b.amount > 0.01;
            const isNegative = b.amount < -0.01;
            const width = Math.abs(b.amount / Math.max(...balances.map((x) => Math.abs(x.amount)))) * 100;
            return (
              <div key={b.personId} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{member.name}</span>
                    <span className={`font-bold ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-slate-400"}`}>
                      {isPositive ? "+" : ""}{b.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isPositive ? "bg-green-400" : isNegative ? "bg-red-400" : "bg-slate-300"}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isPositive ? "is owed money" : isNegative ? "owes money" : "all settled"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settlements */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-5 fade-in">
        <h2 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Payments to Make</h2>
        {settlements.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <div className="text-5xl mb-2">🎉</div>
            <p className="font-medium text-slate-600">Everyone is settled up!</p>
            <p className="text-sm mt-1">No payments needed</p>
          </div>
        ) : (
          <div className="space-y-3">
            {settlements.map((s, i) => {
              const from = getMember(s.fromId);
              const to = getMember(s.toId);
              const key = `${s.fromId}-${s.toId}-${i}`;
              const done = settled.has(key);
              return (
                <div
                  key={key}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    done
                      ? "border-green-200 bg-green-50"
                      : "border-slate-100 bg-slate-50 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: from?.color }}
                    >
                      {from?.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${done ? "line-through text-slate-400" : "text-slate-800"}`}>
                        <span className="font-bold">{from?.name}</span>
                        <span className="text-slate-500 mx-1">pays</span>
                        <span className="font-bold">{to?.name}</span>
                      </p>
                      <p className={`text-lg font-bold ${done ? "text-green-500" : "text-slate-800"}`}>
                        ${s.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: to?.color }}
                      >
                        {to?.name[0]}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSettled(key)}
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                      done
                        ? "bg-green-500 text-white scale-105"
                        : "bg-white border-2 border-slate-300 text-slate-300 hover:border-green-400 hover:text-green-400"
                    }`}
                  >
                    ✓
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* All settled celebration */}
      {allSettled && settlements.length > 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center fade-in">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-green-700">All payments marked!</h3>
          <p className="text-green-600 text-sm mt-1">Great job settling up with your group</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href={`/groups/${id}`}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← Back to expenses
        </Link>
      </div>
    </div>
  );
}
