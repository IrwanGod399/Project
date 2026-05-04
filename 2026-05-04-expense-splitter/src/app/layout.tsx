import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SplitWise Lite – Expense Splitter",
  description: "Split bills and track group expenses easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 hover:text-indigo-700 transition-colors">
              <span className="text-2xl">💸</span>
              <span>SplitWise Lite</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">Split bills, not friendships</span>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
          SplitWise Lite · Built with Next.js &amp; Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
