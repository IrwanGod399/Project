import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Scramble Game",
  description: "Unscramble letters, race against the clock, and climb the leaderboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-white">
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
              <span className="text-2xl">🔤</span>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                WordScramble
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/game"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                Play
              </Link>
              <Link
                href="/leaderboard"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                Leaderboard
              </Link>
              <Link
                href="/rules"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                Rules
              </Link>
              <Link
                href="/game"
                className="ml-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-500"
              >
                New Game
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 px-6 py-4 text-center text-xs text-gray-600">
          Word Scramble Game · Built with Next.js &amp; Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
