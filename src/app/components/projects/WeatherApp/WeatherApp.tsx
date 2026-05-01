import styles from "./WeatherApp.module.scss";
import stylesShared from "../AllProjectDetail.module.scss";
import useHorizontalScroll from "@/app/hooks/animations/useHorizontalScroll";
import { WeatherAppProps } from "@/app/types/types/global.t";
import { WeatherSwitcher } from "./WeatherAppSwitcher";
import dataProjectDetail from "@/app/data/project_info.json";
import Image from "next/image";

function WeatherApp({
  projectDetailContentRef,
  isOpen,
  slideCount,
}: WeatherAppProps) {
  const dataWeatherApp = dataProjectDetail[1].WeatherApp;
  const { wrapperProjectRef, projectDetailScopeRef } = useHorizontalScroll({
    projectDetailContentRef,
    isOpen,
    slideCount,
  });

  return (
    <div ref={projectDetailScopeRef} style={{ height: "100%" }}>
      <div
        ref={wrapperProjectRef}
        className={stylesShared.wrapper_project_detail}
      >
        <section className={stylesShared.intro_project}>
          <div className={stylesShared.intro_inner}>
            <div className={stylesShared.intro_col_one}>
              <h1>Weather App</h1>
              <ul>
                {dataWeatherApp?.map((el) => (
                  <li key={`dataWeatherapp-${el.id}`}>
                    <p>{el.tag}</p>
                    {el.tag === "site" ? (
                      <a target="_blank" href={el.post as string}>
                        {el.post}
                      </a>
                    ) : el.tag === "stack" && Array.isArray(el.post) ? (
                      <div className={stylesShared.stack}>
                        {el.post.map((tech) => (
                          <span key={tech} className={stylesShared.badge}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>{el.post}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={stylesShared.intro_col_two}>
              <picture>
                <Image
                  src="/images/projects/weather/intro_weather.webp"
                  alt="Application météo"
                  width={400}
                  height={800}
                />
              </picture>
            </div>
          </div>
        </section>
        <section className={stylesShared.first_slide_project}>
          <WeatherSwitcher />
        </section>
        <section className={stylesShared.second_slide_project}>
          <div className={stylesShared.second_style_inner}>
            <h1>
              Prévisions <br /> horaires
            </h1>
            <picture>
              <Image
                src="/images/projects/weather/prevision.webp"
                alt="prevision"
                width={400}
                height={250}
              />
            </picture>
          </div>
        </section>
        <section className={styles.third_slide_project}>
          <div className={stylesShared.second_style_inner}>
            <h1>
              Prévisions <br /> hébdomadaires
            </h1>
            <picture>
              <Image
                src="/images/projects/weather/hebdo.webp"
                alt="hebdomadaire"
                width={400}
                height={800}
              />
            </picture>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WeatherApp;
