"use client";

import { useState, useCallback } from "react";
import { quotes, getRandomQuote, categoryMeta } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function HomePage() {
  const [currentQuote, setCurrentQuote] = useState(() => getRandomQuote());
  const [spinning, setSpinning] = useState(false);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNewQuote = useCallback(() => {
    setSpinning(true);
    setTimeout(() => {
      setCurrentQuote((prev) => getRandomQuote(prev.id));
      setKey((k) => k + 1);
      setSpinning(false);
    }, 350);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(`"${currentQuote.text}" — ${currentQuote.author}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }, [currentQuote]);

  const tweetText = encodeURIComponent(
    `"${currentQuote.text}" — ${currentQuote.author} #QuoteVerse`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>✨</span>
          <span>{quotes.length} curated quotes</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Find Your Daily{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Inspiration
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          A curated collection of quotes to spark motivation, wisdom, and creativity in your day.
        </p>
      </div>

      {/* Main Quote */}
      <div key={key} className="mb-6">
        <QuoteCard quote={currentQuote} showCategory />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center mb-14">
        <button
          onClick={handleNewQuote}
          disabled={spinning}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-200 disabled:opacity-70"
        >
          <span className={spinning ? "animate-spin-slow inline-block" : "inline-block"}>🎲</span>
          New Quote
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-200"
        >
          <span>{copied ? "✅" : "📋"}</span>
          {copied ? "Copied!" : "Copy"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${tweetText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-200"
        >
          <span>🐦</span>
          Tweet
        </a>
      </div>

      {/* Category grid */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(
            Object.entries(categoryMeta) as [
              string,
              (typeof categoryMeta)[keyof typeof categoryMeta]
            ][]
          ).map(([cat, meta]) => {
            const count = quotes.filter((q) => q.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 hover:scale-105 hover:shadow-md ${meta.bg}`}
              >
                <span className="text-3xl">{meta.icon}</span>
                <div>
                  <p className={`font-bold text-sm ${meta.color}`}>{meta.label}</p>
                  <p className="text-xs text-gray-400">{count} quotes</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
