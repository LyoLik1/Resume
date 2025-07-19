"use client";
import { Sofia_Sans_Semi_Condensed } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';

const sofiaSans = Sofia_Sans_Semi_Condensed({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sofia-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="ru" className={sofiaSans.variable} suppressHydrationWarning>
      <body className={sofiaSans.className} suppressHydrationWarning>
        <ThemeProvider>
          {loading ? <Preloader /> : children}
        </ThemeProvider>
      </body>
    </html>
  );
}