import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "CountDown — Track Your Upcoming Events",
  description: "Beautiful countdown timers for all your important events and milestones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-slate-950 text-white antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
