import { getDeckById, decks } from "@/lib/data";
import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";

export function generateStaticParams() {
  return decks.map((d) => ({ id: d.id }));
}

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deck = getDeckById(id);
  if (!deck) notFound();

  return <StudyClient deck={deck} />;
}
