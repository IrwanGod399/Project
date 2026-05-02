import Link from "next/link";
import { decks } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Geography: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Programming: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Science: "bg-red-500/20 text-red-300 border-red-500/30",
  History: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function Home() {
  const totalCards = decks.reduce((s, d) => s + d.cards.length, 0);
  const totalTopics = new Set(decks.map((d) => d.category)).size;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
          {decks.length} decks ready to study
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Study smarter with{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            FlashMind
          </span>
        </h1>
        <p className="text-xl text-white/50 max-w-xl mx-auto">
          Interactive flashcard decks covering geography, programming, science, history, and more.
          Flip cards, track your progress, master any subject.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-16">
        {[
          { label: "Decks", value: decks.length },
          { label: "Cards", value: totalCards },
          { label: "Topics", value: totalTopics },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-white/40 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Deck grid */}
      <h2 className="text-xl font-semibold text-white mb-6">Choose a Deck</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {decks.map((deck) => (
          <Link
            key={deck.id}
            href={`/decks/${deck.id}`}
            className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${deck.color} rounded-t-2xl`} />

            <div className="flex items-start justify-between mb-3 mt-1">
              <div
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  categoryColors[deck.category] ?? "bg-white/10 text-white/60 border-white/10"
                }`}
              >
                {deck.category}
              </div>
              <span className="text-white/30 text-xs">{deck.cards.length} cards</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
              {deck.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{deck.description}</p>

            <div className="mt-5 flex items-center gap-2 text-sm text-violet-400 font-medium">
              <span>View deck</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
