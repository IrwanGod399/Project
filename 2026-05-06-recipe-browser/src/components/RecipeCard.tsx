import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

const difficultyColor = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const categoryEmoji: Record<string, string> = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Dessert: "🍰",
  Snack: "🥨",
  Drink: "🥤",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-orange-50 hover:-translate-y-0.5">
        <div className="relative h-48 overflow-hidden bg-orange-50">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-orange-600">
            {categoryEmoji[recipe.category]} {recipe.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-1">
            {recipe.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{recipe.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">⏱ {recipe.time} min</span>
              <span className="flex items-center gap-1">👤 {recipe.servings}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full font-medium ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
