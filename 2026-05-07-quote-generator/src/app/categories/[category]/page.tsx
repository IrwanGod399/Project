import { notFound } from "next/navigation";
import { categoryMeta, quotes, Category } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!(category in categoryMeta)) notFound();

  const cat = category as Category;
  const meta = categoryMeta[cat];
  const categoryQuotes = quotes.filter((q) => q.category === cat);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors"
      >
        ← All Categories
      </Link>

      <div className={`rounded-2xl border p-6 mb-8 animate-fade-in-up ${meta.bg}`}>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.icon}</span>
          <div>
            <h1 className={`text-3xl font-bold ${meta.color}`}>{meta.label}</h1>
            <p className="text-gray-500 text-sm mt-1">{categoryQuotes.length} quotes in this category</p>
          </div>
        </div>
      </div>

      {/* Quotes grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {categoryQuotes.map((quote, i) => (
          <QuoteCard key={quote.id} quote={quote} showCategory={false} animationDelay={i * 60} />
        ))}
      </div>
    </div>
  );
}
