import { useRef } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WeatherAppProps } from "@/app/types/types/global.t";

export default function useHorizontalScroll({
  slideCount,
  projectDetailContentRef,
  isOpen,
}: WeatherAppProps) {
  const wrapperProjectRef = useRef<HTMLDivElement>(null);
  const projectDetailScopeRef = useRef<HTMLDivElement>(null);

  if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }

  useGSAP(
    () => {
      if (!isOpen || !projectDetailContentRef.current) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      const isMobile = window.innerWidth <= 480;

      const lenis = new Lenis({
        wrapper: projectDetailContentRef.current,
        content: projectDetailScopeRef.current as HTMLElement,
        orientation: "vertical",
        smoothWheel: true,
      });

      // Connecte Lenis à ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);
      // gsap.ticker.add((time) => lenis.raf(time * 1000));
      const lenisRaf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);

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

      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenisRaf);
      };
    },
    { dependencies: [isOpen] },
  );

  return { wrapperProjectRef, projectDetailScopeRef };
}
