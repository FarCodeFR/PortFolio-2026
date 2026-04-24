import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { OpenType } from "@/app/types/types/header.t";
import { useHeaderIntroAnimation } from "@/app/hooks/animations/useHeaderAnimation";

function Header({ setOpen, setOpenContact }: OpenType) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Fix désynchronisation d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Heure actuel
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // About
  const handleOpenAbout = () => {
    setOpen((active) => !active);
  };
  // Contact
  const handleOpenContact = () => {
    setOpenContact((active) => !active);
  };

  // Animations nom + status
  const nameRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useHeaderIntroAnimation({ nameRef, statusRef, headerRef });

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.name}>
          <p ref={nameRef}>Timothe Renard</p>
          <p ref={statusRef}>Disponible</p>
        </div>
        <ul className={styles.links}>
          <li>
            <button type="button" onClick={handleOpenContact}>
              Contact
            </button>
          </li>
          <li>
            <button type="button" onClick={handleOpenAbout}>
              À propos
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.zone}>
        <p>
          {mounted
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
