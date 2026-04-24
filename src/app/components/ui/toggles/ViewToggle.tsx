"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ViewToggle.module.scss";
import { gsap } from "gsap";
import { ProjectDetailProps } from "@/app/types/types/global.t";

function ViewToggle({
  onCloseDetail,
  selectedProject,
  setSelectedProject,
}: ProjectDetailProps) {
  const [isSwitch, setIsSwitch] = useState("full");
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (selectedProject !== null) {
      setIsSwitch("one");
    } else {
      setIsSwitch("full");
    }
  }, [selectedProject]);

  useLayoutEffect(() => {
    if (!thumbRef.current) {
      console.log("Erreur useRef");
      return;
    }
    gsap.to(thumbRef.current, {
      duration: 0.8,
      ease: "power4.out",
      x: isSwitch === "full" ? "100%" : "0%",
    });
  }, [isSwitch]);

  // Fermeture
  const handleToogle = (mode: "one" | "full") => {
    setIsSwitch(mode);

    if (mode === "full") {
      onCloseDetail();
    }
    if (mode === "one") {
      setSelectedProject(1);
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
      >
        Full
      </button>
      <span ref={thumbRef} />
    </div>
  );
}
export default ViewToggle;
