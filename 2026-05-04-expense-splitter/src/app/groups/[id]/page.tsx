"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Group, Expense, ExpenseCategory } from "@/lib/types";
import {
  loadGroups,
  saveGroups,
  getGroup,
  calcBalances,
  generateId,
  CATEGORY_META,
} from "@/lib/store";

const CATEGORIES: ExpenseCategory[] = [
  "food", "transport", "accommodation", "entertainment", "shopping", "utilities", "other",
];

export default function GroupPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [groups, setGroups] = useState<Group[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Form state
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidById, setPaidById] = useState("");
  const [splitAmong, setSplitAmong] = useState<string[]>([]);
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const loaded = loadGroups();
    setGroups(loaded);
    const g = getGroup(loaded, id);
    if (!g) { router.push("/"); return; }
    setGroup(g);
    setPaidById(g.members[0]?.id ?? "");
    setSplitAmong(g.members.map((m) => m.id));
  }, [id, router]);

  if (!group) return null;

  const balances = calcBalances(group);

  function getMember(pid: string) {
    return group!.members.find((m) => m.id === pid);
  }

  function filteredExpenses(): Expense[] {
    let exps = group!.expenses;
    if (filter !== "all") exps = exps.filter((e) => e.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      exps = exps.filter((e) => e.description.toLowerCase().includes(q));
    }
    return exps.slice().sort((a, b) => b.date.localeCompare(a.date));
  }

  function handleAddExpense() {
    setFormError("");
    if (!desc.trim()) return setFormError("Description is required");
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return setFormError("Enter a valid amount");
    if (!paidById) return setFormError("Select who paid");
    if (splitAmong.length === 0) return setFormError("Select at least one person to split with");

    const newExpense: Expense = {
      id: generateId(),
      description: desc.trim(),
      amount: Math.round(amt * 100) / 100,
      paidById,
      splitAmong,
      category,
      date,
    };

    const updatedGroup = {
      ...group!,
      expenses: [...group!.expenses, newExpense],
    };
    const updatedGroups = groups.map((g) => (g.id === id ? updatedGroup : g));
    setGroups(updatedGroups);
    setGroup(updatedGroup);
    saveGroups(updatedGroups);
    resetForm();
    setShowModal(false);
  }

  function handleDeleteExpense(eid: string) {
    const updatedGroup = {
      ...group!,
      expenses: group!.expenses.filter((e) => e.id !== eid),
    };
    const updatedGroups = groups.map((g) => (g.id === id ? updatedGroup : g));
    setGroups(updatedGroups);
    setGroup(updatedGroup);
    saveGroups(updatedGroups);
  }

  function resetForm() {
    setDesc("");
    setAmount("");
    setPaidById(group?.members[0]?.id ?? "");
    setSplitAmong(group?.members.map((m) => m.id) ?? []);
    setCategory("food");
    setDate(new Date().toISOString().split("T")[0]);
    setFormError("");
  }

  const totalSpent = group.expenses.reduce((s, e) => s + e.amount, 0);
  const displayed = filteredExpenses();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Groups</Link>
        <span>›</span>
        <span className="text-slate-800 font-medium">{group.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 fade-in">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{group.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{group.name}</h1>
              {group.description && <p className="text-slate-500 text-sm mt-0.5">{group.description}</p>}
              <div className="flex items-center gap-1 mt-2">
                {group.members.map((m) => (
                  <div
                    key={m.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ring-2 ring-white"
                    style={{ backgroundColor: m.color }}
                    title={m.name}
                  >
                    {m.name[0].toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-800">${totalSpent.toFixed(2)}</p>
            <p className="text-sm text-slate-500">total spent</p>
          </div>
        </div>

        {/* Balance chips */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          {balances.map((b) => {
            const member = getMember(b.personId);
            if (!member) return null;
            const isPositive = b.amount > 0.01;
            const isNegative = b.amount < -0.01;
            return (
              <div
                key={b.personId}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isPositive ? "bg-green-100 text-green-700" :
                  isNegative ? "bg-red-100 text-red-700" :
                  "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name[0]}
                </span>
                <span>{member.name}</span>
                <span className="font-bold">
                  {isPositive ? "+" : ""}{b.amount.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expenses..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {["all", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
              }`}
            >
              {cat === "all" ? "All" : CATEGORY_META[cat].icon}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 text-sm"
          >
            + Add Expense
          </button>
          <Link
            href={`/groups/${id}/settle`}
            className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 text-sm"
          >
            Settle Up
          </Link>
        </div>
      </div>

      {/* Expense list */}
      {displayed.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
          <div className="text-5xl mb-3">🧾</div>
          <p className="font-medium">No expenses found</p>
          <p className="text-sm mt-1">
            {group.expenses.length === 0 ? "Add your first expense to get started" : "Try a different filter"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((exp, i) => {
            const paidBy = getMember(exp.paidById);
            const catMeta = CATEGORY_META[exp.category];
            const perPerson = exp.amount / exp.splitAmong.length;
            return (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 fade-in hover:shadow-md transition-all"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${catMeta.color}`}>
                  {catMeta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{exp.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: paidBy?.color }}
                    />
                    <p className="text-xs text-slate-500">
                      Paid by <span className="font-medium text-slate-700">{paidBy?.name}</span>
                      {" · "}{exp.splitAmong.length} people · ${perPerson.toFixed(2)}/each
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{exp.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg text-slate-800">${exp.amount.toFixed(2)}</p>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">Add Expense</h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="e.g. Dinner at Nobu"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($) *</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <div className="grid grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-all ${
                          category === cat
                            ? "bg-indigo-100 ring-2 ring-indigo-500"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        <span className="text-lg">{CATEGORY_META[cat].icon}</span>
                        <span className="text-slate-600 leading-tight text-center">
                          {CATEGORY_META[cat].label.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Paid by *</label>
                  <div className="flex flex-wrap gap-2">
                    {group.members.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaidById(m.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          paidById === m.id
                            ? "ring-2 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                        style={paidById === m.id ? { backgroundColor: m.color } : {}}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Split among *</label>
                  <div className="flex flex-wrap gap-2">
                    {group.members.map((m) => {
                      const selected = splitAmong.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          onClick={() =>
                            setSplitAmong(
                              selected
                                ? splitAmong.filter((x) => x !== m.id)
                                : [...splitAmong, m.id]
                            )
                          }
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                            selected
                              ? "text-white border-transparent"
                              : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                          }`}
                          style={selected ? { backgroundColor: m.color, borderColor: m.color } : {}}
                        >
                          {selected && <span>✓</span>}
                          {m.name}
                        </button>
                      );
                    })}
                  </div>
                  {splitAmong.length > 0 && amount && !isNaN(parseFloat(amount)) && (
                    <p className="text-xs text-slate-500 mt-2">
                      ${(parseFloat(amount) / splitAmong.length).toFixed(2)} per person
                    </p>
                  )}
                </div>

                {formError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
                )}

                <button
                  onClick={handleAddExpense}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
