"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Stopwatch" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-slate-800 bg-[#0d0d16]">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-lg tracking-tight text-violet-400">
          ⏱ ChronoTrack
        </span>
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
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
