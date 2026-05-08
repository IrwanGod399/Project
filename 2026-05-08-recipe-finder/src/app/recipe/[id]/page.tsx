"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecipeById, recipes } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const recipe = getRecipeById(id);
  const [servings, setServings] = useState(recipe?.servings ?? 2);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isFavorited, setIsFavorited] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!recipe) return;
    setServings(recipe.servings);
    const saved = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    setIsFavorited(saved.includes(recipe.id));
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="text-center py-32">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe not found</h2>
        <Link href="/browse" className="text-orange-500 font-medium hover:underline">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  const ratio = servings / recipe.servings;
  const totalTime = recipe.prepTime + recipe.cookTime;

  function toggleFavorite() {
    const recipeId = recipe!.id;
    const saved = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    const updated = isFavorited
      ? saved.filter((x) => x !== recipeId)
      : [...saved, recipeId];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorited(!isFavorited);
  }

  function toggleStep(index: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  function toggleIngredient(index: number) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  const related = recipes
    .filter((r) => r.id !== recipe.id && r.category === recipe.category)
    .slice(0, 4);

  const progress = recipe.steps.length > 0
    ? Math.round((completedSteps.size / recipe.steps.length) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10 flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="text-8xl sm:text-9xl">{recipe.emoji}</div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
            <span className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            {recipe.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-600">
            <Stat icon="⏱️" label={`${totalTime} min total`} />
            <Stat icon="🥄" label={`${recipe.prepTime} min prep`} />
            <Stat icon="🔥" label={`${recipe.cookTime} min cook`} />
            <Stat icon="🍽️" label={`${recipe.servings} servings`} />
            <Stat icon="⚡" label={`${recipe.calories} kcal`} />
            <Stat icon="⭐" label={`${recipe.rating} rating`} />
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-3 rounded-full transition-all ${
            isFavorited ? "bg-red-50 text-red-500" : "bg-white text-gray-400 hover:text-red-400"
          }`}
        >
          <svg className="w-6 h-6" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Ingredients</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold"
                >
                  −
                </button>
                <span className="text-sm font-semibold w-6 text-center">{servings}</span>
                <button
                  onClick={() => setServings(Math.min(20, servings + 1))}
                  className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">servings (tap to check off)</p>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => {
                const checked = checkedIngredients.has(i);
                const scaledAmount = ratio !== 1
                  ? scaleAmount(ing.amount, ratio)
                  : ing.amount;
                return (
                  <li
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className={`flex items-start gap-2 cursor-pointer rounded-lg p-1.5 hover:bg-gray-50 transition-colors ${
                      checked ? "opacity-40" : ""
                    }`}
                  >
                    <div className={`w-4 h-4 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                      checked ? "bg-orange-500 border-orange-500" : "border-gray-300"
                    }`}>
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? "line-through text-gray-400" : "text-gray-700"}`}>
                      <span className="font-medium">{scaledAmount}</span> {ing.item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-gray-900 text-lg">Instructions</h2>
              <span className="text-sm text-gray-500">{completedSteps.size}/{recipe.steps.length} done</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ol className="space-y-4">
            {recipe.steps.map((step, i) => {
              const done = completedSteps.has(i);
              return (
                <li
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`flex gap-4 cursor-pointer rounded-2xl p-4 border transition-all ${
                    done
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-100 hover:border-orange-200"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-colors ${
                    done ? "bg-green-500 text-white" : "bg-orange-100 text-orange-600"
                  }`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <p className={`text-sm leading-relaxed pt-1 ${
                    done ? "text-gray-400 line-through" : "text-gray-700"
                  }`}>
                    {step}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Tips */}
          {recipe.tips.length > 0 && (
            <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More {recipe.category} Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}

function scaleAmount(amount: string, ratio: number): string {
  const match = amount.match(/^([\d./]+)/);
  if (!match) return amount;
  const num = eval(match[1]) * ratio;
  const rounded = Math.round(num * 4) / 4;
  const rest = amount.slice(match[1].length);
  return (Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2)) + rest;
}
