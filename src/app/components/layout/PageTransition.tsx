"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP, gsap } from "@/app/lib/gsap";
import styles from "./PageTransition.module.scss";

export default function PageTransition() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = containerRef.current?.querySelectorAll(
        "[data-page-transition-panel]",
      );

      if (!panels?.length) return;

      gsap.to(panels, {
        scaleY: 0,
        transformOrigin: "right",
        duration: 0.6,
        ease: "power4.inOut",
        stagger: {
          amount: 0.25,
          axis: "x",
          from: "center",
        },
      });
    },
    {
      dependencies: [pathname],
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      data-page-transition
      className={styles.page_transition}
      aria-hidden="true"
    >
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
      <span
        data-page-transition-panel
        className={styles.page_transition_panel}
      />
    </div>
  );
}
