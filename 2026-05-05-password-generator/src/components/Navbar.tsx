"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Generator" },
  { href: "/history", label: "History" },
  { href: "/tips", label: "Security Tips" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-400 hover:text-indigo-300 transition-colors">
          <span className="text-2xl">🔐</span>
          PassForge
        </Link>
        <ul className="flex gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
