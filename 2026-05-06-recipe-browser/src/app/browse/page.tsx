import { categories, searchRecipes, type Category } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function BrowsePage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q ?? "";
  const activeCategory = (params.category as Category) || undefined;

  const results = searchRecipes(query, activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Recipes</h1>
      <p className="text-gray-500 mb-6">
        {results.length} recipe{results.length !== 1 ? "s" : ""} found
        {query && ` for "${query}"`}
        {activeCategory && ` in ${activeCategory}`}
      </p>

      <div className="mb-6">
        <SearchBar defaultValue={query} />
      </div>

      <CategoryFilter categories={categories} active={activeCategory} query={query} />

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h2>
          <p className="text-gray-400">Try a different search term or remove the category filter.</p>
        </div>
      )}
    </div>
  );
}
