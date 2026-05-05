import styles from "./ProjectGrid.module.scss";
import { useRef, useState } from "react";
import { useGSAP, gsap } from "@/app/lib/gsap";
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

  // Data des projets
  const projectsCode = dataProjects[0].Code_projects ?? [];
  const projectsCms = dataProjects[0].Cms_projects ?? [];

  // currentView contrôle quelles cartes sont dans le DOM.
  // Il ne change que dans le onComplete de GSAP, jamais directement au clic,
  // pour garantir que React ne remplace les cartes qu'après l'animation de sortie.
  const [currentView, setCurrentView] = useState<"CODE" | "CMS">("CODE");
  const [isAnimatingView, setAnimatingView] = useState(false);

  // Ref pour stocker la destination du switch sans déclencher de re-render.
  const nextViewRef = useRef<"CODE" | "CMS">("CODE");

  // Bloque les interactions jusqu'à la fin de l'animation d'entrée
  const [isReady, setIsReady] = useState(false);

  // Animation d'entrée : les cartes partent en forme de bulle et s'étirent jusqu'à leur forme finale.
  // Attend la fin de l'intro parente (introDone) avant de se lancer.
  // revertOnUpdate nettoie l'animation précédente si introDone change en cours de route.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLLIElement>(
        `.${styles.projectCards}`,
      );

      if (!cards.length) return;

      setIsReady(false);

      // Etat initial
      gsap.set(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.1,
        autoAlpha: 1,
        filter: "blur(20px)",
        pointerEvents: "none",
        borderRadius: "999px",
      });

      // Bloque l'animation jusqu'à la fin de l'intro parente
      if (!introDone) {
        return;
      }

      // Timeline de transformation
      const tl_projects_ball = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setIsReady(true),
      });

      tl_projects_ball.to(cards, {
        scale: 1,
        filter: "blur(0px)",
        borderRadius: "0px",
        pointerEvents: "auto",
        duration: 1,
        stagger: 0.2,
      });
    },
    {
      scope: containerProjectRef,
      dependencies: [introDone],
      revertOnUpdate: true,
    },
  );

  // Fait sortir la grille vers la gauche quand un projet est sélectionné,
  // et la ramène à sa position initiale quand on revient.
  useGSAP(() => {
    if (selectedProject !== null) {
      gsap.to(containerProjectRef.current, {
        x: "-100%",
        scale: 0.5,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(containerProjectRef.current, {
        x: "0%",
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [selectedProject]);

  // Déplace le titre h2 vers le bas de la carte au hover via elastic,
  // et le ramène en position initiale au leave.
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

  // Stocke la destination et déclenche l'animation de sortie.
  const handleSwitchListView = (mode: "CODE" | "CMS") => {
    if (!isReady || isAnimatingView || mode === currentView) return;
    setAnimatingView(true);
    nextViewRef.current = mode;
  };

  // Switch l'affichage des projets en fonction de la vue
  const currentProjects = currentView === "CODE" ? projectsCode : projectsCms;

  // Anime l'entrée des nouvelles cartes quand l'utilisateur switche entre CODE et CMS dans les deux sens.
  // isReady empêche ce useGSAP de tourner pendant l'animation bulle initiale.
  useGSAP(
    () => {
      if (!isReady) return;

      // Récupère la classe
      const itemProject = gsap.utils.toArray<HTMLLIElement>(
        `.${styles.projectCards}`,
      );

      const tl_list_projects = gsap.timeline({
        defaults: { ease: "sine.inOut" },
      });

      if (isAnimatingView) {
        tl_list_projects.fromTo(
          itemProject,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            clipPath: "inset(100% 0% 0% 0%)",
            onComplete: () => {
              setCurrentView(nextViewRef.current);
              setAnimatingView(false);
            },
            stagger: { amount: 0.3, from: "random" },
          },
        );
      } else if (!isAnimatingView) {
        tl_list_projects.fromTo(
          itemProject,
          {
            autoAlpha: 0.4,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: { amount: 0.3, from: "random" },
          },
        );
      }
    },
    {
      scope: containerProjectRef,
      dependencies: [currentView, isAnimatingView],
    },
  );
  return (
    <section ref={containerProjectRef} className={styles.projectGrid}>
      <div className={styles.containerHomeProject}>
        <h1 className={styles.t_home}>Projects</h1>
        <div className={styles.viewListProjectHome}>
          <button
            type="button"
            onClick={() => handleSwitchListView("CODE")}
            className={currentView === "CODE" ? styles.activeViewProject : ""}
          >
            CODE
          </button>
          <p>|</p>
          <button
            type="button"
            onClick={() => handleSwitchListView("CMS")}
            className={currentView === "CMS" ? styles.activeViewProject : ""}
          >
            CMS
          </button>
        </div>
      </div>
      <ul ref={projectsListRef} className={styles.listProject}>
        {currentProjects.map((el) => (
          <li
            key={el.id}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(el.id);
              }
            }}
            onFocus={(e) => handleEnter(el.id, e.currentTarget)}
            tabIndex={isReady && !isAnimatingView ? 0 : -1} // -1 = exclu du tab quand caché
            aria-label={`Ouvrir le projet ${el.title}`}
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
                      loading="eager"
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
