import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipeById, recipes } from "@/lib/recipes";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

const difficultyColor = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-orange-500 transition-colors">Browse</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">{recipe.title}</span>
      </nav>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              {recipe.category}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
              {recipe.cuisine}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{recipe.title}</h1>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-6 text-gray-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{recipe.time}</div>
            <div className="text-xs text-gray-400">minutes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{recipe.servings}</div>
            <div className="text-xs text-gray-400">servings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{recipe.calories}</div>
            <div className="text-xs text-gray-400">cal/serving</div>
          </div>
        </div>
        <FavoriteButton recipeId={recipe.id} recipeTitle={recipe.title} />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-orange-400 pl-4">
        {recipe.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {recipe.tags.map((tag) => (
          <Link
            key={tag}
            href={`/browse?q=${tag}`}
            className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full hover:bg-orange-100 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>
                  <span className="font-medium text-gray-800">{ing.amount}</span>{" "}
                  <span className="text-gray-600">{ing.item}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-orange-100">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          ← Back to Browse
        </Link>
      </div>
    </div>
  );
}
