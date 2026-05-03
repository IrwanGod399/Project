import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TypeRacer | Typing Speed Test",
  description: "Test and improve your typing speed and accuracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-jetbrains), 'Courier New', monospace" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="text-center py-4 text-slate-600 text-sm border-t border-slate-800">
          TypeRacer — sharpen your fingers, sharpen your mind
        </footer>
      </body>
    </html>
  );
}
