"use client";

import Link from "next/link";
import { usePageTransition } from "@/app/hooks/animations/usePageTransition";

// Composant de lien interne avec transition.
// Il remplace Link quand on veut une animation entre deux pages.
// Il intercepte le clic, empêche la navigation immédiate,
// puis utilise usePageTransition pour lancer l'animation avant router.push().
export default function TransitionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { navigateWithTransition } = usePageTransition();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
