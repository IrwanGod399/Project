"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Timer" },
  { href: "/stats", label: "Stats" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0f0f1a]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍅</span>
        <span className="font-bold text-white text-lg tracking-tight">Pomodoflow</span>
      </div>
      <div className="flex gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              pathname === link.href
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
