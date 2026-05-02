import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FlashMind — Flashcard Study App",
  description: "Study smarter with interactive flashcard decks on any topic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0f0f13] text-[#e8e8f0]">
        <header className="border-b border-white/10 bg-[#0f0f13]/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30">
                F
              </div>
              <span className="font-semibold text-white tracking-tight">FlashMind</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Decks</Link>
              <Link
                href="/decks"
                className="hover:text-white transition-colors"
              >
                Browse
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-4 text-center text-sm text-white/30">
          FlashMind © {new Date().getFullYear()} — Study smarter, not harder.
        </footer>
      </body>
    </html>
  );
}
