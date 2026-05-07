"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold gradient-text">UnitFlow</span>
          </Link>
          <div className="flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>
            <NavLink href="/history" active={pathname === "/history"}>History</NavLink>
            <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
