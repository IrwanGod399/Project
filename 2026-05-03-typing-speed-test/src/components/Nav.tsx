"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/test", label: "Test" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className="border-b border-slate-800 bg-[#0f0f1a]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-violet-400 font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="text-2xl">⌨</span>
          <span>TypeRacer</span>
        </Link>
        <div className="flex gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                path === href
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
