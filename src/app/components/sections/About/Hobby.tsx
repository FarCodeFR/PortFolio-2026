import { Fragment } from "react/jsx-runtime";
import styles from "./Hobby.module.scss";
import Image from "next/image";

function Hobby() {
  return (
    <Fragment>
      <div className={styles.hobby_about}>
        <h2>Hobby</h2>
        <ul>
          <li>Voyager</li>
          <li>Randonnée</li>
          <li>Jeux vidéo</li>
          <li>Informatique</li>
          <li>Restaurant</li>
          <li>Cinéma</li>
          <li>Pompier volontaire</li>
          <li>Cuisiner</li>
        </ul>
        <Image
          src="/images/decos/mountain.svg"
          alt="montagne"
          width={300}
          height={180}
        />
      </div>
    </Fragment>
  );
}

export default Hobby;
