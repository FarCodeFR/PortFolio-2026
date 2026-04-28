import styles from "./ProjectGrid.module.scss";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import dataProjects from "@/app/data/project_info.json";

interface ProjectProps {
  setSelectedProject: (n: number) => void;
  selectedProject: number | null;
  introDone: boolean;
}

function ProjectGrid({
  setSelectedProject,
  selectedProject,
  introDone,
}: ProjectProps) {
  const [isActive, setIsActive] = useState<number | null>(null);
  const containerProjectRef = useRef<HTMLDivElement>(null);
  const projectsListRef = useRef<HTMLUListElement>(null);
  const projects = dataProjects[0].Home_projects ?? [];

  // Play animation
  const [isReady, setIsReady] = useState(false);

  // Animation d'apparition des cartes projets
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLLIElement>(
        `.${styles.projectCards}`,
      );

      if (!cards.length) return;

      setIsReady(false);

      // Position initial
      gsap.set(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.1,
        autoAlpha: 1,
        filter: "blur(20px)",
        pointerEvents: "none",
        borderRadius: "999px",
        boxShadow:
          "0 -24px 60px rgba(255,255,255,0.28), 0 28px 80px rgba(0,0,0,0.22)",
      });

      // Fin de l'intro continue l'animation
      if (!introDone) return;

      const tl_projects_ball = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setIsReady(true),
      });
      (tl_projects_ball.to(cards, {
        scale: 0.22,
        filter: "blur(18px)",
        boxShadow:
          "0 -34px 90px rgba(255,255,255,0.38), 0 38px 110px rgba(0,0,0,0.2)",
        duration: 0.5,
        stagger: 0.1,
        ease: "sine.inOut",
      }),
        tl_projects_ball.to(
          cards,
          {
            scale: 0.18,
            filter: "blur(22px)",
            boxShadow:
              "0 -20px 65px rgba(255,255,255,0.28), 0 28px 85px rgba(0,0,0,0.18)",
            duration: 0.4,
            stagger: 0.08,
            ease: "sine.inOut",
          },
          "-=0.35",
        ));
      tl_projects_ball.to(cards, {
        scale: 1,
        filter: "blur(0px)",
        borderRadius: "0px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.10), 0 0 0 rgba(255,255,255,0)",
        pointerEvents: "auto",
        duration: 1.4,
        stagger: 0.12,
      });
    },
    {
      scope: containerProjectRef,
      dependencies: [introDone],
      revertOnUpdate: true,
    },
  );

  // Gere le hover et le clic des cartes
  useGSAP(() => {
    if (selectedProject !== null) {
      // Lance l'animation
      gsap.to(containerProjectRef.current, {
        x: "-100%",
        scale: 0.5,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      // Animation de retour
      gsap.to(containerProjectRef.current, {
        x: "0%",
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [selectedProject]);

  const animateTitle = (el: HTMLLIElement, state: "enter" | "leave") => {
    const title = el.querySelector("h2");
    if (!title) return;

    gsap.killTweensOf(title);

    if (state === "enter") {
      gsap.to(title, {
        y: el.clientHeight - 100,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(0.8,0.3)",
      });
    } else {
      gsap.to(title, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  const handleEnter = (id: number, el: HTMLLIElement) => {
    if (!isReady) return;
    setIsActive(id);
    animateTitle(el, "enter");
  };

  const handleLeave = (el: HTMLLIElement) => {
    if (!isReady) return;
    animateTitle(el, "leave");
    setIsActive(null);
  };

  return (
    <section ref={containerProjectRef} className={styles.projectGrid}>
      <h1 className={styles.t_home}>Projects</h1>
      <ul ref={projectsListRef} className={styles.listProject}>
        {projects?.map((el) => (
          <li
            key={el.id}
            onMouseEnter={(e) => handleEnter(el.id, e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            onClick={() => setSelectedProject(el.id)}
            className={[
              styles.projectCards,
              isActive === el.id && styles.activeCard,
              isActive !== null && isActive !== el.id && styles.inactiveCard,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <h2>{el.title}</h2>
            <Image
              src={
                isActive === el.id && el.hoverImage ? el.hoverImage : el.image
              }
              alt={el.title}
              loading="eager"
              width={1200}
              height={600}
              priority
              quality={75}
            />
            {el.imageMobile && el.imageMobile.length > 0 && (
              <ul className={styles.mobileImages}>
                {el.imageMobile.map((src, index) => (
                  <li key={index} className={styles[`mobileImage_${index}`]}>
                    <Image
                      src={src}
                      alt={`${el.title} mobile ${index + 1}`}
                      width={200}
                      height={400}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectGrid;
