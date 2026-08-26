"use client";
import styles from "./ThreeShowcase.module.scss";

export default function ThreeShowcase() {
  return (
    <div className={styles.three_showcase}>
      <div className={styles.glow} aria-hidden="true" />

      <figure className={styles.frame}>
        <div className={styles.frame_bar}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
          <p className={styles.frame_title}>haunted-house — western</p>
        </div>

        {/* Vidéo */}
        <a
          className={styles.video_wrapper}
          href="https://threejs-journey-sable.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir la scène en ligne"
        >
          <video
            className={styles.showcase_video}
            src="/videos/three/haunted_house.mp4"
            poster="/images/projects/three/threeProject.png"
            autoPlay
            loop
            muted
            playsInline
          />
          <span className={styles.video_overlay}>
            <span className={styles.video_cta}>Voir le site ↗</span>
          </span>
        </a>
      </figure>

      <figcaption className={styles.caption}>
        Scène « Maison Hantée » revisitée en version western
      </figcaption>
    </div>
  );
}
