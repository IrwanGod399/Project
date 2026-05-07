"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/game", label: "Play" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-50" style={{ background: "rgba(10,10,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(124,58,237,0.3)" }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-xl font-bold neon-text" style={{ color: "#a78bfa" }}>NumQuest</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: active ? "rgba(124,58,237,0.25)" : "transparent",
                  color: active ? "#a78bfa" : "#94a3b8",
                  border: active ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
