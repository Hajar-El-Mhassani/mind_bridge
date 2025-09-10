import React from "react";
import styles from "./MyCourses.module.css";
import { FaBook, FaCheckCircle, FaRegFileAlt, FaUsers } from "react-icons/fa";

export default function StatsCard({ stats = [] }) {
  const ICONS = {
    total: <FaBook />,
    published: <FaCheckCircle />,
    draft: <FaRegFileAlt />,
    enroll: <FaUsers />,
  };

  const statsMock = [
    {
      id: "total",
      title: "Total Courses",
      value: 8,
      subtitle: "All active courses",
    },
    {
      id: "published",
      title: "Published Courses",
      value: 4,
      subtitle: "Currently live",
    },
    {
      id: "draft",
      title: "Draft Courses",
      value: 3,
      subtitle: "Awaiting publication",
    },
    {
      id: "enroll",
      title: "Total Enrollments",
      value: 830,
      subtitle: "Across all courses",
    },
  ];

  const data = stats.length ? stats : statsMock;

  return (
    <div className="grid-2">
      {data.map((s) => (
        <div key={s.id} className={`card ${styles.statCard}`}>
          <div className={styles.statHeader}>
            <div className={styles.statTitle}>{s.title}</div>
            <div className={styles.statIcon}>{ICONS[s.id]}</div>
          </div>
          <div className={styles.statValue}>{s.value}</div>
          <div className={styles.statSubtitle}>{s.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
