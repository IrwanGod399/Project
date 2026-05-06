"use client";

import Link from "next/link";
import type { Category } from "@/lib/recipes";

const categoryEmoji: Record<string, string> = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Dessert: "🍰",
  Snack: "🥨",
  Drink: "🥤",
};

interface Props {
  categories: Category[];
  active?: Category;
  query: string;
}

export default function CategoryFilter({ categories, active, query }: Props) {
  function buildHref(cat?: Category) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (cat) params.set("category", cat);
    const qs = params.toString();
    return `/browse${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref()}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
          !active
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={buildHref(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            active === cat
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
          }`}
        >
          {categoryEmoji[cat]} {cat}
        </Link>
      ))}
    </div>
  );
}
