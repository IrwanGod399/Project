import { getDeckById, decks } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return decks.map((d) => ({ id: d.id }));
}

const categoryColors: Record<string, string> = {
  Geography: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Programming: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Science: "bg-red-500/20 text-red-300 border-red-500/30",
  History: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default async function DeckPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deck = getDeckById(id);
  if (!deck) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Decks
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${deck.color}`} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${categoryColors[deck.category] ?? "bg-white/10 text-white/60 border-white/10"}`}>
              {deck.category}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{deck.title}</h1>
            <p className="text-white/50">{deck.description}</p>
          </div>
          <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-4 min-w-[100px] text-center">
            <span className="text-3xl font-bold text-white">{deck.cards.length}</span>
            <span className="text-xs text-white/40 mt-1">flashcards</span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href={`/study/${deck.id}`}
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${deck.color} text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Studying
          </Link>
        </div>
      </div>

      {/* Cards preview */}
      <h2 className="text-lg font-semibold text-white mb-4">All Cards ({deck.cards.length})</h2>
      <div className="space-y-3">
        {deck.cards.map((card, i) => (
          <div
            key={card.id}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
          >
            <div className="flex gap-4">
              <span className="text-xs text-white/20 font-mono mt-0.5 shrink-0 w-5 text-right">{i + 1}</span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-white/30 mb-1 uppercase tracking-wider">Question</div>
                  <p className="text-white/80 text-sm">{card.question}</p>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1 uppercase tracking-wider">Answer</div>
                  <p className="text-violet-300 text-sm">{card.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
