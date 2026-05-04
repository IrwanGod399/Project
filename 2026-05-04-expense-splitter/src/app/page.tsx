"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Group } from "@/lib/types";
import { loadGroups, saveGroups, generateId, calcBalances } from "@/lib/store";

const GROUP_EMOJIS = ["🏖️", "🏠", "🎲", "🍕", "✈️", "🎉", "🏕️", "🎸", "⚽", "🎓"];
const MEMBER_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#dc2626"];

export default function HomePage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(GROUP_EMOJIS[0]);
  const [memberNames, setMemberNames] = useState(["", ""]);
  const [error, setError] = useState("");

  useEffect(() => {
    setGroups(loadGroups());
  }, []);

  function getTotalExpenses(group: Group) {
    return group.expenses.reduce((s, e) => s + e.amount, 0);
  }

  function getMaxOwed(group: Group) {
    const balances = calcBalances(group);
    const maxOwed = Math.max(...balances.map((b) => Math.abs(b.amount)));
    return maxOwed > 0.01 ? maxOwed : null;
  }

  function handleCreateGroup() {
    setError("");
    if (!groupName.trim()) return setError("Group name is required");
    const validMembers = memberNames.filter((n) => n.trim());
    if (validMembers.length < 2) return setError("Add at least 2 members");

    const newGroup: Group = {
      id: generateId(),
      name: groupName.trim(),
      description: groupDesc.trim(),
      emoji: selectedEmoji,
      createdAt: new Date().toISOString().split("T")[0],
      members: validMembers.map((name, i) => ({
        id: generateId(),
        name: name.trim(),
        color: MEMBER_COLORS[i % MEMBER_COLORS.length],
      })),
      expenses: [],
    };

    const updated = [newGroup, ...groups];
    setGroups(updated);
    saveGroups(updated);
    setShowModal(false);
    resetForm();
  }

  function resetForm() {
    setGroupName("");
    setGroupDesc("");
    setSelectedEmoji(GROUP_EMOJIS[0]);
    setMemberNames(["", ""]);
    setError("");
  }

  function handleDeleteGroup(id: string) {
    if (!confirm("Delete this group and all its expenses?")) return;
    const updated = groups.filter((g) => g.id !== id);
    setGroups(updated);
    saveGroups(updated);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10 fade-in">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Groups</h1>
        <p className="text-slate-500 mb-6">Track shared expenses and settle up easily</p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          <span className="text-xl">+</span> New Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-6xl mb-4">💸</div>
          <p className="text-xl font-medium">No groups yet</p>
          <p className="text-sm mt-1">Create your first group to start splitting expenses</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => {
            const total = getTotalExpenses(group);
            const maxOwed = getMaxOwed(group);
            return (
              <div
                key={group.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Link href={`/groups/${group.id}`} className="block p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{group.emoji}</span>
                    <span className="text-xs text-slate-400 mt-1">{group.createdAt}</span>
                  </div>
                  <h2 className="font-bold text-lg text-slate-800 mb-1 leading-tight">{group.name}</h2>
                  {group.description && (
                    <p className="text-sm text-slate-500 mb-3 line-clamp-1">{group.description}</p>
                  )}
                  <div className="flex items-center gap-1 mb-4">
                    {group.members.slice(0, 5).map((m) => (
                      <div
                        key={m.id}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
                        style={{ backgroundColor: m.color }}
                        title={m.name}
                      >
                        {m.name[0].toUpperCase()}
                      </div>
                    ))}
                    {group.members.length > 5 && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600 font-medium ring-2 ring-white">
                        +{group.members.length - 5}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{group.expenses.length} expenses</span>
                    <span className="font-bold text-slate-700">${total.toFixed(2)}</span>
                  </div>
                  {maxOwed && (
                    <div className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1">
                      Max owed: ${maxOwed.toFixed(2)}
                    </div>
                  )}
                </Link>
                <div className="border-t border-slate-100 px-5 py-2">
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Delete group
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">Create New Group</h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Group icon</label>
                  <div className="flex flex-wrap gap-2">
                    {GROUP_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-10 h-10 text-xl rounded-lg transition-all ${
                          selectedEmoji === emoji
                            ? "bg-indigo-100 ring-2 ring-indigo-500 scale-110"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Group name *</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g. Bali Trip 2026"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={groupDesc}
                    onChange={(e) => setGroupDesc(e.target.value)}
                    placeholder="Optional description"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Members *</label>
                  <div className="space-y-2">
                    {memberNames.map((name, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ backgroundColor: MEMBER_COLORS[i % MEMBER_COLORS.length] }}
                        >
                          {name ? name[0].toUpperCase() : (i + 1)}
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            const updated = [...memberNames];
                            updated[i] = e.target.value;
                            setMemberNames(updated);
                          }}
                          placeholder={`Member ${i + 1} name`}
                          className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {memberNames.length > 2 && (
                          <button
                            onClick={() => setMemberNames(memberNames.filter((_, j) => j !== i))}
                            className="text-red-400 hover:text-red-600 px-1 text-xl transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {memberNames.length < 8 && (
                      <button
                        onClick={() => setMemberNames([...memberNames, ""])}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
                      >
                        + Add member
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  onClick={handleCreateGroup}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
