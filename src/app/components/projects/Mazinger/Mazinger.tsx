import styles from "./Mazinger.module.scss";
import stylesShared from "../AllProjectDetail.module.scss";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useHorizontalScroll from "@/app/hooks/animations/useHorizontalScroll";
import { HomeProjectProps } from "@/app/types/types/global.t";
import dataProjectDetail from "@/app/data/project_info.json";
import CarouselEnemy from "../../ui/carousel/CarouselEnemy";
import Image from "next/image";

function Mazinger({
  projectDetailContentRef,
  isOpen,
  slideCount,
  projectInfoRef,
}: HomeProjectProps) {
  const dataMazinger = dataProjectDetail[2].Mazinger;
  const { wrapperProjectRef, projectDetailScopeRef } = useHorizontalScroll({
    projectDetailContentRef,
    isOpen,
    slideCount,
    projectInfoRef,
  });
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isOpen) return;
    if (window.innerWidth > 480) {
      gsap.to(carouselTrackRef.current, {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }
  }, [isOpen]);

  return (
    <div ref={projectDetailScopeRef} style={{ height: "100%" }}>
      <div
        ref={wrapperProjectRef}
        className={stylesShared.wrapper_project_detail}
      >
        <section className={stylesShared.intro_project}>
          <div className={stylesShared.intro_inner}>
            <div ref={projectInfoRef} className={stylesShared.intro_col_one}>
              <h1>Mazinger</h1>
              <ul>
                {dataMazinger?.map((el) => (
                  <li key={`dataMazinger-${el.id}`}>
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
                  src="/images/projects/mazinger/accueil.webp"
                  alt="Accueil du jeux mazinger"
                  width={600}
                  height={400}
                />
              </picture>
            </div>
          </div>
        </section>
        <section className={styles.first_slide_project}>
          <div className={stylesShared.second_style_inner}>
            <h1>Joueur</h1>
            <picture>
              <Image
                src="/images/projects/mazinger/mobs/player.png"
                alt="joueur"
                width={400}
                height={400}
              />
            </picture>
          </div>
        </section>
        <section className={stylesShared.second_slide_project}>
          <div className={stylesShared.second_style_inner}>
            <h1>Ennemis</h1>
            <div ref={carouselTrackRef} className={styles.enemy_track}>
              <CarouselEnemy />
              <CarouselEnemy />
            </div>
          </div>
        </section>
        <section className={styles.third_slide_project}>
          <div className={styles.second_style_inner}>
            <h1>Différentes zones</h1>
            <picture>
              <Image
                src="/images/projects/mazinger/maps/mapOne.png"
                alt="Map 1"
                width={850}
                height={450}
              />
              <Image
                src="/images/projects/mazinger/maps/mapTwo.png"
                alt="Map 2"
                width={850}
                height={450}
              />
              <Image
                src="/images/projects/mazinger/maps/mapThree.png"
                alt="Map 3"
                width={850}
                height={450}
              />
              <Image
                src="/images/projects/mazinger/maps/mapFour.png"
                alt="Map 4"
                width={850}
                height={450}
              />
            </picture>
          </div>
        </section>
        <section className={styles.four_slide_project}>
          <div className={stylesShared.second_style_inner}>
            <h1>L'interface HUD</h1>
            <picture>
              <Image
                src="/images/projects/mazinger/hud.webp"
                alt="hebdomadaire"
                width={800}
                height={450}
              />
            </picture>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Mazinger;
