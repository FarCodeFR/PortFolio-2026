"use client";

import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/app/lib/gsap";

//  Phase de "Sortie" de la page :
//  Intercepte la navigation pour animer les panneaux vers le haut fermeture du rideau.
//  Une fois que l'écran est totalement recouvert par les panneaux, déclenche
//  physiquement le changement de route via le routeur de Next.js.
export function usePageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateWithTransition = (href: string) => {
    if (pathname === href) return;

    const panels = document.querySelectorAll("[data-page-transition-panel]");

    if (!panels.length) {
      router.push(href);
      return;
    }

    gsap
      .timeline({
        defaults: {
          duration: 0.6,
          ease: "power4.inOut",
        },
        onComplete: () => {
          router.push(href);
        },
      })
      .set(panels, {
        scaleY: 0,
        transformOrigin: "bottom",
        autoAlpha: 1,
      })
      .to(panels, {
        scaleY: 1,
        stagger: {
          amount: 0.25,
          from: "center",
        },
      });
  };

  return { navigateWithTransition };
}
