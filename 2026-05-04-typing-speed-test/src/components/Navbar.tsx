"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/test", label: "Type" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className="border-b border-slate-800 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-amber-400 font-bold text-xl tracking-wider">
          <span className="text-2xl">⌨</span>
          <span>TypeRacer<span className="text-slate-500">Pro</span></span>
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-amber-400 border-b-2 border-amber-400 pb-1"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
