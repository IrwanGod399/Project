import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dice Roller — Roll Any Die",
  description: "A modern dice rolling app with history tracking and classic game guides",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} min-h-full bg-gray-950 text-white antialiased`}>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
