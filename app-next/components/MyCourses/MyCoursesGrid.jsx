"use client";

import MyCoursesCard from "./MyCoursesCard";
import styles from "./MyCourses.module.css";

export default function MyCoursesGrid({courses}) {
  return (
    <div>
      <div className={styles.grid}>
        {courses.map((c) => (
          <MyCoursesCard key={c.header} {...c} />
        ))}
      </div>
    </div>
  );
}
