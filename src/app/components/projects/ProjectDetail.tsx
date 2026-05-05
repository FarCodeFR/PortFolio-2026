"use client";

import { useGSAP, gsap } from "@/app/lib/gsap";
import { useRef } from "react";
import styles from "./ProjectDetail.module.scss";
import Mazinger from "./Mazinger/Mazinger";
import Cassecroute from "./Casse_croute/CasseCroute";
import { HomeProjectProps } from "@/app/types/types/global.t";
import WeatherApp from "./WeatherApp/WeatherApp";
import Image from "next/image";
import Three from "./Three/Three";
import BreakinGood from "./Breakin_good/BreakinGood";
import Inventeur from "./Inventeur/Inventeur";
import Enjeux from "./Enjeux/Enjeux";

interface DetailPorps {
  selectedProject: number | null;
  setSelectedProject: (n: number) => void;
}

function ProjectDetail({ selectedProject, setSelectedProject }: DetailPorps) {
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const projectDetailContentRef = useRef<HTMLDivElement>(null);
  const projectContentTransitionRef = useRef<HTMLDivElement>(null);
  const isFirstOpenRef = useRef(true);
  const projectInfoRef = useRef<HTMLDivElement>(null);

  // Components
  const projectComponents: Record<number, React.FC<HomeProjectProps>> = {
    1: WeatherApp,
    2: Mazinger,
    3: Cassecroute,
    4: Three,
    5: BreakinGood,
    6: Inventeur,
    7: Enjeux,
  };
  const Component = selectedProject ? projectComponents[selectedProject] : null;

  // Nombre de slide
  const projectSlideCounts: Record<number, number> = {
    1: 4,
    2: 5,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
  };

  useGSAP(
    () => {
      // Slide droite
      if (selectedProject !== null && isFirstOpenRef.current) {
        // Premiere ouverture > slide à droite
        isFirstOpenRef.current = false;

        // Information des projects slide 1
        // sélectionne tous les éléments enfant de projectInfoRef, sous forme de tableau exploitable par GSAP
        const infoItems = gsap.utils.toArray<HTMLElement>(
          ".project-info-item",
          projectInfoRef.current,
        );
        // Timeline des information des projects
        const tl_info_project = gsap.timeline({
          defaults: { ease: "power3.inOut" },
        });

        tl_info_project
          .fromTo(
            projectDetailRef.current,
            {
              x: "100%",
            },
            {
              x: "0%",
              duration: 1,
              ease: "power3.inOut",
            },
          )
          .fromTo(
            infoItems,
            {
              y: 60,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.08,
            },
            "-=0.35",
          );
      } else // Slide Gauche
      {
        if (selectedProject === null) {
          // Fermeture > slide out vers la droite
          isFirstOpenRef.current = true;
          gsap.to(projectDetailRef.current, {
            x: "100%",
            duration: 1,
            ease: "power3.out",
          });
        }
      }
    },
    { dependencies: [selectedProject], scope: projectDetailRef },
  );

  const handleChangeProject = () => {
    if (selectedProject === null) return;
    const nextProject = selectedProject + 1 > 7 ? 1 : selectedProject + 1;
    gsap.to(projectContentTransitionRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setSelectedProject(nextProject);
        if (projectDetailContentRef.current) {
          projectDetailContentRef.current.scrollTo(0, 0);
        }
        gsap.fromTo(
          projectContentTransitionRef.current,
          {
            x: "100%",
          },
          {
            x: "0%",
            duration: 0.5,
            ease: "sine.inOut",
          },
        );
      },
    });
  };

  return (
    <div
      ref={projectDetailRef}
      className={styles.container_modal_project_detail}
    >
      <div
        ref={projectDetailContentRef}
        className={styles.container_project_detail}
      >
        <div ref={projectContentTransitionRef}>
          {Component && (
            <Component
              projectDetailContentRef={projectDetailContentRef}
              projectInfoRef={projectInfoRef}
              isOpen={selectedProject !== null}
              slideCount={
                selectedProject ? projectSlideCounts[selectedProject] : 4
              }
            />
          )}
        </div>
        <div className={styles.container_next_project}>
          <button
            className={styles.btn_next_project}
            type="button"
            onClick={handleChangeProject}
          >
            Next{" "}
            <Image
              src="/images/decos/next_project.svg"
              alt="icon next project"
              width={70}
              height={70}
            />
            <br /> Project
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProjectDetail;
