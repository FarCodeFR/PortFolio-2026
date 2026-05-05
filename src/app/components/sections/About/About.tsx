import { useRef } from "react";
import styles from "./About.module.scss";
import { useGSAP, gsap, SplitText } from "@/app/lib/gsap";
import CarouselLogo from "./CarouselLogo";
import Experience from "./Experience";
import Hobby from "./Hobby";
import Reseau from "./Reseau";
import { AboutProps } from "@/app/types/types/about.t";
import { useKeyHandler } from "@/app/hooks/animations/useKeyHandler";

gsap.registerPlugin(useGSAP, SplitText);

function About({ open, setOpen }: AboutProps) {
  // Gestion ouverture fermeture du panel
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Gestion d'apparition des éléments du panel
  const titleHeroAboutRef = useRef<HTMLHeadingElement>(null);
  const bioHeroAboutRef = useRef<HTMLElement>(null);

  // Fermeture avec echape
  useKeyHandler("Escape", () => setOpen(false), open);

  // Container du panel about
  useGSAP(
    () => {
      const overlay = containerRef.current;
      const panel = panelRef.current;
      const title = titleHeroAboutRef.current;
      const bio = bioHeroAboutRef.current;
      const logo = trackRef.current?.querySelectorAll("[data-logo-item]");
      const track = trackRef.current;

      if (
        !overlay ||
        !panel ||
        !title ||
        !bio ||
        !logo?.length ||
        !trackRef.current ||
        !track
      )
        return;

      // Animation Text
      const splitTitle = new SplitText(title, { type: "chars" });
      const splitBio = new SplitText(bio, { type: "lines" });

      // Caroussel
      let carouselTween: gsap.core.Tween | null = null;
      const handleEnterCaroussel = () => {
        carouselTween?.timeScale(0.5);
      };
      const handleLeaveCaroussel = () => {
        carouselTween?.timeScale(1);
      };
      track.addEventListener("mouseenter", handleEnterCaroussel);
      track.addEventListener("mouseleave", handleLeaveCaroussel);

      gsap.killTweensOf([
        overlay,
        panel,
        splitTitle.chars,
        splitBio.lines,
        bio,
        logo,
        trackRef.current,
      ]);

      if (open) {
        overlay.classList.add(styles.visible);

        const tl = gsap.timeline();

        tl.fromTo(
          panel,
          { x: "100%" },
          {
            x: "0%",
            duration: 1.5,
            ease: "power4.out",
          },
        )
          .from(
            splitTitle.chars,
            {
              y: "random(-50, 50)",
              autoAlpha: 0,
              stagger: 0.02,
              duration: 0.6,
            },
            "-=0.35",
          )
          .from(
            splitBio.lines,
            {
              y: 30,
              autoAlpha: 0,
              stagger: 0.05,
            },
            "-=0.45",
          )
          .from(
            logo,
            {
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.08,

              ease: "elastic.out",
            },
            "-=0.2",
          )
          .add(() => {
            if (trackRef.current) {
              carouselTween = gsap.to(trackRef.current, {
                xPercent: -30,
                duration: 10,
                repeat: -1,
                ease: "none",
              });
            }
          });
      } else {
        gsap.to(panel, {
          x: "100%",
          duration: 0.5,
          ease: "expo.in",
          onComplete: () => {
            overlay.classList.remove(styles.visible);
          },
        });
      }
      return () => {
        splitTitle.revert();
        splitBio.revert();
        carouselTween?.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [open],
      revertOnUpdate: true,
    },
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Si on clique exactement sur l'overlay (et pas sur ses enfants)
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleOverlayClick}
      className={styles.container_blure}
    >
      <div ref={panelRef} className={styles.container_about}>
        <button
          type="button"
          aria-label="Fermeture"
          onClick={() => setOpen(false)}
        >
          Fermer
        </button>
        <section className={styles.heros_about}>
          <h1 ref={titleHeroAboutRef}>
            Développeur <br />
            Front-end
          </h1>
          <article ref={bioHeroAboutRef}>
            <p className={styles.bio_title}>BIO</p>
            <p className={styles.bio_description}>
              Développeur web en formation (Mastère Lead Developer à l'ECV
              Nantes), je recherche une alternance pour renforcer mes
              compétences en développement front-end. <br />
              <br /> Mon expérience chez Todo Digital m'a permis de travailler
              sur des projets concrets : intégration de maquettes, gestion de
              sites WordPress, migration, mise en ligne et accompagnement
              client. <br />
              <br /> Cette expérience m'a apporté une vision globale d'un projet
              web. Aujourd'hui, je souhaite me spécialiser davantage en
              développement, notamment en React et JavaScript, au sein d'une
              équipe technique. <br />
              <br /> Curieux, rigoureux et impliqué, je cherche un environnement
              qui me permettra de progresser techniquement et de contribuer à
              des projets concrets.
            </p>
          </article>
        </section>
        <section className={styles.logo_about}>
          <div ref={trackRef} className={styles.logo_track}>
            <CarouselLogo />
            <CarouselLogo />
          </div>
        </section>
        <section>
          <Experience />
        </section>
        <section>
          <Hobby />
        </section>
        <section>
          <Reseau variant="about" />
        </section>
      </div>
    </div>
  );
}
export default About;
