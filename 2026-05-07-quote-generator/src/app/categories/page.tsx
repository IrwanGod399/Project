import Link from "next/link";
import { categoryMeta, quotes, Category } from "@/lib/quotes";

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Quote Categories</h1>
        <p className="text-gray-500">Pick a theme and explore curated quotes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(Object.entries(categoryMeta) as [Category, (typeof categoryMeta)[Category]][]).map(
          ([cat, meta], i) => {
            const categoryQuotes = quotes.filter((q) => q.category === cat);
            const preview = categoryQuotes[0];
            return (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className={`group rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200 hover:scale-105 hover:shadow-lg animate-fade-in-up ${meta.bg}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{meta.icon}</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/70 ${meta.color}`}
                  >
                    {categoryQuotes.length} quotes
                  </span>
                </div>
                <div>
                  <h2 className={`text-xl font-bold mb-1 ${meta.color}`}>{meta.label}</h2>
                  {preview && (
                    <p className="text-sm text-gray-600 line-clamp-2 italic">
                      &ldquo;{preview.text}&rdquo;
                    </p>
                  )}
                </div>
                <div
                  className={`text-xs font-semibold flex items-center gap-1 mt-auto ${meta.color} group-hover:translate-x-1 transition-transform duration-200`}
                >
                  Explore →
                </div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
