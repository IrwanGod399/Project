"use client";

import { useState, useEffect } from "react";
import { MOVIES, ALL_GENRES, Genre } from "@/lib/movies";
import { addToWatchlist, removeFromWatchlist, getWatchlist } from "@/lib/watchlist";
import MovieCard from "@/components/MovieCard";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);

  useEffect(() => {
    setWatchlistIds(getWatchlist().map((e) => e.movieId));
  }, []);

  const handleToggle = (id: number) => {
    if (watchlistIds.includes(id)) {
      removeFromWatchlist(id);
      setWatchlistIds((prev) => prev.filter((x) => x !== id));
    } else {
      addToWatchlist(id);
      setWatchlistIds((prev) => [...prev, id]);
    }
  };

  const filtered = MOVIES.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.director.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || m.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "year") return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Browse <span className="text-indigo-400">Movies</span>
        </h1>
        <p className="text-gray-400">Discover films and build your personal watchlist.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by title or director..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value as Genre | "All")}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Genres</option>
          {ALL_GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "rating" | "year" | "title")}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="rating">Sort: Rating</option>
          <option value="year">Sort: Year</option>
          <option value="title">Sort: Title</option>
        </select>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        {filtered.length} movie{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-3">🎞️</div>
          <p className="text-lg">No movies match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              inWatchlist={watchlistIds.includes(movie.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
