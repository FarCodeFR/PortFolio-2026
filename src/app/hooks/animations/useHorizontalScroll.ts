import { useRef } from "react";
import Lenis from "lenis";
import { useGSAP, gsap, ScrollTrigger } from "@/app/lib/gsap";
import { HomeProjectProps } from "@/app/types/types/global.t";

export default function useHorizontalScroll({
  slideCount,
  projectDetailContentRef,
  isOpen,
}: HomeProjectProps) {
  const wrapperProjectRef = useRef<HTMLDivElement>(null);
  const projectDetailScopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen || !projectDetailContentRef.current) return;

      // Nettoie les ScrollTriggers précédents avant d'en créer de nouveaux,
      // pour éviter les conflits si isOpen toggle est utilisé plusieurs fois.
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const isMobile = window.innerWidth <= 480;

      // Lenis est scopé sur le conteneur du détail projet, pas sur window,
      // pour ne pas interférer avec le scroll global de la page.
      const lenis = new Lenis({
        wrapper: projectDetailContentRef.current,
        content: projectDetailScopeRef.current as HTMLElement,
        orientation: "vertical",
        smoothWheel: true,
      });

      // Synchronise Lenis avec ScrollTrigger pour que le scrub
      // suive le scroll smoothé plutôt que le scroll natif brut.
      lenis.on("scroll", ScrollTrigger.update);

      // Stocke la référence du RAF pour pouvoir la retirer proprement au cleanup.
      const lenisRaf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);

      // Désactive le lag smoothing de GSAP pour éviter les sauts
      gsap.ticker.lagSmoothing(0);

      // Le scroll horizontal n'existe qu'en desktop —
      // sur mobile, le contenu défile verticalement.
      if (!isMobile) {
        gsap.to(wrapperProjectRef.current, {
          x: `-${(slideCount - 1) * 100}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperProjectRef.current,
            pin: true,
            scrub: true,
            end: `+=${(slideCount - 1) * 100}%`,
            scroller: projectDetailContentRef.current,
            // Recalcule les dimensions si la fenêtre est redimensionnée
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (slideCount - 1),
              duration: { min: 0.2, max: 0.4 },
              delay: 0.03,
              ease: "power2.inOut",
              inertia: false,
            },
          },
        });
      }

      ScrollTrigger.refresh();

      // Cleanup : détruit Lenis et retire son RAF du ticker GSAP
      // pour éviter les memory leaks quand le détail projet se ferme.
      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenisRaf);
      };
    },
    { dependencies: [isOpen] },
  );

  return { wrapperProjectRef, projectDetailScopeRef };
}
