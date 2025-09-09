import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import { FaBook, FaCheckCircle, FaRegFileAlt, FaUsers } from "react-icons/fa";

export default function StatsCard({ courses }) {
  const ICONS = {
    total: <FaBook />,
    published: <FaCheckCircle />,
    draft: <FaRegFileAlt />,
    enroll: <FaUsers />,
  };

  const stats = [];
  stats.push({
    title: "Total Courses",
    value: courses.length,
    subtitle: "All active courses",
  });

  stats.push({
    title: "Published Courses",
    value: courses.filter((c) => c.status === "published").length,
    subtitle: "Currently live",
  });
  
  stats.push({
    title: "Draft Courses",
    value: courses.filter((c) => c.status === "draft").length,
    subtitle: "Awaiting publication",
  });
  

  return (
    <div className={styles.statsSection}>
      {stats.map((s) => (
        <div key={s.id} className={styles.statCard}>
          <div className={styles.statTitleRow}>
            <div className={styles.statTitle}>{s.title}</div>

            <div className={styles.iconPlaceholder}>{ICONS[s.id]}</div>
          </div>
          <div className={styles.statValue}>{s.value}</div>
          <div className={styles.statSubtitle}>{s.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
