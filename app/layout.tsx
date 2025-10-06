import "./assets/css/main.css";
import type { Metadata } from "next";
import { Allura, Alex_Brush, Satisfy, Kaushan_Script, Cormorant_Garamond, Permanent_Marker } from 'next/font/google';
import localFont from 'next/font/local';

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'optional',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-alex-brush',
  display: 'optional',
});

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-satisfy',
  display: 'optional',
});

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kaushan',
  display: 'optional',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
  display: 'swap',
});

const alvaraSans = localFont({
  src: [
    {
      path: '../public/fonts/AlvaraSansDEMO-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/AlvaraSansDEMO-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-alvara-sans',
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
      <body className={`${allura.variable} ${alexBrush.variable} ${satisfy.variable} ${kaushan.variable} ${cormorant.variable} ${permanentMarker.variable} ${alvaraSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
