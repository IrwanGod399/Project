import Link from "next/link";
import { recipes, categories, categoryEmojis } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";

const featured = recipes.filter((r) =>
  ["butter-chicken", "chocolate-lava-cake", "avocado-toast", "spaghetti-bolognese"].includes(r.id)
);

const topRated = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-8xl rotate-12">🍕</div>
          <div className="absolute top-20 right-20 text-7xl -rotate-12">🥗</div>
          <div className="absolute bottom-10 left-1/4 text-6xl rotate-6">🍜</div>
          <div className="absolute bottom-20 right-1/3 text-9xl -rotate-6">🎂</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
            Find Your Next
            <br />
            Favorite Recipe
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Explore a curated collection of delicious recipes from around the world. From quick
            weeknight dinners to impressive weekend showstoppers.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
          >
            Browse All Recipes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { value: `${recipes.length}+`, label: "Recipes" },
            { value: "6", label: "Categories" },
            { value: "100%", label: "Tested" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-orange-500">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/browse?category=${cat}`}
                className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-4 hover:border-orange-200 hover:bg-orange-50 transition-all group shadow-sm"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {categoryEmojis[cat]}
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Recipes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Recipes</h2>
            <Link href="/browse" className="text-sm font-medium text-orange-500 hover:text-orange-600">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Rated ⭐</h2>
            <Link href="/browse" className="text-sm font-medium text-orange-500 hover:text-orange-600">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Quick Meals CTA */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-6xl">⏱️</div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Short on time?</h3>
            <p className="text-gray-600 mb-4">
              Browse our collection of quick and easy recipes ready in 30 minutes or less.
            </p>
            <Link
              href="/browse?tag=quick"
              className="inline-block bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
            >
              Quick Recipes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
