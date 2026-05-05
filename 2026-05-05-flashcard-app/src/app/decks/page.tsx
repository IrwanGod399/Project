"use client";

import { useState } from "react";
import Link from "next/link";
import { decks } from "@/lib/data";
import { BookOpen, Search, Play } from "lucide-react";

const categories = ["All", ...Array.from(new Set(decks.map((d) => d.category)))];

export default function DecksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(search.toLowerCase()) ||
      deck.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || deck.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-2 text-4xl font-bold">All Decks</h1>
          <p className="text-slate-400">
            Choose a deck and start studying. Flip cards to reveal answers.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search decks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-slate-500">
          {filtered.length} deck{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Deck grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 py-20 text-center text-slate-500">
            No decks match your search.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filtered.map((deck) => (
              <div
                key={deck.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-slate-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${deck.color} opacity-5 transition group-hover:opacity-10`}
                />
                <div className="relative">
                  {/* Category badge */}
                  <div className="mb-4 flex items-start justify-between">
                    <span className="rounded-full border border-slate-600 px-3 py-0.5 text-xs text-slate-400">
                      {deck.category}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${deck.color}`}
                    >
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <h2 className="mb-1 text-xl font-semibold">{deck.title}</h2>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    {deck.description}
                  </p>

                  {/* Card previews */}
                  <div className="mb-5 space-y-2">
                    {deck.cards.slice(0, 2).map((card) => (
                      <div
                        key={card.id}
                        className="rounded-lg bg-slate-700/40 px-3 py-2 text-xs text-slate-400 line-clamp-1"
                      >
                        Q: {card.question}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      {deck.cards.length} cards
                    </span>
                    <Link
                      href={`/study/${deck.id}`}
                      className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${deck.color} px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95`}
                    >
                      <Play className="h-3.5 w-3.5" /> Study Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
