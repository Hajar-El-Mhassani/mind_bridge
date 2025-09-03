import React from "react";
import styles from "./MyCourses.module.css";

export default function statesCard({states=[]}) {


 const stateeMock = [
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

  const data = states.length ? states : stateeMock;

  return (
    <div className={styles.statesSection}>
      {data.map((s) => (
        <div key={s.id} className={styles.stateCard}>
          <div className={styles.stateTitleRow}>
            <div className={styles.stateTitle}>{s.title}</div>

            <div className={styles.iconPlaceholder} aria-hidden />
          </div>
          <div className={styles.stateValue}>{s.value}</div>
          <div className={styles.stateSubtitle}>{s.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
