import React from "react";
import styles from "./MyCourses.module.css";
import MyCoursesList from "./MyCoursesList.jsx";

export default function MyCourses() {
  return (
    <div className={styles.container}>
      {/* title of page is here */}
      <header className={styles.header}>
        <h1 className={styles.title}>My Courses</h1>
      </header>

      {/* main section on top to show courses category  */}
      <section className={styles.statsSection}>
        <div> 4 boxes with short info is here </div>
      </section>

      {/* in this section we can see search - sort and add new  */}
      <section className={styles.filtersSection}>
        <div> same as public courses use div and flexbox here  </div>
      </section>

      <section className={styles.listSection}>
        <MyCoursesList />
      </section>
    </div>
  );
}
