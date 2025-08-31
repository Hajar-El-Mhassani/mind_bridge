
import React from "react";
import styles from "./CourseHeader.module.css";

const CourseHeader = () => {
  return (
    <div className={styles.courseHeaderContainer}>
      <div className={styles.courseHeaderWrapper}>
        <div>
          <h1 className={styles.courseHeaderTitle}>
            Explore Our Diverse Course Catalog
          </h1>
          <p className={styles.courseHeaderSubtitle}>
            Discover a world of knowledge with courses ranging from technology
            and design to business and arts. Find your passion and start
            learning today.
          </p>
        </div>

        <div className={styles.courseHeaderFilters}>
            <div>
          <div className={styles.filterGroup}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search courses..."
            />
            <select className={styles.filterSelect}>
              <option value="all">Category: All</option>
              <option value="tech">Technology</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">Level: All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">Instructor: All</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="alex">Alex Lee</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">Price: All</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          </div>
          <div>
            <select className={styles.filterSelect}>
              <option value="relevance">Sort By: Relevance</option>
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
