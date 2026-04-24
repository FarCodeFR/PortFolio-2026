// src/app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.scss";
import { Anton, Bricolage_Grotesque } from "next/font/google";

export const metadata: Metadata = {
  title: "Timothé Renard – Développeur Front-end React / TypeScript",
  description:
    "Développeur front-end orienté React et TypeScript, en recherche d'alternance. Découvrez mes projets :  Weather App, Mazinger, Casse-croûte",
  keywords: [
    "Timothé Renard",
    "portfolio",
    "développeur front-end",
    "React",
    "TypeScript",
    "alternance",
    "développeur web",
  ],
  authors: [{ name: "Timothé Renard" }],
  verification: {
    google: "lPh2JnaUbeZFSaBVArPkhEGZ7blb-ZGXigjZeUx0TI0",
  },
  openGraph: {
    title: "Timothé Renard – Développeur Front-end React / TypeScript",
    description:
      "Développeur front-end orienté React et TypeScript, en recherche d'alternance. Découvrez mes projets : Weather App, Mazinger, Casse-croûte",
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
