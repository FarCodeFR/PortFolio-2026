import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { OpenType } from "@/app/types/types/header.t";
import { useRouter } from "next/navigation";

function Header({ setOpen, setOpenContact }: OpenType) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Route
  const router = useRouter();

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
            <button type="button" onClick={() => router.push(`/`)}>
              Projets
            </button>
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
