import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UnitFlow — Universal Unit Converter",
  description: "Convert between any units instantly — length, weight, temperature, volume, speed, area, data, and pressure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#0f0f1a] text-[#e8e8f0]`}>
        <Navbar />
        <main className="flex-1 bg-grid">
          {children}
        </main>
        <footer className="text-center py-6 text-sm text-gray-500 border-t border-white/5">
          <span className="gradient-text font-semibold">UnitFlow</span>
          {" "}— Built with Next.js & Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
