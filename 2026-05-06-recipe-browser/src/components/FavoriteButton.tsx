"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "recipe-favorites";

function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function FavoriteButton({ recipeId, recipeTitle }: { recipeId: string; recipeTitle: string }) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFav(getFavorites().includes(recipeId));
  }, [recipeId]);

  function toggle() {
    const favs = getFavorites();
    let next: string[];
    if (favs.includes(recipeId)) {
      next = favs.filter((id) => id !== recipeId);
    } else {
      next = [...favs, recipeId];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsFav(next.includes(recipeId));
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? `Remove ${recipeTitle} from favorites` : `Add ${recipeTitle} to favorites`}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium text-sm transition-all ${
        isFav
          ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
          : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
      }`}
    >
      <span className="text-lg">{isFav ? "❤️" : "🤍"}</span>
      {isFav ? "Saved" : "Save Recipe"}
    </button>
  );
}
