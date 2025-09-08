"use client";

import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.logOutContainer}>
        <button className={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
        <div className={styles.profilePicContainer}>
          <img className={styles.profilePic} />
        </div>
      </div>
    </div>
  );
}
