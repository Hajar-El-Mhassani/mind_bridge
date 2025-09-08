"use client";

import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import styles from "./TopBar.module.css";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/user.json");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.topbar}>
      <div className={styles.logOutContainer}>
        <button className={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
        <div className={styles.profilePicContainer}>
          <img className={styles.profilePic} src={user.profile_picture} />
        </div>
      </div>
    </div>
  );
}
