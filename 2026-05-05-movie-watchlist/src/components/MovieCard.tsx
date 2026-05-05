"use client";

import Link from "next/link";
import { Movie } from "@/lib/movies";

interface Props {
  movie: Movie;
  inWatchlist: boolean;
  onToggle: (id: number) => void;
}

export default function MovieCard({ movie, inWatchlist, onToggle }: Props) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 h-40 flex items-center justify-center text-7xl">
        {movie.poster}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/movie/${movie.id}`} className="font-bold text-white text-lg leading-tight hover:text-indigo-300 transition-colors">
            {movie.title}
          </Link>
          <span className="text-yellow-400 font-semibold text-sm whitespace-nowrap">★ {movie.rating}</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">
          {movie.year} · {movie.runtime}m · {movie.director}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.map((g) => (
            <span key={g} className="bg-indigo-700/50 text-indigo-200 text-xs px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 flex-1 mb-4">{movie.synopsis}</p>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/movie/${movie.id}`}
            className="flex-1 text-center text-sm py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => onToggle(movie.id)}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${
              inWatchlist
                ? "bg-red-700/60 hover:bg-red-700 text-red-200"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {inWatchlist ? "Remove" : "+ Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
