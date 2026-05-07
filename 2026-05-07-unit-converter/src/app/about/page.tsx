import Link from "next/link";
import { categories } from "@/lib/conversions";

export default function AboutPage() {
  const totalUnits = categories.reduce((sum, c) => sum + c.units.length, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">⚡</div>
        <h1 className="text-4xl font-bold gradient-text mb-3">About UnitFlow</h1>
        <p className="text-gray-400 text-lg">
          A fast, clean, and comprehensive unit conversion tool built for everyone.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: categories.length.toString(), label: "Categories" },
          { value: totalUnits.toString() + "+", label: "Units" },
          { value: "∞", label: "Conversions" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="glass rounded-3xl p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Features</h2>
        <ul className="space-y-4">
          {[
            { icon: "⚡", title: "Instant Conversion", desc: "Results appear as you type — no need to press Enter or click Convert." },
            { icon: "↔️", title: "Bidirectional Input", desc: "Edit either field and both update simultaneously." },
            { icon: "📋", title: "All Values at Once", desc: "See conversions to every unit in the category at a glance." },
            { icon: "💾", title: "History Tracking", desc: "Save conversions and review them later, with category filtering." },
            { icon: "📋", title: "Copy to Clipboard", desc: "One-click copy of the result with the unit symbol." },
            { icon: "🌙", title: "Dark Mode Only", desc: "Easy on the eyes for long sessions." },
          ].map((f) => (
            <li key={f.title} className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</span>
              <div>
                <span className="font-medium text-white">{f.title}</span>
                <p className="text-gray-400 text-sm mt-0.5">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories list */}
      <div className="glass rounded-3xl p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">All Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/convert/${cat.id}`}>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/3 hover:bg-white/6 rounded-xl transition-colors">
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <div className="text-white text-sm font-medium">{cat.name}</div>
                  <div className="text-gray-500 text-xs">{cat.units.length} units</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="glass rounded-3xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 15", "TypeScript", "Tailwind CSS", "React Hooks", "localStorage API"].map((tech) => (
            <span key={tech} className="px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/25 rounded-lg text-indigo-300 text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
        >
          Start Converting →
        </Link>
      </div>
    </div>
  );
}
