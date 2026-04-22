// src/app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.scss";
import { Anton, Bricolage_Grotesque } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio | Timothé",
  description: "Développeur Front-end - Portfolio",
  verification: {
    google: "lPh2JnaUbeZFSaBVArPkhEGZ7blb-ZGXigjZeUx0TI0",
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
