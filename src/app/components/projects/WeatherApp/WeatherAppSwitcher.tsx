import { useState } from "react";
import styles from "./WeatherApp.module.scss";
import Image from "next/image";

const weatherData = [
  {
    id: "soleil",
    label: "Soleil",
    img: "/images/projects/weather/mobile/soleil.svg",
    icon: "/images/projects/weather/icons/sun.png",
  },
  {
    id: "nuage",
    label: "Nuage",
    img: "/images/projects/weather/mobile/nuage.svg",
    icon: "/images/projects/weather/icons/cloudy.png",
  },
  {
    id: "orage",
    label: "Orage",
    img: "/images/projects/weather/mobile/orage.svg",
    icon: "/images/projects/weather/icons/thunder.png",
  },
  {
    id: "pluie",
    label: "Pluie",
    img: "/images/projects/weather/mobile/pluie.svg",
    icon: "/images/projects/weather/icons/rain.png",
  },
  {
    id: "neige",
    label: "Neige",
    img: "/images/projects/weather/mobile/neige.svg",
    icon: "/images/projects/weather/icons/snow.png",
  },
];

export function WeatherSwitcher() {
  const [activeId, setActiveId] = useState("neige");

  const current =
    weatherData.find((item) => item.id === activeId) || weatherData[4];

  return (
    <div className={styles.weather_switcher_inner}>
      <div className={styles.first_slide_col_one}>
        <picture>
          <Image
            src={current.img}
            alt={current.label}
            width={400}
            height={800}
            priority
          />
        </picture>
      </div>
      <div className={styles.first_slide_col_two}>
        <p>Exemple d'adaptation de l'interface selon</p>
        <h1>
          Les conditions <br /> météo
        </h1>
        <div className={styles.weather_selector}>
          {weatherData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={activeId === item.id ? styles.active_weather : ""}
            >
              <Image src={item.icon} alt={item.id} width={60} height={60} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
