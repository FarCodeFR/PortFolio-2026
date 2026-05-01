import { WeatherAppProps } from "@/app/types/types/global.t";
import styles from "./Casse_croute.module.scss";
import useHorizontalScroll from "@/app/hooks/animations/useHorizontalScroll";
import dataProjectDetail from "@/app/data/project_info.json";
import Image from "next/image";
import stylesShared from "../AllProjectDetail.module.scss";

function Cassecroute({
  projectDetailContentRef,
  isOpen,
  slideCount,
  projectInfoRef,
}: WeatherAppProps) {
  const dataCasseCroute = dataProjectDetail[3].CasseCroute;
  const { wrapperProjectRef, projectDetailScopeRef } = useHorizontalScroll({
    projectDetailContentRef,
    isOpen,
    slideCount,
    projectInfoRef,
  });

  return (
    <div ref={projectDetailScopeRef} style={{ height: "100%" }}>
      <div ref={wrapperProjectRef} className={styles.wrapper_project_detail}>
        <section className={styles.intro_project}>
          <div className={styles.intro_inner}>
            <div ref={projectInfoRef} className={styles.intro_col_one}>
              <h1>Casse croûte</h1>
              <ul>
                {dataCasseCroute?.map((el) => (
                  <li key={`dataCasseCroute-${el.id}`}>
                    <p className="project-info-item">{el.tag}</p>
                    {el.tag === "site" ? (
                      <a
                        target="_blank"
                        href={el.post as string}
                        className="project-info-item"
                      >
                        {el.post}
                      </a>
                    ) : el.tag === "stack" && Array.isArray(el.post) ? (
                      <div className={stylesShared.stack}>
                        {el.post.map((tech) => (
                          <span
                            key={tech}
                            className={`${stylesShared.badge} project-info-item`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="project-info-item">{el.post}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.intro_col_two}>
              <picture>
                <Image
                  src="/images/projects/casse_croute/desktop-home.png"
                  alt="Accueil version ordinateur de casse croute"
                  width={350}
                  height={350}
                />
              </picture>
            </div>
          </div>
        </section>
        <section className={styles.first_slide_project}>
          <div className={styles.second_style_inner}>
            <h2>À venir...</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cassecroute;
