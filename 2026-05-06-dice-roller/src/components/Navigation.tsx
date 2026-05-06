"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",        label: "Roll Dice",    icon: "🎲" },
  { href: "/history", label: "History",      icon: "📊" },
  { href: "/games",   label: "Games Guide",  icon: "🎮" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl select-none">🎲</span>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            DiceRoller
          </span>
        </div>
        <div className="flex gap-1">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === href
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
