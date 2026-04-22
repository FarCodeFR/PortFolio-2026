import dataStudent from "../../../data/student.json";
import styles from "./Experience.module.scss";

function Experience() {
  const school = dataStudent[0].School;
  const company = dataStudent[1].Company;

  return (
    <section className={styles.experience_about}>
      <div>
        <p className={styles.label_experience}>SCHOOL</p>
        <ul>
          {school?.map((el) => (
            <li key={`school-${el.id}`}>
              <p>{el.name}</p>
              <p>{el.post}</p>
              <p>{el.date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={styles.label_experience}>EXPERIENCE</p>
        <ul>
          {company?.map((el) => (
            <li key={`company-${el.id}`}>
              <p>{el.name}</p>
              <p>{el.post}</p>
              <p>{el.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Experience;
