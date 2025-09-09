"use client";

import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import MyCoursesGrid from "./MyCoursesGrid";
import StatsCard from "./StatsCard";
import { FaSearch } from "react-icons/fa";

export default function MyCourses() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingState, setLoadingState] = useState("LOADING");
  const [search, setSearch] = useState("");

  const fetchMyCourses = async () => {
    const myCoursesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-courses?search=${search}`
    )
      .then((response) => response.json())
      .catch((e) => {
        setLoadingState("LOADING_FAILED");
      });

    if (myCoursesResponse !== undefined) {
      setLoadingState("LOADING_SUCCEEDED");
      setCourses(myCoursesResponse);
    }
  };

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

  useEffect(() => {
    if (user === null) {
      fetchUserData();
    }
    fetchMyCourses();
  }, [search]);

  let message = "";
  if (loadingState === "LOADING") {
    message = "Loading your courses...";
  } else if (loadingState === "LOADING_FAILED") {
    message = "Unable to fetch your courses!";
  }

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Courses</h1>
        </header>

        {/* main section on top to show courses category  */}
        <section className={styles.statsSection}>
          <StatsCard courses={courses} />
        </section>

        {/* Filter - Search and adding new course are in this section  */}
        <section>
          <div className={styles.FiltersContainer}>
            <div className={styles.searchFilterGroup}>
              <div className={styles.searchWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                  placeholder="Filter courses..."
                />
              </div>
              <select className={styles.filterSelect}>
                <option value="all">All</option>
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

        <div>{message}</div>
        <section className={styles.listSection}>
          <MyCoursesGrid courses={courses} />
        </section>
      </div>
    </div>
  );
}
