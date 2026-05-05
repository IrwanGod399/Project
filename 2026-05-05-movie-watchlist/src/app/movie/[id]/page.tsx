"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOVIES } from "@/lib/movies";
import { addToWatchlist, removeFromWatchlist, getWatchlist, updateWatchlistEntry } from "@/lib/watchlist";
import { WatchlistEntry } from "@/lib/movies";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Number(params.id);
  const movie = MOVIES.find((m) => m.id === movieId);

  const [entry, setEntry] = useState<WatchlistEntry | null>(null);
  const [notes, setNotes] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list = getWatchlist();
    const found = list.find((e) => e.movieId === movieId) ?? null;
    setEntry(found);
    if (found) {
      setNotes(found.notes ?? "");
      setUserRating(found.userRating ?? 0);
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🎞️</div>
        <p className="text-gray-400 text-lg">Movie not found.</p>
        <Link href="/" className="text-indigo-400 hover:underline mt-2 inline-block">Back to Browse</Link>
      </div>
    );
  }

  const handleAddToWatchlist = () => {
    addToWatchlist(movie.id);
    const list = getWatchlist();
    setEntry(list.find((e) => e.movieId === movieId) ?? null);
  };

  const handleRemove = () => {
    removeFromWatchlist(movie.id);
    setEntry(null);
    setNotes("");
    setUserRating(0);
  };

  const handleSaveNotes = () => {
    if (!entry) return;
    updateWatchlistEntry(movie.id, { notes, userRating: userRating || undefined });
    setEntry((prev) => prev ? { ...prev, notes, userRating: userRating || undefined } : prev);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleStatusChange = (status: WatchlistEntry["status"]) => {
    if (!entry) return;
    updateWatchlistEntry(movie.id, { status });
    setEntry((prev) => prev ? { ...prev, status } : prev);
  };

  const statusColors: Record<WatchlistEntry["status"], string> = {
    "want-to-watch": "bg-blue-600",
    "watching": "bg-yellow-600",
    "watched": "bg-green-600",
  };

  const statusLabels: Record<WatchlistEntry["status"], string> = {
    "want-to-watch": "Want to Watch",
    "watching": "Currently Watching",
    "watched": "Watched",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-flex items-center gap-1">
        ← Back to Browse
      </Link>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 h-56 flex items-center justify-center text-9xl">
          {movie.poster}
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
              <p className="text-gray-400 mt-1">
                {movie.year} · {movie.runtime} min · Directed by {movie.director}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-yellow-400 font-bold text-2xl">★ {movie.rating}</span>
              <span className="text-gray-500 text-xs">IMDb rating</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((g) => (
              <span key={g} className="bg-indigo-700/50 text-indigo-200 text-sm px-3 py-1 rounded-full">{g}</span>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{movie.synopsis}</p>

          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor) => (
                <span key={actor} className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-lg">{actor}</span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-white mb-4">My Watchlist</h2>
            {!entry ? (
              <button
                onClick={handleAddToWatchlist}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                + Add to Watchlist
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["want-to-watch", "watching", "watched"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          entry.status === s
                            ? `${statusColors[s]} text-white`
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-2">Your Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        onClick={() => setUserRating(n)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          n <= userRating ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-2">Notes</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Your thoughts on this movie..."
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveNotes}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                  >
                    {saved ? "Saved!" : "Save"}
                  </button>
                  <button
                    onClick={handleRemove}
                    className="bg-red-700/50 hover:bg-red-700 text-red-200 px-5 py-2 rounded-lg font-medium transition-colors"
                  >
                    Remove from Watchlist
                  </button>
                </div>

                <p className="text-gray-600 text-xs">
                  Added {new Date(entry.addedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
