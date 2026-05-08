import Link from "next/link";
import { DIFFICULTY_CONFIG, Difficulty } from "@/lib/gameData";

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const DIFFICULTY_COLORS = {
  easy: {
    bg: "from-emerald-900/40 to-emerald-800/20",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glow: "hover:shadow-emerald-500/10",
  },
  medium: {
    bg: "from-indigo-900/40 to-indigo-800/20",
    border: "border-indigo-500/30 hover:border-indigo-400/60",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    glow: "hover:shadow-indigo-500/10",
  },
  hard: {
    bg: "from-rose-900/40 to-rose-800/20",
    border: "border-rose-500/30 hover:border-rose-400/60",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    glow: "hover:shadow-rose-500/10",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-16">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl w-full text-center">
        {/* Hero */}
        <div className="text-8xl mb-6 animate-float inline-block">🎴</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">MemoryFlip</span>
        </h1>
        <p className="text-xl text-slate-400 mb-4 max-w-md mx-auto">
          Test your memory with our card-flipping challenge. Match all pairs to win!
        </p>

        {/* How to play */}
        <div className="glass rounded-2xl p-6 mb-10 text-left max-w-md mx-auto">
          <h2 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <span>📖</span> How to Play
          </h2>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">1.</span>
              Click any card to flip it and reveal the hidden emoji
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">2.</span>
              Flip a second card to find its matching pair
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">3.</span>
              Matched pairs stay face-up — unmatched cards flip back
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">4.</span>
              Match all pairs with the fewest moves and fastest time!
            </li>
          </ul>
        </div>

        {/* Difficulty Selection */}
        <h2 className="text-lg font-semibold text-slate-300 mb-4">Choose Your Difficulty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {difficulties.map((diff) => {
            const config = DIFFICULTY_CONFIG[diff];
            const colors = DIFFICULTY_COLORS[diff];
            return (
              <Link
                key={diff}
                href={`/game?difficulty=${diff}`}
                className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${colors.glow} group`}
              >
                <div className="text-3xl mb-3">
                  {diff === "easy" ? "🌱" : diff === "medium" ? "🔥" : "💎"}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${colors.badge}`}>
                  {config.label}
                </div>
                <p className="text-sm text-slate-300 font-medium">{config.description}</p>
                <p className="text-xs text-slate-500 mt-1">{config.pairs} unique animals</p>
                <div className="mt-4 text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                  Play Now →
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/scores"
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          View High Scores
        </Link>
      </div>
    </div>
  );
}
