import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { OpenType } from "@/app/types/types/header.t";
import TransitionLink from "./TransitionLink";

function Header({ setOpen, setOpenContact }: OpenType) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

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

  return (
    <header className={styles.header}>
      <div className={styles.name}>
        <p>Timothe Renard</p>
        <p>Disponible</p>
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
