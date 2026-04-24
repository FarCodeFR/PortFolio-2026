"use client";

import gsap from "gsap";
import { useRef } from "react";
import styles from "./ProjectDetail.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mazinger from "./Mazinger/Mazinger";
import { useGSAP } from "@gsap/react";
import Cassecroute from "./Casse_croute/CasseCroute";
import { weatherAppProps } from "@/app/types/types/global.t";
import WeatherApp from "./WeatherApp/WeatherApp";
import Image from "next/image";

interface ProjectDetailProps {
  selectedProject: number | null;
  setSelectedProject: (n: number) => void;
}


function ProjectDetail({
  selectedProject,
  setSelectedProject,
}: ProjectDetailProps) {
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const projectDetailContentRef = useRef<HTMLDivElement>(null);
  const projectContentTransitionRef = useRef<HTMLDivElement>(null);
  const isFirstOpenRef = useRef(true);

  // Components
  const projectComponents: Record<number, React.FC<weatherAppProps>> = {
    1: WeatherApp,
    2: Mazinger,
    3: Cassecroute,
  };
  const Component = selectedProject ? projectComponents[selectedProject] : null;

  // Nombre de slide
  const projectSlideCounts: Record<number, number> = {
    1: 4,
    2: 5,
    3: 2,
  };

  useGSAP(
    () => {
      // Slide droite
      if (selectedProject !== null && isFirstOpenRef.current) {
        // Premiere ouverture > slide à droite
        isFirstOpenRef.current = false;
        gsap.fromTo(
          projectDetailRef.current,
          {
            x: "100%",
          },
          {
            x: "0%",
            duration: 1,
            ease: "power3.inOut",
          },
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
    const nextProject = selectedProject + 1 > 3 ? 1 : selectedProject + 1;
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
