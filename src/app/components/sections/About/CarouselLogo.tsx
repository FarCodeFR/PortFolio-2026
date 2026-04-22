import Image from "next/image";
import data from "../../../data/logo.json";
import styles from "./CarouselLogo.module.scss";

function CarouselLogo() {
  const logos = [...data]; // duplication

  return logos.map((el, index) => (
    <picture
      data-logo-item
      className={styles.containerLogo}
      key={`${el.id}-${index}`}
    >
      <Image src={el.image} alt={`Logo ${el.name}`} width={100} height={100} />
    </picture>
  ));
}
export default CarouselLogo;
