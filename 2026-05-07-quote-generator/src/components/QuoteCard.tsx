"use client";

import { Quote, categoryMeta } from "@/lib/quotes";
import { useFavorites } from "@/hooks/useFavorites";

interface QuoteCardProps {
  quote: Quote;
  showCategory?: boolean;
  animationDelay?: number;
}

export default function QuoteCard({
  quote,
  showCategory = true,
  animationDelay = 0,
}: QuoteCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const meta = categoryMeta[quote.category];
  const favorited = isFavorite(quote.id);

  return (
    <div
      className="animate-fade-in-up bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl text-purple-200 font-serif leading-none select-none">"</span>
        <button
          onClick={() => toggleFavorite(quote.id)}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            favorited
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-400"
          }`}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      <p className="text-gray-800 text-lg leading-relaxed font-medium -mt-4">
        {quote.text}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <span className="text-sm text-gray-500 font-medium">— {quote.author}</span>
        {showCategory && (
          <span
            className={`text-xs px-3 py-1 rounded-full border font-medium ${meta.bg} ${meta.color}`}
          >
            {meta.icon} {meta.label}
          </span>
        )}
      </div>
    </div>
  );
}
