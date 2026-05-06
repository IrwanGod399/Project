"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍳</span>
          <span className="font-bold text-xl text-orange-600 group-hover:text-orange-700 transition-colors">
            RecipeBrowse
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {[
            { href: "/", label: "Home" },
            { href: "/browse", label: "Browse" },
            { href: "/favorites", label: "Favorites" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
