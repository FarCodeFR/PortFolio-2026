"use client";
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

export function WeatherAppSwitcher() {
  const [activeId, setActiveId] = useState("neige");

  const current =
    weatherData.find((item) => item.id === activeId) || weatherData[4];

  return (
    <div className={styles.switch_weather_app}>
      <div className={styles.weather_app_selector}>
        {weatherData.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={[
              styles.weather_btn,
              activeId === item.id ? styles.active_weather : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Image src={item.icon} alt={item.label} width={50} height={50} />
          </button>
        ))}
      </div>
      <picture className={styles.mobile_preview}>
        <Image
          src={current.img}
          alt={current.label}
          width={300}
          height={600}
          priority
        />
      </picture>
    </div>
  );
}
