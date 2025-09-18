import Link from "next/link";
import styles from "./Courses.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function CourseCard({
  id,
  category,
  level,
  image,
  title,
  created_by,
  description,
  price,
}) {
  const [creatorName, setCreatorName] = useState(created_by);
  useEffect(() => {
    // If created_by is a number (ID), fetch the user name
    if (!isNaN(created_by)) {
      fetchCreatorName(created_by);
    }
  }, [created_by]);

  const fetchCreatorName = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );
      const user = await response.json();
      setCreatorName(user.name || "Unknown Author");
    } catch (error) {
      console.error("Failed to fetch creator name:", error);
      setCreatorName("Unknown Author");
    }
  };

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
        <Image
          className={styles.image}
          src={image}
          alt={title}
          width={400}
          height={250}
          priority={false}
        />
        <div className={styles.badges}>
          <span className={styles.tag}>{category}</span>
          {level && <span className={getLevelBadgeClass(level)}>{level}</span>}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>By {creatorName}</p>
        <p className={styles.desc}>{description}</p>
        <div className={styles.price}>{price === 0 ? "Free" : `$${price}`}</div>
      </div>

      <Link href={`/${id}`}>
        <button className={styles.button}>View Details</button>
      </Link>
    </div>
  );
}
