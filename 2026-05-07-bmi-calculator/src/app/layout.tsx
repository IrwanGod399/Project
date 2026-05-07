import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI Calculator – Know Your Health",
  description: "Calculate your Body Mass Index, track history, and get personalised health insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="py-4 text-center text-slate-500 text-sm">
          BMI Calculator &copy; {new Date().getFullYear()} — for informational purposes only.
        </footer>
      </body>
    </html>
  );
}
