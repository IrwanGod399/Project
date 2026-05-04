import Link from "next/link";

const rules = [
  {
    icon: "🔤",
    title: "Unscramble the Word",
    desc: "Each round presents you with a scrambled word. Rearrange the letters to spell the correct word.",
  },
  {
    icon: "⏱️",
    title: "Beat the Clock",
    desc: "You have 30 seconds per word. The faster you answer, the more bonus points you earn.",
  },
  {
    icon: "💡",
    title: "Use Hints Wisely",
    desc: "Stuck? Reveal a hint for a 25-point penalty. Hints describe the word's meaning.",
  },
  {
    icon: "⏭️",
    title: "Skip if Stuck",
    desc: "You can skip any word with no penalty to score, but you'll miss out on those points.",
  },
  {
    icon: "🏆",
    title: "Scoring",
    desc: "Correct answers earn 100 base points + 5 points per second remaining. Hints deduct 25 points.",
  },
  {
    icon: "🎲",
    title: "Categories",
    desc: "Choose from Animals, Food, Science, Sports, or Countries — or try a Random Mix of all five!",
  },
];

const scoring = [
  { action: "Correct answer (30s left)", points: "250 pts" },
  { action: "Correct answer (15s left)", points: "175 pts" },
  { action: "Correct answer (5s left)", points: "125 pts" },
  { action: "Hint used (-25)", points: "−25 pts" },
  { action: "Skip or time out", points: "0 pts" },
  { action: "Perfect game (8/8, no hints)", points: "~1,400+ pts" },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm">
          ← Back to Home
        </Link>

        <div className="mb-10 text-center">
          <div className="mb-2 text-5xl">📖</div>
          <h1 className="text-4xl font-extrabold">How to Play</h1>
          <p className="mt-2 text-gray-400">Master the rules, beat the leaderboard.</p>
        </div>

        {/* Rules grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {rules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
            >
              <div className="mb-3 text-3xl">{rule.icon}</div>
              <h3 className="mb-1 font-bold text-white">{rule.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>

        {/* Scoring table */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Scoring Reference</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-800">
            {scoring.map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"
                } ${i < scoring.length - 1 ? "border-b border-gray-800" : ""}`}
              >
                <span className="text-sm text-gray-300">{row.action}</span>
                <span
                  className={`text-sm font-bold ${
                    row.points.startsWith("−") ? "text-red-400" : "text-indigo-400"
                  }`}
                >
                  {row.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mb-10 rounded-2xl border border-yellow-800/40 bg-yellow-900/10 p-6">
          <h2 className="mb-3 text-lg font-bold text-yellow-300">Pro Tips</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Look for common prefixes and suffixes (UN-, -TION, -ING) first.</li>
            <li>• Identify vowel clusters — they often stay together.</li>
            <li>• Common 3-letter combinations: THE, ING, STR, CHR.</li>
            <li>• If you see Q, U almost always follows it.</li>
            <li>• Double letters are a strong giveaway — look for them.</li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/game"
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-10 py-4 text-lg font-bold text-white transition hover:scale-105"
          >
            Start Playing →
          </Link>
        </div>
      </div>
    </div>
  );
}
