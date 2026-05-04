import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Palettify — Color Palette Generator',
  description: 'Generate beautiful color palettes with multiple harmony modes. Save, explore, and export your favorite combinations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8f9fc] font-[var(--font-geist-sans)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 bg-white py-6 mt-12">
          <p className="text-center text-sm text-gray-400">
            Palettify &mdash; Built with Next.js &amp; Tailwind CSS
          </p>
        </footer>
      </body>
    </html>
  );
}
