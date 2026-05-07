"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { quotes } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteQuotes = quotes.filter((q) => favorites.includes(q.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>❤️</span>
          <span>{favoriteQuotes.length} saved</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Favorites</h1>
        <p className="text-gray-500">Quotes you&apos;ve saved to revisit</p>
      </div>

      {favoriteQuotes.length === 0 ? (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-6">
            Click the heart icon on any quote to save it here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            🎲 Discover Quotes
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {favoriteQuotes.map((quote, i) => (
            <QuoteCard key={quote.id} quote={quote} showCategory animationDelay={i * 60} />
          ))}
        </div>
      )}
    </div>
  );
}
