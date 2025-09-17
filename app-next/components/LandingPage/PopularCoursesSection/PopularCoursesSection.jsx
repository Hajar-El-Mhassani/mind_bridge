"use client";
import styles from "./PopularCoursesSection.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function PopularCourseCard({ course }) {
  const [creatorName, setCreatorName] = useState(course.created_by);

  useEffect(() => {
    if (!isNaN(course.created_by)) {
      fetchCreatorName(course.created_by);
    }
  }, [course.created_by]);

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

  return (
    <div className={styles.courseCard}>
      <Image
        src={course.image || "/courses/default-course.png"}
        alt={course.title}
        width={406}
        height={192}
        className={styles.courseImage}
        onError={(e) => {
          e.target.src = "/courses/default-course.png";
        }}
      />
      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseInstructor}>By {creatorName}</p>
        <p className={styles.courseDescription}>{course.description}</p>
        <div className={styles.courseFooter}>
          <span className={styles.coursePrice}>
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
          <Link href={`/${course.id}`}>
            <button className={styles.viewCourseButton}>View Course</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PopularCoursesSection() {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const fetchPopularCourses = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`
      );
      const allCourses = await response.json();

      const shuffled = allCourses.sort(() => 0.5 - Math.random());
      const randomCourses = shuffled.slice(0, 3);

      setPopularCourses(randomCourses);
    } catch (error) {
      console.error("Failed to fetch popular courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Popular Courses at MindBridge</h2>
        <div className={styles.coursesWrapper}>
          <div>Loading popular courses...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Popular Courses at MindBridge</h2>

      <div className={styles.coursesWrapper}>
        {popularCourses.map((course) => (
          <PopularCourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className={styles.browseAllWrapper}>
        <Link href="/public-courses" className={styles.browseAllButton}>
          Browse All Courses
        </Link>
      </div>
    </section>
  );
}
