import styles from "./ProfilePage.module.css";

export default function ProfileCard({ icon, name, content }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.details}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}
