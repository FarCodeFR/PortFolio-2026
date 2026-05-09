// app/components/layout/PageTransition.tsx
"use client";
import { useGSAP, gsap } from "@/app/lib/gsap";
import { useTransition } from "@/app/context/TransitionContext";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function PageTransition() {
  const { overlayRef, overlayRef2 } = useTransition();
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Se redéclenche à chaque changement de route car pathname est en dépendance.
  // SiteShell étant un layout persistant, useGSAP ne se remonte jamais —
  // sans dependencies, l'animation ne jouerait qu'une seule fois.
  useGSAP(
    () => {
      // Au premier rendu on skip ( chargement initial ou de la page)
      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.set(overlayRef.current, { scaleY: 0, autoAlpha: 0 });
        return;
      }
      // Lors de la navigation — anime les DEUX en ordre inverse
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef2.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 0.5, ease: "power3.inOut", delay: 0.05 },
      ).fromTo(
        overlayRef.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 0.6, ease: "power3.inOut" },
        "-=0.3", // ← overlap, démarre avant la fin du premier
      );
    },
    { dependencies: [pathname] },
  );

  return (
    <section>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#26282c",
          zIndex: 9999,
          transform: "scaleY(0)",
        }}
      />
      <div
        ref={overlayRef2}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#faa916",
          zIndex: 99999,
          transform: "scaleY(0)",
        }}
      />
    </section>
  );
}
