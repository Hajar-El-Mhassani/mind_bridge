import styles from "./Courses.module.css";

export default function CourseCard({
  category,
  level,
  image,
  title,
  created_by,
  description,
  price,
}) {
  const getLevelBadgeClass = (level) => {
    const baseClass = styles.levelBadge;
    switch (level?.toLowerCase()) {
      case "beginner":
        return `${baseClass} ${styles.levelBeginner}`;
      case "intermediate":
        return `${baseClass} ${styles.levelIntermediate}`;
      case "advanced":
        return `${baseClass} ${styles.levelAdvanced}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.badges}>
          <span className={styles.tag}>{category}</span>
          {level && <span className={getLevelBadgeClass(level)}>{level}</span>}
        </div>
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
