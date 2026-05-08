import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeFinder — Discover Delicious Recipes",
  description: "Find and explore a curated collection of delicious recipes for every meal and occasion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-gray-100 bg-white mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-gray-400">
            🍽️ RecipeFinder — Made with Next.js &amp; Tailwind CSS
          </div>
        </footer>
      </body>
    </html>
  );
}
