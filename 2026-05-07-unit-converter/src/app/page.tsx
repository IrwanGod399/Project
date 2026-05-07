import Link from "next/link";
import { categories } from "@/lib/conversions";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="float-animation inline-block text-6xl mb-6">⚡</div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          <span className="gradient-text">Universal Unit</span>
          <br />
          <span className="text-white">Converter</span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Convert between any units instantly. From everyday measurements to scientific values — all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm text-gray-500">
          <span className="px-3 py-1 glass rounded-full">8 Categories</span>
          <span className="px-3 py-1 glass rounded-full">50+ Units</span>
          <span className="px-3 py-1 glass rounded-full">Instant Conversion</span>
          <span className="px-3 py-1 glass rounded-full">History Tracking</span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/convert/${cat.id}`}>
            <div className="glass-card rounded-2xl p-6 h-full cursor-pointer group">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">{cat.name}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{cat.description}</p>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>{cat.units.length} units</span>
                <span className="ml-auto text-indigo-400 group-hover:translate-x-1 transition-transform duration-200">
                  Convert →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick tip */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          💡 Your conversion history is saved automatically.{" "}
          <Link href="/history" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
            View history →
          </Link>
        </p>
      </div>
    </div>
  );
}
