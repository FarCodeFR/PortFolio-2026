"use client";
import Image from "next/image";
import styles from "./ProjectDetail.module.scss";
import { ProjectDetailProps } from "@/app/types/types/global.t";
import { WeatherAppSwitcher } from "./WeatherApp/WeatherAppSwitcher";
import { useRouter } from "next/navigation";

export default function ProjectDetail({
  project,
  nextSlug,
  nextTitle,
}: {
  project: ProjectDetailProps;
  nextSlug: string;
  nextTitle: string;
}) {
  const router = useRouter();

  return (
    <main className={styles.project_detail_container}>
      <section className={styles.project_hero}>
        <div className={styles.hero_bg}>
          <Image src={project.background} alt={project.title} fill />
        </div>
        <div className={styles.hero_gradient}></div>
        <div className={styles.hero_content}>
          <p className={styles.hero_tag}>{project.tag}</p>
          <h1>{project.title}</h1>
          <p className={styles.hero_description}>{project.about}</p>
          <div className={styles.hero_scroll}>
            <p>Scroll pour explorer</p>
            <svg
              width="50"
              height="70"
              viewBox="0 0 20 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.scroll_icon}
            >
              <path
                d="M10 0V70"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* CONTENT INFO */}
      <article className={styles.project_detail_info}>
        {/* About */}
        <div className={styles.project_detail_section}>
          <div className={styles.project_detail_section_col_one}>
            {project.about && (
              <section className={styles.infoBlock}>
                <p>01</p>
                <h2>À propos</h2>
                <p>{project.about}</p>
              </section>
            )}
          </div>
          <div className={styles.project_detail_section_col_two}>
            {/* Year */}
            {project.year && (
              <section className={styles.infoBlock}>
                <h3>Année</h3>
                <p>{project.year}</p>
              </section>
            )}

            {/* Role */}
            {project.role && (
              <section className={styles.infoBlock}>
                <h3>Rôle</h3>
                <p>{project.role}</p>
              </section>
            )}

            {/* Stack */}
            <section className={styles.infoBlock}>
              <h3>Stack</h3>
              <ul>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Mission */}
        {project.mission && (
          <div className={styles.project_mission}>
            <Image src={project.image_mission} alt={project.title} fill />
            <div className={styles.project_detail_section}>
              <div className={styles.project_detail_section_col_one}>
                <section className={styles.infoBlock}>
                  <p>02</p>
                  <h2>Mission</h2>
                  <p>{project.mission}</p>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Challenge */}
        {project.challenge && (
          <div className={styles.project_detail_section}>
            <div className={styles.project_detail_section_col_one}>
              <section className={styles.infoBlock}>
                <p>03</p>
                <h2>Difficulté</h2>
                <p>{project.challenge}</p>
              </section>
            </div>
          </div>
        )}
        {/* Result */}
        {project.result && (
          <div className={styles.project_detail_section}>
            <div className={styles.project_detail_section_col_one}>
              <section className={styles.infoBlock}>
                <p>04</p>
                <h2>Résultat</h2>
                <p>{project.result}</p>
              </section>
            </div>
            {project.slug === "weather-app" && <WeatherAppSwitcher />}
          </div>
        )}

        {/* Learning */}
        {project.learning && (
          <div className={styles.project_detail_section}>
            <div className={styles.project_detail_section_col_one}>
              <section className={styles.infoBlock}>
                <p>05</p>
                <h2>Apprentissage</h2>
                <p>{project.learning}</p>
              </section>
            </div>
          </div>
        )}
        {/* Links */}
        <section className={styles.linkSite}>
          {project.github && (
            <a target="_blank" rel="noopener noreferrer" href={project.github}>
              GitHub
            </a>
          )}
          {project.live && (
            <a target="_blank" rel="noopener noreferrer" href={project.live}>
              Voir le site
            </a>
          )}
        </section>
        <section className={styles.project_next}>
          <button onClick={() => router.push(`/projects/${nextSlug}`)}>
            <span>PROJET SUIVANT</span>
            <h2>{nextTitle}</h2>
          </button>
        </section>
      </article>
    </main>
  );
}
