"use client";

import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import MyCoursesGrid from "./MyCoursesGrid";
import StatsCard from "./StatsCard";
import { FaSearch } from "react-icons/fa";

export default function MyCourses() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/user.json");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div></div>
        <header className={styles.header}>
          <h1 className={styles.title}>My Courses</h1>
        </header>

        {/* main section on top to show courses category  */}
        <section className={styles.statsSection}>
          <StatsCard currentUser={user} />
        </section>

        {/* Filter - Search and adding new course are in this section  */}
        <section>
          <div className={styles.FiltersContainer}>
            <div className={styles.searchFilterGroup}>
              <div className={styles.searchWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Filter courses..."
                />
              </div>
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
              <button className={styles.addCourseBtn}>＋ Add New Course</button>
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <MyCoursesGrid />
        </section>
      </div>
    </div>
  );
}
