"use client";

import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import styles from "./TopBar.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

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
          <Image
            src={user.profile_picture}
            alt={`${user.first_name} ${user.last_name}`}
            width={40}
            height={40}
            className={styles.profilePic}
            onError={(e) => {
              e.target.src = "/images/default-avatar.jpg";
            }}
          />
        </div>
      </div>
    </div>
  );
}
