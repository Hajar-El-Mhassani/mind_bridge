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
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} alt={header} />
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{header}</h3>
        <p className={styles.author}>By {author}</p>
        <p className={styles.desc}>{description}</p>
        <div className={styles.price}>{price === 0 ? "Free" : `$${price}`}</div>
      </div>
      <button className={styles.button}>Enroll Now</button>
    </div>
  );
}
