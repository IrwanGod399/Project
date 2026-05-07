import { categories } from "@/lib/conversions";
import { notFound } from "next/navigation";
import ConverterClient from "./ConverterClient";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.name} Converter — UnitFlow`,
    description: cat.description,
  };
}

export default async function ConvertPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  return <ConverterClient categoryId={cat.id} />;
}
