"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { decks } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Geography: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Programming: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Science: "bg-red-500/20 text-red-300 border-red-500/30",
  History: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const categories = ["All", ...Array.from(new Set(decks.map((d) => d.category)))];

export default function DecksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return decks.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || d.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Browse Decks</h1>
        <p className="text-white/50">Find the perfect deck to study. Filter by category or search by name.</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search decks…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <div className="text-4xl mb-3">🔍</div>
          <p>No decks match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((deck) => (
            <Link
              key={deck.id}
              href={`/decks/${deck.id}`}
              className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
            >
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${deck.color} rounded-t-2xl`} />
              <div className="flex items-start justify-between mb-3 mt-1">
                <div
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    categoryColors[deck.category] ?? "bg-white/10 text-white/60 border-white/10"
                  }`}
                >
                  {deck.category}
                </div>
                <span className="text-white/30 text-xs">{deck.cards.length} cards</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
                {deck.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{deck.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm text-violet-400 font-medium">
                <span>View deck</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
