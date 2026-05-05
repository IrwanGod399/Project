"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MOVIES } from "@/lib/movies";
import { getWatchlist, removeFromWatchlist, updateWatchlistEntry } from "@/lib/watchlist";
import { WatchlistEntry } from "@/lib/movies";

type StatusFilter = "all" | WatchlistEntry["status"];

const STATUS_LABELS: Record<WatchlistEntry["status"], string> = {
  "want-to-watch": "Want to Watch",
  "watching": "Watching",
  "watched": "Watched",
};

const STATUS_COLORS: Record<WatchlistEntry["status"], string> = {
  "want-to-watch": "bg-blue-700/40 text-blue-300",
  "watching": "bg-yellow-700/40 text-yellow-300",
  "watched": "bg-green-700/40 text-green-300",
};

export default function WatchlistPage() {
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    setEntries(getWatchlist());
  }, []);

  const reload = () => setEntries(getWatchlist());

  const handleRemove = (id: number) => {
    removeFromWatchlist(id);
    reload();
  };

  const handleStatusChange = (id: number, status: WatchlistEntry["status"]) => {
    updateWatchlistEntry(id, { status });
    reload();
  };

  const filtered = entries.filter((e) => filter === "all" || e.status === filter);
  const movies = filtered.map((e) => ({
    entry: e,
    movie: MOVIES.find((m) => m.id === e.movieId)!,
  })).filter((x) => x.movie);

  const counts = {
    all: entries.length,
    "want-to-watch": entries.filter((e) => e.status === "want-to-watch").length,
    watching: entries.filter((e) => e.status === "watching").length,
    watched: entries.filter((e) => e.status === "watched").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          My <span className="text-indigo-400">Watchlist</span>
        </h1>
        <p className="text-gray-400">{entries.length} movie{entries.length !== 1 ? "s" : ""} tracked.</p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🍿</div>
          <p className="text-lg mb-4">Your watchlist is empty.</p>
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Browse Movies
          </Link>
        </div>
      ) : (
        <>
          {/* Status tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["all", "want-to-watch", "watching", "watched"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === s
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {s === "all" ? "All" : STATUS_LABELS[s as WatchlistEntry["status"]]} ({counts[s]})
              </button>
            ))}
          </div>

          {movies.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No movies in this category.</p>
          ) : (
            <div className="space-y-4">
              {movies.map(({ entry, movie }) => (
                <div key={movie.id} className="bg-gray-800 rounded-2xl p-5 flex gap-5 hover:bg-gray-750 transition-colors">
                  <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0">
                    {movie.poster}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/movie/${movie.id}`} className="font-bold text-white hover:text-indigo-300 transition-colors text-lg">
                          {movie.title}
                        </Link>
                        <p className="text-gray-400 text-sm">{movie.year} · {movie.director}</p>
                      </div>
                      <span className="text-yellow-400 text-sm font-semibold whitespace-nowrap">★ {movie.rating}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[entry.status]}`}>
                        {STATUS_LABELS[entry.status]}
                      </span>
                      {entry.userRating && (
                        <span className="text-xs bg-yellow-700/30 text-yellow-300 px-2 py-1 rounded-full">
                          My rating: {entry.userRating}/10
                        </span>
                      )}
                      {entry.notes && (
                        <span className="text-gray-500 text-xs truncate max-w-xs">💬 {entry.notes}</span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      {(["want-to-watch", "watching", "watched"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(movie.id, s)}
                          disabled={entry.status === s}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                            entry.status === s
                              ? "bg-indigo-600 text-white cursor-default"
                              : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                      <button
                        onClick={() => handleRemove(movie.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-900/40 text-red-400 hover:bg-red-900/70 transition-colors ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
