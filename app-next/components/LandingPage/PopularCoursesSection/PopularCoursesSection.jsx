import styles from "./PopularCoursesSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function PopularCoursesSection() {
  const courses = [
    {
      id: 1,
      title: "Mastering Modern Web Development",
      instructor: "Alice Johnson",
      description:
        "Dive deep into the latest web technologies, building responsive and dynamic applications from scratch. Learn React, Node.js, and more.",
      price: "$199.99",
      image: "/courses/course-1.png",
    },
    {
      id: 2,
      title: "Introduction to Data Science with Python",
      instructor: "Ben Carter",
      description:
        "An essential guide to data science using Python. Cover data analysis, machine learning fundamentals, and visualization techniques.",
      price: "$249.99",
      image: "/courses/course-2.png",
    },
    {
      id: 3,
      title: "Creative Graphic Design Fundamentals",
      instructor: "Clara Diaz",
      description:
        "Unleash your creativity with this course on graphic design. Learn principles of design, typography, color theory, and software essentials.",
      price: "$149.99",
      image: "/courses/course-3.png",
    },
  ];

  return (
    <section className={styles.popularCoursesSection}>
      <div className="container container-xl">
        <div className="section">
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2>Popular Courses at MindBridge</h2>
          </div>

          <div className="grid-3">
            {courses.map((course) => (
              <div key={course.id} className={`card ${styles.courseCard}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={406}
                    height={192}
                    className={styles.courseImage}
                  />
                </div>

                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseInstructor}>
                    By {course.instructor}
                  </p>
                  <p className={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div className={styles.courseFooter}>
                    <span className={styles.coursePrice}>{course.price}</span>
                    <button className={styles.viewCourseButton}>
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.browseAllWrapper}>
            <Link href="/public-courses" className={styles.browseAllButton}>
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
