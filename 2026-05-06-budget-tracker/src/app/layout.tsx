import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/lib/store";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BudgetWise – Personal Budget Tracker",
  description: "Track your income and expenses with style",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-950 text-white min-h-screen`}>
        <StoreProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
