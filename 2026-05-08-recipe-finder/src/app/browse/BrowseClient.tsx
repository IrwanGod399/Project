"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { recipes, categories, categoryEmojis, Category, Difficulty } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

export default function BrowseClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [sortBy, setSortBy] = useState<"rating" | "time" | "calories">("rating");
  const [quickOnly, setQuickOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    if (cat && categories.includes(cat)) setSelectedCategory(cat);
    if (searchParams.get("tag") === "quick") setQuickOnly(true);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...recipes];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.item.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (selectedDifficulty !== "All") {
      result = result.filter((r) => r.difficulty === selectedDifficulty);
    }

    if (quickOnly) {
      result = result.filter((r) => r.prepTime + r.cookTime <= 30);
    }

    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "time") return a.prepTime + a.cookTime - (b.prepTime + b.cookTime);
      return a.calories - b.calories;
    });

    return result;
  }, [query, selectedCategory, selectedDifficulty, sortBy, quickOnly]);

  function clearFilters() {
    setQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setQuickOnly(false);
    router.push("/browse");
  }

  const hasFilters =
    query || selectedCategory !== "All" || selectedDifficulty !== "All" || quickOnly;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Recipes</h1>
        <p className="text-gray-500">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, ingredient, or tag..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-orange-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {categoryEmojis[cat]} {cat}
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-gray-100" />

        {/* Difficulty + Sort + Quick filter row */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500 font-medium">Difficulty:</span>
          {(["All", ...difficulties] as const).map((d) => (
            <button
              key={d}
              onClick={() =>
                setSelectedDifficulty(d === "All" ? "All" : (d as Difficulty))
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedDifficulty === d
                  ? "bg-gray-800 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {d}
            </button>
          ))}

          <span className="ml-2 text-sm text-gray-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs border border-gray-200 rounded-full px-3 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="rating">Top Rated</option>
            <option value="time">Quickest</option>
            <option value="calories">Lowest Cal</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={quickOnly}
              onChange={(e) => setQuickOnly(e.target.checked)}
              className="w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-xs text-gray-600 font-medium">⏱️ Under 30 min</span>
          </label>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-orange-500 hover:text-orange-700 font-medium underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
