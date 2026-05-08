"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecipeById, Recipe } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    const found = ids.map(getRecipeById).filter(Boolean) as Recipe[];
    setFavorites(found);
    setLoaded(true);
  }, []);

  function clearFavorites() {
    localStorage.removeItem("favorites");
    setFavorites([]);
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-4xl animate-spin">🌀</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Favorites</h1>
          <p className="text-gray-500">
            {favorites.length} saved recipe{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="text-sm text-red-400 hover:text-red-600 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-32">
          <div className="text-7xl mb-6">🤍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Open a recipe and tap the heart icon to save it here for quick access.
          </p>
          <Link
            href="/browse"
            className="inline-block bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/browse"
              className="inline-block border border-orange-300 text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors"
            >
              Discover More Recipes →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
