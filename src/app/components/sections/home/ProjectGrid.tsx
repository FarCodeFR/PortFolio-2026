import styles from "./ProjectGrid.module.scss";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Weather App",
    image: "/images/projects/weather/weather.webp",
    hoverImage: "/images/projects/weather/hover_weather.webp",
    imageMobile: [
      "/images/projects/weather/mobile/neige.svg",
      "/images/projects/weather/mobile/orage.svg",
      "/images/projects/weather/mobile/pluie.svg",
      "/images/projects/weather/mobile/soleil.svg",
    ],
  },
  {
    id: 2,
    title: "Mazinger",
    image: "/images/projects/mazinger/mazinger.png",
    hoverImage: "/images/projects/mazinger/hover_mazinger.webp",
  },
  {
    id: 3,
    title: "Casse croute",
    image: "/images/projects/casse_croute/casse_croute.webp",
    hoverImage: "/images/projects/casse_croute/hover_casse_croute.webp",
  },
];

interface ProjectProps {
  setSelectedProject: (n: number) => void;
  selectedProject: number | null;
}

function ProjectGrid({ setSelectedProject, selectedProject }: ProjectProps) {
  const [isActive, setIsActive] = useState<number | null>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (selectedProject !== null) {
      // Lance l'animation
      gsap.to(projectRef.current, {
        x: "-100%",
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      // Animation de retour
      gsap.to(projectRef.current, {
        x: "0%",
        scale: 1,
        opacity: 1,
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
    setIsActive(id);
    animateTitle(el, "enter");
  };

  const handleLeave = (el: HTMLLIElement) => {
    animateTitle(el, "leave");
    setIsActive(null);
  };

  return (
    <section ref={projectRef} className={styles.projectGrid}>
      <h1 className={styles.t_home}>Projects</h1>
      <ul className={styles.listProject}>
        {projects.map((el) => (
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
              alt="img"
              loading="eager"
              width={1200}
              height={600}
              priority
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
                      priority
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
