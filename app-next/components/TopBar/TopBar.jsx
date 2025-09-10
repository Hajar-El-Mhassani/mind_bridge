"use client";

import { FaSearch, FaSignOutAlt, FaBell, FaUser } from "react-icons/fa";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className="container container-xl">
        <div className={styles.topbarContent}>
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search courses..."
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.actionsSection}>
            <button
              className={styles.notificationBtn}
              aria-label="Notifications"
            >
              <FaBell />
              <span className={styles.notificationBadge}>3</span>
            </button>

            <div className={styles.userSection}>
              <div className={styles.profilePicContainer}>
                <img
                  src="/images/default-avatar.jpg"
                  alt="User profile"
                  className={styles.profilePic}
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.jpg";
                  }}
                />
              </div>

              <button className={styles.logoutBtn}>
                <FaSignOutAlt />{" "}
                <span className={styles.logoutText}>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
