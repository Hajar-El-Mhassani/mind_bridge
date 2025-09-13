import React from "react";
import styles from "./AddCourse.module.css";

export default function AddCourse() {
  return (
    <div className={styles.addCourseContainer}>
      <h2 className={styles.title}>Add New Course</h2>
      <p className={styles.subtitle}>
        Fill in the details below to create a new course.
      </p>

      <form className={styles.courseForm}>
        {/* Course Title */}
        <div className={styles.formGroup}>
          <label>Course Title</label>
          <input type="text" placeholder="Introduction to React Hooks" />
        </div>

        {/* Short Description */}
        <div className={styles.formGroup}>
          <label>Short Description</label>
          <input type="text" placeholder="Master state, effects, and context" />
        </div>

        {/* Course Description (full width) */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Course Description</label>
          <textarea
            rows="4"
            placeholder="This comprehensive course covers all essential React Hooks..."
          ></textarea>
        </div>

        {/* Course Category */}
        <div className={styles.formGroup}>
          <label>Course Category</label>
          <select>
            <option>Web Development</option>
            <option>Data Science</option>
            <option>Design</option>
          </select>
        </div>

        {/* Difficulty Level */}
        <div className={styles.formGroup}>
          <label>Difficulty Level</label>
          <select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Thumbnail Upload */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Course Thumbnail</label>
          <div className={styles.thumbnailUpload}>
            <div className={styles.thumbnailBox}>
              <img src="/courses/course-3.png" alt="Thumbnail" />
            </div>
            <button type="button" className={styles.uploadBtn}>
              Upload Image
            </button>
          </div>
        </div>

        {/* Price */}
        <div className={styles.formGroup}>
          <label>Course Price</label>
          <input type="number" placeholder="99.99" />
        </div>

        {/* Duration */}
        <div className={styles.formGroup}>
          <label>Course Duration (hours)</label>
          <input type="number" placeholder="18" />
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label>Course Status</label>
          <select>
            <option>Draft</option>
            <option>Published</option>
            <option>Archived</option>
          </select>
        </div>

        {/* Buttons */}
        <div className={`${styles.formActions} ${styles.fullWidth}`}>
          <button type="button" className={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
}
