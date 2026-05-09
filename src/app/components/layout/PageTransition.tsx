"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP, gsap } from "@/app/lib/gsap";
import styles from "./PageTransition.module.scss";

// Fonction animation lorsqu'on change de page
export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      gsap.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.7,
        ease: "power4.inOut",
      });
    },
    { dependencies: [pathname], scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      data-page-transition
      className={styles.page_transition}
    />
  );
}
