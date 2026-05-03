import Link from "next/link";

const stats = [
  { label: "Avg WPM", value: "52" },
  { label: "Top WPM", value: "212" },
  { label: "Difficulty Levels", value: "3" },
];

const features = [
  {
    icon: "⚡",
    title: "Real-time WPM",
    description: "Watch your words per minute update live as you type.",
  },
  {
    icon: "🎯",
    title: "Accuracy Tracking",
    description: "Every keystroke counts. Know exactly how precise you are.",
  },
  {
    icon: "🏆",
    title: "Leaderboard",
    description: "Compare your results and climb the local rankings.",
  },
  {
    icon: "🎚️",
    title: "3 Difficulty Levels",
    description: "From casual sentences to tricky code snippets.",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6 fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-violet-400 inline-block caret-blink"></span>
          Type. Race. Improve.
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-white">How fast</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            can you type?
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Put your fingers to the test. TypeRacer measures your speed and accuracy
          across real sentences, quotes, and code — no fluff, just performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/test"
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
          >
            Start Typing →
          </Link>
          <Link
            href="/leaderboard"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all hover:scale-105 active:scale-95"
          >
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-center hover:border-violet-500/30 transition-colors"
          >
            <div className="text-3xl font-bold text-violet-400">{value}</div>
            <div className="text-slate-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </section>

      {/* Sample test preview */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Preview</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Easy</span>
        </div>
        <p className="text-lg leading-relaxed tracking-wide">
          <span className="text-green-400">The sun rises in the </span>
          <span className="bg-violet-500/30 text-violet-200 rounded px-0.5">e</span>
          <span className="text-slate-500">ast and sets in the west. Birds sing in the trees as the morning begins.</span>
        </p>
        <div className="flex gap-6 text-sm text-slate-500 pt-2 border-t border-slate-800">
          <span>WPM: <span className="text-cyan-400 font-semibold">68</span></span>
          <span>Accuracy: <span className="text-green-400 font-semibold">97%</span></span>
          <span>Time: <span className="text-slate-300 font-semibold">0:24</span></span>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Everything you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex gap-4 hover:border-violet-500/30 transition-colors group"
            >
              <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
              <div>
                <h3 className="font-semibold text-slate-200">{title}</h3>
                <p className="text-slate-500 text-sm mt-1">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/10 border border-violet-500/20 p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to race?</h2>
        <p className="text-slate-400">Pick a difficulty, type the text, see your score.</p>
        <Link
          href="/test"
          className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all hover:scale-105"
        >
          Launch Test →
        </Link>
      </section>
    </div>
  );
}
