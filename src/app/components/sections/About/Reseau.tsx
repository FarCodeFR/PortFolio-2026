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
          Linkedin <img src="/images/decos/reseau.svg" />
          <span />
        </a>
      </li>

      <li>
        <a
          href="https://github.com/FarCodeFR"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <img src="/images/decos/reseau.svg" />
          <span />
        </a>
      </li>

      <li>
        <a href="mailto:Timothernd@gmail.com">
          Timothernd@gmail.com <img src="/images/decos/reseau.svg" />
          <span />
        </a>
      </li>
    </ul>
  );
}

export default Reseau;
