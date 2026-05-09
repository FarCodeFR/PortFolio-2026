// app/context/TransitionContext.tsx
"use client";
import { createContext, useContext, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/app/lib/gsap";

interface TransitionContextType {
  navigateTo: (href: string) => void;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  overlayRef2: React.RefObject<HTMLDivElement | null>;
}

// Partage l'overlay et navigateTo entre SiteShell, PageTransition,
const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayRef2 = useRef<HTMLDivElement | null>(null);

  const navigateTo = (href: string) => {
    if (href === pathname) return;
    // Reset les deux overlays au départ
    gsap.set([overlayRef.current, overlayRef2.current], {
      scaleY: 0,
      transformOrigin: "bottom",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([overlayRef.current, overlayRef2.current], {
          transformOrigin: "top",
        });
        router.push(href);
      },
    });

    tl.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: "power3.inOut",
    }).to(
      overlayRef2.current,
      {
        scaleY: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.3",
    );
  };
  return (
    <TransitionContext.Provider value={{ navigateTo, overlayRef, overlayRef2 }}>
      {children}
    </TransitionContext.Provider>
  );
}

// Erreur
export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used inside TransitionProvider");
  return ctx;
};
