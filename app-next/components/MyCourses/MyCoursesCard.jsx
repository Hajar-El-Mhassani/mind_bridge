import styles from "./MyCourses.module.css";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";

export default function MyCourseCard({
  imageUrl,
  category,
  header,
  created_by,
  enrolled,
  status,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} alt={header} />
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{header}</h3>
        <p className={styles.creator}>By {created_by}</p>
      </div>
      <div className={styles.detailContainer}>
        <p className={styles.enrolled}>
          <FaUsers /> {enrolled} enrolled
        </p>
        <div
          className={
            status === "Published" ? styles.statusPublished : styles.status
          }
        >
          {" "}
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
