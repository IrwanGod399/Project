import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "QuoteVerse – Daily Inspiration",
  description:
    "Discover inspiring quotes across motivation, wisdom, life, success, creativity and mindfulness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f8f7ff]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-purple-100 bg-white/60 py-4 text-center text-sm text-gray-400">
          QuoteVerse &copy; {new Date().getFullYear()} — Inspire yourself every day
        </footer>
      </body>
    </html>
  );
}
