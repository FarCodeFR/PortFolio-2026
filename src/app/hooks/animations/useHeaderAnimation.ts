import { useGSAP, gsap, SplitText } from "@/app/lib/gsap";
import { UseHeaderAnimationParams } from "@/app/types/types/gsap.t";

export function useHeaderIntroAnimation({
  nameRef,
  statusRef,
  headerRef,
}: UseHeaderAnimationParams) {
  useGSAP(
    () => {
      if (!nameRef.current || !statusRef.current) return;
      const split = new SplitText(nameRef.current, { type: "chars" });
      const headerTl = gsap.timeline();

      headerTl
        .from(split.chars, {
          autoAlpha: 0,
          y: 8,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        })
        .from(statusRef.current, {
          autoAlpha: 0,
          y: 2,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(statusRef.current, {
          color: "#6ee7b7",
          duration: 0.6,
          ease: "sine.in",
        })
        .to(statusRef.current, {
          color: "#a8a9ab",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });
      return () => {
        split.revert();
      };
    },
    { scope: headerRef },
  );
}
