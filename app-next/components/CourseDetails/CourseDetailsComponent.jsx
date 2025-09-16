import React from 'react';
import Image from 'next/image';
import styles from './CourseDetails.module.css';

export default function CourseDetailsComponent({ course }) {
  if (!course) {
    return <div>Data not available.</div>; // Message in English for consistency
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
    </div>
  );
}