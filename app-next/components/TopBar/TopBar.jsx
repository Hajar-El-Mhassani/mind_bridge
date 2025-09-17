"use client";

import { FaSignOutAlt } from "react-icons/fa";
import styles from "./TopBar.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";

export default function TopBar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getImageUrl = () => {
    if (!user?.image) return "/images/default-avatar.jpg";

    if (!user.image.startsWith("http") && !user.image.startsWith("/uploads")) {
      return `http://localhost:3001/uploads/users/${user.image}`;
    }

    if (user.image.startsWith("/uploads")) {
      return `http://localhost:3001${user.image}`;
    }

    return user.image;
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.logOutContainer}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
        <div className={styles.profilePicContainer}>
          <Image
            src={getImageUrl()}
            alt={user?.name || "User"}
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
