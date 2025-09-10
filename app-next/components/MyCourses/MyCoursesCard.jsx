import styles from "./MyCourses.module.css";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";

export default function MyCoursesCard({
  imageUrl,
  category,
  header,
  created_by,
  enrolled,
  status,
}) {
  return (
    <div className={`card ${styles.courseCard}`}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} alt={header} />
        <div className={styles.categoryBadge}>{category}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.courseTitle}>{header}</h3>
        <p className={styles.courseCreator}>By {created_by}</p>

        <div className={styles.courseStats}>
          <p className={styles.enrolled}>
            <FaUsers /> {enrolled} enrolled
          </p>
          <div
            className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}
          >
            {status}
          </div>
        </div>

        <div className={styles.courseActions}>
          <button className={styles.btnEdit}>
            <FaEdit /> Edit
          </button>
          <button className={styles.btnDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
