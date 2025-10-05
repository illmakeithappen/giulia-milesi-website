import "./assets/css/main.css";
import type { Metadata } from "next";
import { Allura, Alex_Brush, Satisfy, Kaushan_Script, Cormorant_Garamond } from 'next/font/google';

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-alex-brush',
  display: 'swap',
});

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-satisfy',
  display: 'swap',
});

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kaushan',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Giulia Milesi - Art Consultant",
  description: "Art consultancy services specializing in contemporary art curation and collection management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${allura.variable} ${alexBrush.variable} ${satisfy.variable} ${kaushan.variable} ${cormorant.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
