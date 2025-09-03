import React from "react";
import styles from "./MyCourses.module.css";

export default function StatsCard({ label, value, caption }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.value}>{value}</h2>
      <p className={styles.label}>{label}</p>
      <span className={styles.caption}>{caption}</span>
    </div>
  );
}
