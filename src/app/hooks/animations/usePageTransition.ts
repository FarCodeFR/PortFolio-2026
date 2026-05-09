"use client";

// Fonction de transition des pages
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/app/lib/gsap";

export function usePageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  // Lance une navigation avec animation.
  // Si l'utilisateur est déjà sur la page demandée, on ne fait rien.
  const navigateWithTransition = (href: string) => {
    if (pathname === href) return;

    const overlay = document.querySelector("[data-page-transition]");

    if (!overlay) {
      router.push(href);
      return;
    }

    // Étape 1 : l'overlay grandit depuis le bas pour couvrir la page actuelle.
    // Étape 2 : quand l'écran est couvert, on change de route.
    gsap
      .timeline({
        defaults: {
          duration: 0.7,
          ease: "power4.inOut",
        },
        onComplete: () => {
          router.push(href);
        },
      })
      .set(overlay, {
        scaleY: 0,
        transformOrigin: "bottom",
        autoAlpha: 1,
      })
      .to(overlay, {
        scaleY: 1,
      });
  };

  return { navigateWithTransition };
}
