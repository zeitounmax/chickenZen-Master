import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChickZen Master | 混合鸡禅师',
  description: 'Gérez votre élevage de poules avec sagesse',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white relative`}>
        <div className="fixed inset-0 chinese-pattern opacity-[0.03] pointer-events-none" />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
