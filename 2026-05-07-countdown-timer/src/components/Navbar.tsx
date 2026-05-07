"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">⏳</span>
          <span className="text-xl font-bold text-white tracking-tight">
            Count<span className="text-violet-400">Down</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              pathname === "/"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Events
          </Link>
          <Link
            href="/add"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              pathname === "/add"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            + Add Event
          </Link>
        </div>
      </div>
    </nav>
  );
}
