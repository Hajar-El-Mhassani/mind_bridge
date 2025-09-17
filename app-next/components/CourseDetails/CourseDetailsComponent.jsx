import React from 'react';
import Image from 'next/image';
import styles from './CourseDetails.module.css';

export default function CourseDetailsComponent({ course }) {
  if (!course) {
    return <div>Data not available.</div>;
  }

  const imageUrl = course.image;

  return (
    <div className={styles.courseDetailsContainer}>
      {imageUrl && (
        <div className={styles.courseImageWrapper}>
          <Image
            src={imageUrl}
            alt={course.title}
            width={600}
            height={400}
            layout="responsive"
            objectFit="cover"
            className={styles.courseImage}
            unoptimized={true}
          />
        </div>
      )}

      <h1 className={styles.courseTitle}>{course.title}</h1>
      <p className={styles.courseDescription}>{course.description}</p>
      
      <div className={styles.courseMeta}>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Price:</strong> {course.price === 0 ? 'Free' : `$${course.price}`}</p>
        <p><strong>Status:</strong> {course.status}</p>
      </div>
       {/* Show list of lessons*/}
      {course.lessons && course.lessons.length > 0 && (
        <div className={styles.lessonsSection}>
          <h2 className={styles.lessonsTitle}>Lessons</h2>
          <ol className={styles.lessonList}>
            {course.lessons.map((lesson) => (
              <li key={lesson.id} className={styles.lessonItem}>
                <span className={styles.lessonTitle}>{lesson.title}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      
    </div>
  );
}
   