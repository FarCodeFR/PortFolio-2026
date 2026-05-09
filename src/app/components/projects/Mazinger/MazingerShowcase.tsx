"use client";

import Image from "next/image";
import styles from "./MazingerShowcase.module.scss";
import mazingerData from "@/app/data/mazingerData.json";
import { useRef, useState } from "react";
import { useGSAP, gsap } from "@/app/lib/gsap";

export default function MazingerShowcase() {
  const [currentMap, setCurrentMap] = useState(0);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section", containerRef.current);

      sections.forEach((sections) => {
        const el = sections as Element;
        const header = el.querySelector("p, h2");
        const content = el.querySelector("ul, div");

        const tl_block = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        tl_block
          .from(header, {
            autoAlpha: 0,
            y: 30,
            duration: 0.5,
            ease: "power3.out",
          })
          .from(
            content,
            { autoAlpha: 0, y: 40, duration: 0.6, ease: "power3.out" },
            "-=0.3",
          );
      });

      // ENEMY
      gsap.from(`.${styles.enemy_card}`, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.enemies_grid}`,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef },
  );

  const prevMap = () => {
    setCurrentMap((el) => (el === 0 ? mazingerData.maps.length - 1 : el - 1));
  };

  const nextMap = () => {
    setCurrentMap((el) => (el === mazingerData.maps.length - 1 ? 0 : el + 1));
  };

  return (
    <div ref={containerRef} className={styles.mazinger_showcase}>
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
