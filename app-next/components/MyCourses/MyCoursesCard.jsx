import styles from "./MyCourses.module.css";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";

export default function MyCourseCard({ image, category, title, status }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.detailContainer}>
        <div
          className={
            status === "published"
              ? styles.statusPublished
              : status === "draft"
              ? styles.statusDraft
              : styles.statusArchived
          }
        >
          {status}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btnEdit}>
          <FaEdit /> Edit
        </button>
        <button className={styles.btnDelete}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
