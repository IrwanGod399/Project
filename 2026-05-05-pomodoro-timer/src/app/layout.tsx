import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pomodoflow — Focus Timer",
  description: "A beautiful Pomodoro timer to boost your productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0f0f1a]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
