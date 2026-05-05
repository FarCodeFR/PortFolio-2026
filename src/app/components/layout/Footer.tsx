import { ProjectDetailProps } from "@/app/types/types/global.t";
import styles from "./Footer.module.scss";
import ViewToggle from "../ui/toggles/ViewToggle";

function Footer({
  onCloseDetail,
  selectedProject,
  setSelectedProject,
}: ProjectDetailProps) {
  return (
    <footer className={styles.footer}>
      <ViewToggle
        onCloseDetail={onCloseDetail}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <div className={styles.notice}>
        <p>🚧 Version mobile en cours de développement 🚧</p>
      </div>
    </footer>
  );
}

export default Footer;
