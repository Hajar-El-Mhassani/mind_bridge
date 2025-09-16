import React from "react";
import styles from "./CourseHeader.module.css";

export default function CourseHeader({
  authors,
  selectedAuthor,
  onSelectedAuthorChange,
  search,
  onSearchChange,
  category,
  onCategoyChange,
  level,
  onLevelChange,
  price,
  onPriceChange,
  sort,
  onSortChange,
}) {
  // console.log(authors)
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
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
                placeholder="Search courses..."
              />
              <select
                className={styles.filterSelect}
                value={category}
                onChange={(e) => onCategoyChange(e.target.value)}
              >
                <option value="All">Categories: All </option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
                <option value="Music">Music</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Backend Development">Backend Development</option>
              </select>
              <select
                className={styles.filterSelect}
                value={level}
                onChange={(e) => onLevelChange(e.target.value)}
              >
                <option value="All">Level: All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                className={styles.filterSelect}
                value={selectedAuthor}
                onChange={(e) => onSelectedAuthorChange(e.target.value)}
              >
                <option value="All">Instructor: All</option>
                {authors.map((a) => (
                  <option value={a.created_by}>{a.creator_name}</option>
                ))}
              </select>
              <select
                className={styles.filterSelect}
                value={price}
                onChange={(e) => onPriceChange(e.target.value)}
              >
                <option value="All">Price: All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div>
            <select
              className={styles.filterSelect}
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
