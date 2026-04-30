import { useGSAP, gsap, SplitText } from "@/app/lib/gsap";
import { UseHeaderAnimationParams } from "@/app/types/types/gsap.t";

export function useHeaderIntroAnimation({
  nameRef,
  statusRef,
  headerRef,
  timeRef,
  linkRef,
  setIntroDone,
}: UseHeaderAnimationParams) {
  useGSAP(
    () => {
      if (
        !nameRef.current ||
        !statusRef.current ||
        !headerRef.current ||
        !timeRef.current ||
        !linkRef.current
      )
        return;
      const hd_split = new SplitText(nameRef.current, { type: "chars" });
      const hd_navLinks = linkRef.current.querySelectorAll(
        "li",
      ) as NodeListOf<HTMLLIElement>;
      const headerTl = gsap.timeline();

      headerTl
        .from(hd_split.chars, {
          autoAlpha: 0,
          y: 8,
          stagger: 0.03,
          duration: 0.2,
          ease: "power2.out",
        })
        .from(
          statusRef.current,
          {
            autoAlpha: 0,
            y: 2,
            duration: 0.3,
            ease: "power2.out",
          },
          "+=0.2",
        )
        .from(
          hd_navLinks,
          {
            autoAlpha: 0,
            y: -4,
            stagger: 0.08,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .from(
          timeRef.current,
          {
            autoAlpha: 0,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(statusRef.current, {
          color: "#6ee7b7",
          duration: 0.3,
          ease: "sine.in",
        })
        // Lance la function du projectGrid en avance
        .call(
          () => {
            setIntroDone(true);
          },
          [],
          "-=0.8",
        )
        .to(statusRef.current, {
          color: "#a8a9ab",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });
      // Nettoie SplitText dans le DOM
      return () => {
        hd_split.revert();
      };
    },
    { scope: headerRef },
  );
}
