"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ViewToggle.module.scss";
import { gsap } from "@/app/lib/gsap";
import { ProjectDetailProps } from "@/app/types/types/global.t";

function ViewToggle({
  onCloseDetail,
  selectedProject,
  setSelectedProject,
}: ProjectDetailProps) {
  const [isSwitch, setIsSwitch] = useState(
    selectedProject !== null ? "one" : "full",
  );
  const thumbRef = useRef<HTMLSpanElement>(null);

  // Synchronise l'état visuel du toggle avec le projet sélectionné depuis l'extérieur.
  // Si un projet est ouvert, on passe en vue "one", sinon on revient en "full".
  useEffect(() => {
    if (selectedProject !== null) {
      setIsSwitch("one");
    } else {
      setIsSwitch("full");
    }
  }, [selectedProject]);

  useLayoutEffect(() => {
    if (!thumbRef.current) {
      return;
    }

    gsap.to(thumbRef.current, {
      duration: 0.8,
      ease: "power4.out",
      x: isSwitch === "full" ? "100%" : "0%",
    });
  }, [isSwitch]);

  // Fermeture || ouverture
  const handleToogle = (mode: "one" | "full") => {
    setIsSwitch(mode);

    if (mode === "full") {
      onCloseDetail();
    }
    const projectRandom = Math.floor(Math.random() * 7 + 1);
    if (mode === "one") {
      setSelectedProject(projectRandom);
    }
  };

  return (
    <div className={styles.toggle} role="group" aria-label="View mode">
      <button
        type="button"
        aria-pressed={isSwitch === "one"}
        onClick={() => handleToogle("one")}
        className={isSwitch === "one" ? styles.isActive : ""}
      >
        One
      </button>
      <button
        type="button"
        aria-pressed={isSwitch === "full"}
        onClick={() => handleToogle("full")}
        className={isSwitch === "full" ? styles.isActive : ""}
        aria-label="Afficher les projets solo"
      >
        Full
      </button>
      <span ref={thumbRef} />
    </div>
  );
}
export default ViewToggle;
