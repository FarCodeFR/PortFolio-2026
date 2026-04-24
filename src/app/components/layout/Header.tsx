import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { OpenType } from "@/app/types/types/header.t";

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
  const handleClickAbout = () => {
    setOpen((active) => !active);
  };
  // Contact
  const handleClickContact = () => {
    setOpenContact((active) => !active);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.name}>
          <p>Timothe Renard</p>
          <p>Disponible</p>
        </div>
        <ul className={styles.links}>
          <li onClick={handleClickContact}>Contact</li>
          <li onClick={handleClickAbout}>À propos</li>
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
