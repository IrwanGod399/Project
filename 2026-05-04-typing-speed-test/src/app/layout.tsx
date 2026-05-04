import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeRacerPro — Test Your Typing Speed",
  description: "Test your typing speed and accuracy with common words, programming terms, and famous quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f0f1a] text-slate-100">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-800 py-4 text-center text-slate-600 text-xs">
          TypeRacerPro — Built with Next.js & Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
