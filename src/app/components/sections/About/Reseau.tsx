import Image from "next/image";
import styles from "./Reseau.module.scss";

export type ReseauPorpsStyle = {
  variant?: "about" | "contact";
};

function Reseau({ variant = "about" }: ReseauPorpsStyle) {
  return (
    <ul className={`${styles.info_reseau} ${styles[variant]}`}>
      <li>
        <a
          href="https://www.linkedin.com/in/timothé-renard-a686072b4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin{" "}
          <Image
            src="/images/decos/reseau.svg"
            alt="décoration icon"
            width={50}
            height={50}
          />
          <span />
        </a>
      </li>

      <li>
        <a
          href="https://github.com/FarCodeFR"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub{" "}
          <Image
            src="/images/decos/reseau.svg"
            alt="décoration icon"
            width={50}
            height={50}
          />
          <span />
        </a>
      </li>

      <li>
        <a href="mailto:Timothernd@gmail.com">
          Timothernd@gmail.com{" "}
          <Image
            src="/images/decos/reseau.svg"
            alt="décoration icon"
            width={50}
            height={50}
          />
          <span />
        </a>
      </li>
    </ul>
  );
}

export default Reseau;
