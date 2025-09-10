import styles from "./Courses.module.css";

export default function CourseCard({
  tag,
  imageUrl,
  header,
  author,
  description,
  price,
}) {
  return (
    <div className={`card ${styles.courseCard}`}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={header} className={styles.image} />
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{header}</h3>
        <p className={styles.author}>by {author}</p>
        <p className={styles.desc}>{description}</p>
        <p className={styles.price}>{price === 0 ? "Free" : `$${price}`}</p>
        <button className={styles.button}>Details</button>
      </div>
    </div>
  );
}
