import React from "react";
import styles from "./MyCourses.module.css";
import MyCoursesGrid from "./MyCoursesGrid";
import StatsCard from "./StatsCard";

export default function MyCourses() {
  return (
    <div className="container container-lg">
      <div className="section">
        <div className="section-header">
          <h1>My Courses</h1>
        </div>

        <section className={styles.statsWrapper}>
          <StatsCard />
        </section>

        <section className={`card ${styles.filtersCard}`}>
          <div className={styles.filtersContainer}>
            <div className={styles.filtersLeft}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Filter courses..."
              />
              <select className={styles.filterSelect}>
                <option value="all">Category</option>
                <option value="programming">Programming</option>
                <option value="data-science">Data Science</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <div className={styles.filtersRight}>
              <button className={styles.addCourseBtn}>＋ Add New Course</button>
            </div>
          </div>
        </section>

        <section>
          <MyCoursesGrid />
        </section>
      </div>
    </div>
  );
}
