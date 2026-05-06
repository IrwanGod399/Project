"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/browse");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg mx-auto w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes, ingredients, cuisine..."
        className="flex-1 px-5 py-3.5 rounded-full border border-orange-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-full shadow-sm transition-colors"
      >
        Search
      </button>
    </form>
  );
}
