"use client";

import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import MyCoursesGrid from "./MyCoursesGrid";
import StatsCard from "./StatsCard";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function MyCourses() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingState, setLoadingState] = useState("LOADING");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchMyCourses = async () => {
    if (!isAuthenticated || !user) {
      setLoadingState("LOADING_FAILED");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-courses?search=${search}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const myCoursesResponse = await response.json();
        setLoadingState("LOADING_SUCCEEDED");
        setCourses(myCoursesResponse);
      } else {
        setLoadingState("LOADING_FAILED");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoadingState("LOADING_FAILED");
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchMyCourses();
    }
  }, [search, category, isAuthenticated, authLoading]);

  const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-courses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchMyCourses();
      } else {
        setLoadingState("DELETE_FAILED");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setLoadingState("DELETE_FAILED");
    }
  };

  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/add-courses");
  };

  if (authLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth");
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Redirecting...</div>
      </div>
    );
  }

  let message = "";

  if (loadingState === "LOADING") {
    message = "Loading your courses...";
  } else if (loadingState === "LOADING_FAILED") {
    message = "Unable to fetch your courses!";
  } else if (loadingState === "DELETE_FAILED") {
    message = "Unable to delete the course!";
  }

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Courses</h1>
        </header>

        <section className={styles.statsSection}>
          <StatsCard courses={courses} />
        </section>

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
                <option value="All">Categories: All</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
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

        {message && <div className={styles.message}>{message}</div>}

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
