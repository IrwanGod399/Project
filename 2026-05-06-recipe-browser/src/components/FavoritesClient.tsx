"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { recipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

const STORAGE_KEY = "recipe-favorites";

function getFavoriteIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function FavoritesClient() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavoriteIds(getFavoriteIds());
  }, []);

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setFavoriteIds([]);
  }

  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id));

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-8 w-48 bg-orange-100 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-orange-50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites ❤️</h1>
          <p className="text-gray-500 mt-1">
            {favoriteRecipes.length} saved recipe{favoriteRecipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        {favoriteRecipes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-red-400 hover:text-red-600 transition-colors border border-red-200 px-4 py-2 rounded-full hover:bg-red-50"
          >
            Clear all
          </button>
        )}
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-6">
            Browse recipes and tap the heart icon to save them here.
          </p>
          <Link
            href="/browse"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
}
