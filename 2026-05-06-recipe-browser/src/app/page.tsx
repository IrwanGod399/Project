import Link from "next/link";
import { recipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";

const featuredIds = ["4", "2", "5", "1"];

export default function HomePage() {
  const featured = featuredIds.map((id) => recipes.find((r) => r.id === id)!).filter(Boolean);
  const quick = recipes.filter((r) => r.time <= 15).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            What are you{" "}
            <span className="text-orange-500">cooking</span> today?
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Explore recipes from every corner of the world — filter by category, search by ingredient, and save your favorites.
          </p>
          <SearchBar />
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {["avocado", "pasta", "chicken", "chocolate", "quick"].map((tag) => (
              <Link
                key={tag}
                href={`/browse?q=${tag}`}
                className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Recipes</h2>
          <Link href="/browse" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Quick meals */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Ready in 15 minutes ⚡</h2>
          <p className="text-orange-100 mb-6">No time? No problem. These recipes are lightning fast.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quick.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: recipes.length, label: "Recipes" },
            { value: new Set(recipes.map((r) => r.cuisine)).size, label: "Cuisines" },
            { value: new Set(recipes.map((r) => r.category)).size, label: "Categories" },
            { value: Math.min(...recipes.map((r) => r.time)), label: "Min. minutes" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-orange-100 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-orange-500">{value}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
