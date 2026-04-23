// src/app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.scss";
import { Anton, Bricolage_Grotesque } from "next/font/google";

export const metadata: Metadata = {
  title: "Timothé – Portfolio Développeur Front-end",
  description:
    "Portfolio de Timothé, développeur Front-end. Découvrez mes projets et réalisations web.",
  keywords: [
    "Timothé",
    "Timothe",
    "portfolio",
    "développeur front-end",
    "développeur web",
  ],
  authors: [{ name: "Timothé" }],
  verification: {
    google: "lPh2JnaUbeZFSaBVArPkhEGZ7blb-ZGXigjZeUx0TI0",
  },
  openGraph: {
    title: "Timothé – Portfolio Développeur Front-end",
    description: "Portfolio de Timothé, développeur Front-end.",
    url: "https://timothe.vercel.app",
    type: "website",
  },
};

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
