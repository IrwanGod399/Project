"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MOVIES } from "@/lib/movies";
import { getWatchlist } from "@/lib/watchlist";
import { WatchlistEntry } from "@/lib/movies";

export default function StatsPage() {
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);

  useEffect(() => {
    setEntries(getWatchlist());
  }, []);

  if (entries.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-lg mb-4">No stats yet — add some movies to your watchlist first.</p>
        <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Browse Movies
        </Link>
      </div>
    );
  }

  const watchedEntries = entries.filter((e) => e.status === "watched");
  const ratedEntries = watchedEntries.filter((e) => e.userRating);
  const avgUserRating =
    ratedEntries.length > 0
      ? (ratedEntries.reduce((sum, e) => sum + (e.userRating ?? 0), 0) / ratedEntries.length).toFixed(1)
      : null;

  const totalRuntime = entries.reduce((sum, e) => {
    const m = MOVIES.find((x) => x.id === e.movieId);
    return sum + (m?.runtime ?? 0);
  }, 0);
  const hours = Math.floor(totalRuntime / 60);
  const mins = totalRuntime % 60;

  const genreCounts: Record<string, number> = {};
  entries.forEach((e) => {
    const movie = MOVIES.find((m) => m.id === e.movieId);
    movie?.genre.forEach((g) => {
      genreCounts[g] = (genreCounts[g] ?? 0) + 1;
    });
  });
  const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxGenreCount = topGenres[0]?.[1] ?? 1;

  const wantToWatch = entries.filter((e) => e.status === "want-to-watch").length;
  const watching = entries.filter((e) => e.status === "watching").length;
  const watched = entries.filter((e) => e.status === "watched").length;

  const topRatedByUser = ratedEntries
    .map((e) => ({ entry: e, movie: MOVIES.find((m) => m.id === e.movieId)! }))
    .filter((x) => x.movie)
    .sort((a, b) => (b.entry.userRating ?? 0) - (a.entry.userRating ?? 0))
    .slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          My <span className="text-indigo-400">Stats</span>
        </h1>
        <p className="text-gray-400">A snapshot of your movie journey.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Tracked", value: entries.length, color: "text-indigo-400", icon: "🎬" },
          { label: "Watched", value: watched, color: "text-green-400", icon: "✅" },
          { label: "Watching", value: watching, color: "text-yellow-400", icon: "▶️" },
          { label: "Want to Watch", value: wantToWatch, color: "text-blue-400", icon: "🔖" },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="bg-gray-800 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-gray-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Time stats */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">⏱️ Time Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total runtime</span>
              <span className="text-white font-medium">{hours}h {mins}m</span>
            </div>
            {avgUserRating && (
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. your rating</span>
                <span className="text-yellow-400 font-medium">★ {avgUserRating}/10</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Movies rated</span>
              <span className="text-white font-medium">{ratedEntries.length}</span>
            </div>
          </div>
        </div>

        {/* Top genres */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🎭 Top Genres</h2>
          <div className="space-y-3">
            {topGenres.map(([genre, count]) => (
              <div key={genre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{genre}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${(count / maxGenreCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top rated by user */}
      {topRatedByUser.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🏆 Your Top Rated</h2>
          <div className="space-y-3">
            {topRatedByUser.map(({ entry, movie }, i) => (
              <div key={movie.id} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-600 w-6 text-center">{i + 1}</span>
                <span className="text-2xl">{movie.poster}</span>
                <div className="flex-1">
                  <Link href={`/movie/${movie.id}`} className="text-white hover:text-indigo-300 font-medium transition-colors">
                    {movie.title}
                  </Link>
                  <p className="text-gray-500 text-sm">{movie.year}</p>
                </div>
                <span className="text-yellow-400 font-bold">★ {entry.userRating}/10</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
