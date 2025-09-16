"use client";

import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import MyCoursesGrid from "./MyCoursesGrid";
import StatsCard from "./StatsCard";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MyCourses() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingState, setLoadingState] = useState("LOADING");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchMyCourses = async () => {
    const myCoursesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-courses?search=${search}&category=${category}`
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
  }, [search, category]);

  const deleteCourse = async (id) => {
    const deleteCoursesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-courses/${id}`,
      {
        method: "DELETE",
      }
    ).catch((e) => {
      setLoadingState("DELETE_FAILED");
    });

    if (deleteCoursesResponse.status === 200) {
      fetchMyCourses();
    } else {
      setLoadingState("DELETE_FAILED");
    }
  };

  let message = "";
  if (loadingState === "LOADING") {
    message = "Loading your courses...";
  } else if (loadingState === "LOADING_FAILED") {
    message = "Unable to fetch your courses!";
  } else if (loadingState === "DELETE_FAILED") {
    message = "Unable to delete the course!";
  } else if (courses.length === 0) {
    message = "No courses found";
  }

  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/add-courses");
  };

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
              <select
                className={styles.filterSelect}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Sinence</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
                <option value="Music">Music</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Backend Development">Backend Development</option>
              </select>
            </div>
            <div>
              <button className={styles.addCourseBtn} onClick={handleAddCourse}>
                ＋ Add New Course
              </button>
            </div>
          </div>
        </section>

        <div>{message}</div>
        <section className={styles.listSection}>
          <MyCoursesGrid
            courses={courses}
            courseDeleteRequested={deleteCourse}
          />
        </section>
      </div>
    </div>
  );
}
