import styles from "./MyCourses.module.css";

export default function CourseCard({ imageUrl, category, header, created_by, enrolled,status }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} alt={header} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{header}</h3>
        <p className={styles.creator}>By {created_by}</p>
      </div>
      <div className={styles.detailContainer}>
        <p className={styles.enrolled}> {enrolled} enrolled</p>
        <div className={styles.status}> {status}</div>
      </div>
      <div>
        <button className={styles.button}>Edit</button>
        <button className={styles.button}>Delete</button>
      </div>
    </div>
  );
}
