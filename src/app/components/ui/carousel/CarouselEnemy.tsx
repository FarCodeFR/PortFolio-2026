import Image from "next/image";
import data from "../../../data/enemy.json";
import styles from "./CarouselEnemy.module.scss";

function CarouselEnemy() {
  const enemy = [...data]; // duplication

  return enemy.map((el, index) => (
    <picture
      data-logo-item
      className={styles.containerEnemy}
      key={`${el.id}-${index}`}
    >
      <Image src={el.image} alt="Enemy image" width={400} height={400} />
    </picture>
  ));
}
export default CarouselEnemy;
