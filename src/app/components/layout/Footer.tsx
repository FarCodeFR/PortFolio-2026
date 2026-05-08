import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.notice}>
        <p>🚧 Version mobile en cours de développement 🚧</p>
      </div>
    </footer>
  );
}

export default Footer;
