"use client";

import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search courses..."
          className={styles.searchInput}
        />
      </div>
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
