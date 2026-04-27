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

  // Animations enter nav
  const nameRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLUListElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useHeaderIntroAnimation({ nameRef, statusRef, headerRef, linkRef, timeRef });

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.name}>
          <p ref={nameRef}>Timothe Renard</p>
          <p ref={statusRef}>Disponible</p>
        </div>
        <ul ref={linkRef} className={styles.links}>
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
      <div ref={timeRef} className={styles.zone}>
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
