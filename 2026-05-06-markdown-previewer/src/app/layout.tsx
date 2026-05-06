import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarkdownFlow – Live Markdown Previewer",
  description: "Write, preview, and export Markdown in real-time with beautiful syntax highlighting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0f1117] text-slate-200">
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#0f1117]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white hover:text-indigo-400 transition-colors">
              <span className="text-2xl">📝</span>
              <span>MarkdownFlow</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link href="/" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                Home
              </Link>
              <Link href="/editor" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                Editor
              </Link>
              <Link href="/templates" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                Templates
              </Link>
              <Link href="/editor" className="ml-2 px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all font-medium">
                Open Editor →
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
