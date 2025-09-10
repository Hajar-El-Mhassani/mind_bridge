import CourseCard from "./CourseCard.jsx";
import styles from "./Courses.module.css";

export default function CoursesGrid({ courses }) {
  return (
    <div className={styles.grid}>
      {courses.map((c) => (
        <CourseCard key={c.header} {...c} />
      ))}
    </div>
  );
}
