import { weatherAppProps } from "@/app/types/types/global.t";
import styles from "./Casse_croute.module.scss";
import useHorizontalScroll from "@/app/hooks/animations/useHorizontalScroll";
import dataProjectDetail from "@/app/data/project_info.json";
import Image from "next/image";

function Cassecroute({
  projectDetailContentRef,
  isOpen,
  slideCount,
}: weatherAppProps) {
  const dataCasseCroute = dataProjectDetail[2].CasseCroute;
  const { wrapperProjectRef, projectDetailScopeRef } = useHorizontalScroll({
    projectDetailContentRef,
    isOpen,
    slideCount,
  });

  return (
    <div ref={projectDetailScopeRef} style={{ height: "100%" }}>
      <div ref={wrapperProjectRef} className={styles.wrapper_project_detail}>
        <section className={styles.intro_project}>
          <div className={styles.intro_inner}>
            <div className={styles.intro_col_one}>
              <h1>Casse croûte</h1>
              <ul>
                {dataCasseCroute?.map((el) => (
                  <li key={`dataCasseCroute-${el.id}`}>
                    <p>{el.tag}</p>
                    {el.tag === "site" ? (
                      <a target="_blank" href={el.post}>
                        {el.post}
                      </a>
                    ) : (
                      <p>{el.post}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.intro_col_two}>
              <picture>
                <img
                  src="/images/projects/mazinger/accueil.webp"
                  alt="Accueil du jeux mazinger"
                  width={350}
                  height={350}
                />
              </picture>
            </div>
          </div>
        </section>
        <section className={styles.first_slide_project}>
          <div className={styles.second_style_inner}>
            <h1>Maquette et Prototype</h1>
            <picture></picture>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cassecroute;
