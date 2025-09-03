import React from "react";
import styles from "./MyCourses.module.css";
import MyCoursesList from "./MyCoursesList.jsx";
import StatesCard from "./StatesCard";

export default function MyCourses() {
  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Courses</h1>
        </header>

        {/* main section on top to show courses category  */}
        <section className={styles.statsSection}>
          <StatesCard />
        </section>

        {/* in this section we can see search - sort and add new  */}
        <section>
          <div className={styles.FiltersContainer}>
            <div>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Filter courses..."
              />

              <select className={styles.filterSelect}>
                <option value="all">Category</option>
                <option value="tech">Programming</option>
                <option value="tech">Data Sinence</option>
                <option value="tech">Design</option>
                <option value="business">Business</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <div>
              {" "}
              <button className={styles.addCourseBtn}>＋ Add New Course</button>
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <MyCoursesList />
        </section>
      </div>
    </div>
  );
}
