'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Generator' },
    { href: '/saved', label: 'Saved' },
    { href: '/explore', label: 'Explore' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'].map((c) => (
              <div key={c} className="w-2.5 h-5 rounded-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Palettify</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
