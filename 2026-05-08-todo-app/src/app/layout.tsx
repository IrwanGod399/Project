import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskly – Smart Todo App",
  description: "A beautiful, feature-rich todo app to manage your tasks with style.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen antialiased`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">{children}</main>
      </body>
    </html>
  );
}
