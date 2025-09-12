import styles from "./Courses.module.css";

export default function CourseCard({
  category,
  image,
  title,
  created_by,
  description,
  price,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
        <span className={styles.tag}>{category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>By {created_by}</p>
        <p className={styles.desc}>{description}</p>
        <div className={styles.price}>{price === 0 ? "Free" : `$${price}`}</div>
      </div>
      <button className={styles.button}>Enroll Now</button>
    </div>
  );
}
