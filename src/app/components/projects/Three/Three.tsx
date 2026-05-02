import { HomeProjectProps } from "@/app/types/types/global.t";
import useHorizontalScroll from "@/app/hooks/animations/useHorizontalScroll";
import dataProjectDetail from "@/app/data/project_info.json";
import stylesShared from "../AllProjectDetail.module.scss";
import styles from "./Three.module.scss";
import Image from "next/image";

function Three({
  projectDetailContentRef,
  isOpen,
  slideCount,
  projectInfoRef,
}: HomeProjectProps) {
  const dataProjectThree = dataProjectDetail[4]["Three.js"];
  const { wrapperProjectRef, projectDetailScopeRef } = useHorizontalScroll({
    projectDetailContentRef,
    isOpen,
    slideCount,
    projectInfoRef,
  });

  return (
    <div ref={projectDetailScopeRef} style={{ height: "100%" }}>
      <div
        ref={wrapperProjectRef}
        className={stylesShared.wrapper_project_detail}
      >
        <section className={stylesShared.intro_project}>
          <div className={stylesShared.intro_inner}>
            <div ref={projectInfoRef} className={stylesShared.intro_col_one}>
              <h1>Three.js</h1>
              <ul>
                {dataProjectThree?.map((el) => (
                  <li key={`dataProjectThree-${el.id}`}>
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
                  src="/images/projects/three/threeProject.png"
                  alt="Application météo"
                  width={400}
                  height={800}
                />
              </picture>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Three;
