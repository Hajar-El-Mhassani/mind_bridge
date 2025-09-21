import { useState } from "react";
import styles from "./MyCourses.module.css";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import {useRouter} from "next/navigation";

export default function MyCourseCard({
  id,
  image,
  category,
  title,
  status,
  courseDeleteRequested,
  description,
}) {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.desc}>{description}</p>
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
        <button
          className={styles.btnEdit}
          onClick={(e) => router.push(`/my-courses/${id}/edit`)}
        >
          <FaEdit /> Edit
        </button>
        <button
          className={styles.btnDelete}
          onClick={(e) => setDeleteConfirmVisible(true)}
        >
          <FaTrash /> Delete
        </button>
      </div>
      <div
        className={`${styles.delAskContiner} ${
          !deleteConfirmVisible ? styles.hidden : ""
        }`}
      >
        <h4>Are you sure to delete this course?</h4>
        <div className={styles.delAskButtonsContainer}>
          <button
            className={`${styles.delYes} ${styles.confirmBtn}`}
            onClick={(e) => {
              setDeleteConfirmVisible(false);
              courseDeleteRequested(id);
            }}
          >
            Yes
          </button>
          <button
            className={`${styles.delNo} ${styles.confirmBtn}`}
            onClick={(e) => setDeleteConfirmVisible(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
