import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeBrowse — Discover & Cook",
  description: "Explore hundreds of recipes from around the world, filtered by category and searchable by ingredient.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#fffbf5] text-[#1a1a1a]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-orange-100 py-6 text-center text-sm text-orange-400">
          © 2026 RecipeBrowse — Made with Next.js &amp; Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
