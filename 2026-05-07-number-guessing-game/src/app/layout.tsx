import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "NumQuest - Number Guessing Game",
  description: "A neon-themed number guessing game with multiple difficulty levels and leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "#0a0a1a", color: "#e2e8f0" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
