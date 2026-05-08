import Link from "next/link";

const features = [
  {
    icon: "▶",
    title: "Start / Pause / Resume",
    desc: "Hit Start to begin timing. Pause freezes the clock without losing progress. Resume picks right back up.",
  },
  {
    icon: "🏁",
    title: "Lap Tracking",
    desc: "Press Lap while running to record split times. Fastest and slowest laps are highlighted automatically.",
  },
  {
    icon: "💾",
    title: "Save Sessions",
    desc: "After pausing, give your session a name and save it. Saved sessions persist in your browser via localStorage.",
  },
  {
    icon: "📋",
    title: "Session History",
    desc: "Browse all saved sessions on the History page. Expand any session to see individual lap details.",
  },
  {
    icon: "📊",
    title: "Live Stats",
    desc: "While timing, see average lap time and total elapsed time at a glance.",
  },
  {
    icon: "🎨",
    title: "Visual Feedback",
    desc: "The clock glows when running and shows a green indicator. The lap table highlights performance automatically.",
  },
];

const useCases = [
  { title: "Sprint Intervals", example: "Record each 400m sprint with lap splits" },
  { title: "Study Sessions", example: "Time focused work blocks, save them for review" },
  { title: "Cooking", example: "Lap each step of a recipe for perfect timing" },
  { title: "Presentations", example: "Track rehearsal duration and section splits" },
  { title: "Code Challenges", example: "See how long each problem takes to solve" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-100 mb-1">About ChronoTrack</h1>
      <p className="text-slate-400 mb-8 text-sm leading-relaxed">
        ChronoTrack is a precision stopwatch built for anyone who needs accurate split timing with the
        ability to review and compare sessions over time. Built with Next.js and Tailwind CSS.
      </p>

      <h2 className="text-lg font-semibold text-slate-200 mb-4">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xl mb-2">{f.icon}</div>
            <div className="font-semibold text-slate-200 text-sm mb-1">{f.title}</div>
            <div className="text-slate-500 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-slate-200 mb-4">Use Cases</h2>
      <div className="flex flex-col gap-2 mb-8">
        {useCases.map((u) => (
          <div key={u.title} className="flex items-start gap-3 text-sm">
            <span className="text-violet-500 font-bold mt-0.5">→</span>
            <div>
              <span className="text-slate-300 font-medium">{u.title}:</span>{" "}
              <span className="text-slate-500">{u.example}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-violet-900/50 bg-violet-950/20 p-5">
        <p className="text-sm text-violet-300 font-medium mb-1">Tech Stack</p>
        <p className="text-xs text-slate-400">Next.js 15 · TypeScript · Tailwind CSS · App Router · localStorage</p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-700 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
          >
            ⏱ Open Stopwatch
          </Link>
        </div>
      </div>
    </div>
  );
}
