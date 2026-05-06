import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "Real-time WPM",
    description: "See your words-per-minute update live as you type",
  },
  {
    icon: "🎯",
    title: "Accuracy Tracking",
    description: "Monitor your error rate and accuracy percentage",
  },
  {
    icon: "📈",
    title: "Progress History",
    description: "Review all your past tests and track improvement over time",
  },
  {
    icon: "🎮",
    title: "Three Difficulty Levels",
    description: "From simple sentences to complex academic prose",
  },
];

const difficultyInfo = [
  {
    level: "Easy",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-950/40 border-green-800/50",
    badge: "bg-green-900 text-green-300",
    desc: "Simple sentences with common words. Perfect for warming up.",
    avgWpm: "40–70 WPM",
  },
  {
    level: "Medium",
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-950/40 border-yellow-800/50",
    badge: "bg-yellow-900 text-yellow-300",
    desc: "Longer passages covering science, history, and technology.",
    avgWpm: "25–50 WPM",
  },
  {
    level: "Hard",
    color: "from-red-500 to-pink-500",
    bg: "bg-red-950/40 border-red-800/50",
    badge: "bg-red-900 text-red-300",
    desc: "Complex academic and technical texts with challenging vocabulary.",
    avgWpm: "15–35 WPM",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-4 py-1.5 text-sm text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Free typing speed test — no login required
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          How fast do{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            you type?
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Measure your typing speed in WPM, track accuracy, and challenge
          yourself across three difficulty levels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/test"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg"
          >
            Start Typing
            <span>→</span>
          </Link>
          <Link
            href="/stats"
            className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg"
          >
            View Stats
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-center text-2xl font-bold text-gray-200 mb-8">
          Everything you need to improve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2 hover:border-indigo-700/50 transition-colors"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="font-semibold text-gray-100">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Difficulty levels */}
      <section>
        <h2 className="text-center text-2xl font-bold text-gray-200 mb-8">
          Choose your challenge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficultyInfo.map((d) => (
            <div
              key={d.level}
              className={`${d.bg} border rounded-xl p-6 space-y-3`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-bold text-lg bg-gradient-to-r ${d.color} bg-clip-text text-transparent`}>
                  {d.level}
                </h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${d.badge}`}>
                  {d.avgWpm}
                </span>
              </div>
              <p className="text-sm text-gray-300">{d.desc}</p>
              <Link
                href={`/test?difficulty=${d.level.toLowerCase()}`}
                className="inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Try {d.level} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tip */}
      <section className="text-center pb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-gray-200">Pro tip:</span> The
            average typing speed is around{" "}
            <span className="text-indigo-400 font-semibold">40 WPM</span>.
            Professional typists typically reach{" "}
            <span className="text-purple-400 font-semibold">65–75 WPM</span>.
            World record holders exceed{" "}
            <span className="text-pink-400 font-semibold">200 WPM</span>!
          </p>
        </div>
      </section>
    </div>
  );
}
