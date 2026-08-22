import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { OpenType } from "@/app/types/types/header.t";
import TransitionLink from "./TransitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Header({ setOpen, setOpenContact }: OpenType) {
  const [time, setTime] = useState<Date | null>(null);
  const [disponible] = useState(false);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.to(".statut-texte", {
      backgroundPosition: "-200% center",
      duration: 3,
      repeat: -1,
      ease: "none",
    });
  }, []);

  // About
  const handleOpenAbout = () => {
    setOpen((active) => !active);
  };
  // Contact
  const handleOpenContact = () => {
    setOpenContact((active) => !active);
  };

  return (
    <header className={styles.header}>
      <div className={styles.name}>
        <p>Timothe Renard</p>
        <div className={disponible ? styles.available : styles.busy}>
          <svg
            className="statut-svg"
            width={15}
            height={15}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="4" fill="currentColor" />
          </svg>
          <p className="statut-texte">
            {disponible ? "Disponible" : "Indisponible"}
          </p>
        </div>
      </div>
      <nav aria-label="Navigation principale">
        <ul className={styles.links}>
          <li>
            <button type="button" onClick={handleOpenContact}>
              Contact
            </button>
          </li>
          <li>
            <TransitionLink href="/">Projets</TransitionLink>
          </li>
          <li>
            <button type="button" onClick={handleOpenAbout}>
              À propos
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.hour}>
        <p>
          {time
            ? time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </p>

        <p>NANTES, FR</p>
      </div>
    </header>
  );
}
export default Header;
