import React, { useEffect, useState } from "react";
import styles from "./MyCourses.module.css";
import { FaBook, FaCheckCircle, FaRegFileAlt, FaUsers } from "react-icons/fa";

export default function StatsCard({ currentUser }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await fetch(
          "/data/user-stats.json?user_id" + currentUser.id
        );
        const statsData = await response.json();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      } finally {
      }
    };

    fetchStatsData();
  }, []);

  const ICONS = {
    total: <FaBook />,
    published: <FaCheckCircle />,
    draft: <FaRegFileAlt />,
    enroll: <FaUsers />,
  };

  // const stateMock = [
  //   {
  //     id: "total",
  //     title: "Total Courses",
  //     value: 8,
  //     subtitle: "All active courses",
  //   },
  //   {
  //     id: "published",
  //     title: "Published Courses",
  //     value: 4,
  //     subtitle: "Currently live",
  //   },
  //   {
  //     id: "draft",
  //     title: "Draft Courses",
  //     value: 3,
  //     subtitle: "Awaiting publication",
  //   },
  // ];

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
