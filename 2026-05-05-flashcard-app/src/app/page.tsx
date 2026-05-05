"use client";

import Link from "next/link";
import { decks } from "@/lib/data";
import { BookOpen, Brain, Trophy, ArrowRight, Layers } from "lucide-react";

export default function HomePage() {
  const totalCards = decks.reduce((sum, d) => sum + d.cards.length, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Brain className="h-4 w-4" /> Smart Flashcard Learning
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            Master Anything with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FlashMind
            </span>
          </h1>
          <p className="mb-10 text-lg text-slate-400">
            Accelerate your learning with interactive flashcard decks. Flip
            cards, track progress, and build lasting memory across any subject.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/decks"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500 active:scale-95"
            >
              Browse Decks <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/study/${decks[0].id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-semibold transition hover:border-slate-400 active:scale-95"
            >
              Quick Study
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur">
          {[
            { icon: <Layers className="h-6 w-6" />, value: decks.length, label: "Decks" },
            { icon: <BookOpen className="h-6 w-6" />, value: totalCards, label: "Cards" },
            { icon: <Trophy className="h-6 w-6" />, value: "4", label: "Categories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Decks */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Decks</h2>
          <Link
            href="/decks"
            className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/study/${deck.id}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-slate-500 hover:bg-slate-800 active:scale-[0.98]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${deck.color} opacity-5 transition group-hover:opacity-10`}
              />
              <div className="relative">
                <div
                  className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${deck.color} p-2.5`}
                >
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{deck.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{deck.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-300">
                    {deck.cards.length} cards
                  </span>
                  <span className="text-purple-400 transition group-hover:translate-x-1">
                    Study now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
