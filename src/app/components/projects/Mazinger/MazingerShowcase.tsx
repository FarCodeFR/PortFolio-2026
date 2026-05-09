"use client";

import Image from "next/image";
import styles from "./MazingerShowcase.module.scss";
import mazingerData from "@/app/data/mazingerData.json";
import { useState } from "react";

export default function MazingerShowcase() {
  const [currentMap, setCurrentMap] = useState(0);

  const prevMap = () => {
    setCurrentMap((el) => (el === 0 ? mazingerData.maps.length - 1 : el - 1));
  };

  const nextMap = () => {
    setCurrentMap((el) => (el === mazingerData.maps.length - 1 ? 0 : el + 1));
  };

  return (
    <div className={styles.mazinger_showcase}>
      <section className={styles.showcase_section}>
        <div className={styles.section_header}>
          <p>Personnages</p>
          <h2>Ennemis & Joueur</h2>
        </div>

        <ul className={styles.enemies_grid}>
          {mazingerData.enemies.map((enemy) => (
            <li key={enemy.id} className={styles.enemy_card}>
              <Image
                src={enemy.src}
                alt={enemy.name}
                width={200}
                height={200}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.showcase_section}>
        <div className={styles.section_header}>
          <p>Exploration</p>
          <h2>Maps</h2>
        </div>

        <div className={styles.maps_carousel}>
          <button
            type="button"
            onClick={prevMap}
            className={styles.carousel_button}
            aria-label="Voir la map précédente"
          >
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" />
            </svg>
            <span>←</span>
          </button>

          <figure className={styles.map_img}>
            <Image
              src={mazingerData.maps[currentMap].src}
              alt={mazingerData.maps[currentMap].name}
              fill
              priority
            />
            <figcaption>{mazingerData.maps[currentMap].name}</figcaption>
          </figure>

          <button
            type="button"
            onClick={nextMap}
            className={styles.carousel_button}
            aria-label="Voir la map suivante"
          >
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" />
            </svg>
            <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
