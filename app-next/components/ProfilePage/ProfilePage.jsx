"use client";
import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Switch from "../General/Switch";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiBriefcase,
} from "react-icons/fi";

const handleSwitchChange = (settingName, value) => {
  console.log(`${settingName} changed to:`, value);
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        console.log("Fetching from:", `${backendUrl}/api/users/w`);

        const response = await fetch(`${backendUrl}/api/users/2`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Failed to load profile data</div>;
  }

  const getImageUrl = () => {
    if (!user.image) return "/images/default-avatar.jpg";

    if (user.image.startsWith("/uploads")) {
      return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}${
        user.image
      }`;
    }

    return user.image;
  };

  return (
    <main className={styles.profileContainer}>
      <header>
        <h1 className={styles.profileHeader}>Profile Overview</h1>
      </header>

      <section className={styles.profileTop} aria-labelledby="user-info">
        <div className={styles.userDetails}>
          <Image
            src={getImageUrl()}
            alt={user.name || "User"}
            width={100}
            height={100}
            className={styles.profileImage}
            onError={(e) => {
              e.target.src = "/images/default-avatar.jpg";
            }}
          />
          <div className={styles.userName}>
            <h2>{user.name || "Unknown User"}</h2>
            <p>{user.email || "No email"}</p>
          </div>
        </div>
        <button className={styles.pageButton} aria-label="Edit user profile">
          Edit Profile
        </button>
      </section>

      <section
        className={styles.section}
        aria-labelledby="user-profile-details"
      >
        <h2>Personal Information</h2>
        <div className={styles.cardGrid}>
          <ProfileCard
            icon={<FiUser />}
            name="Full Name"
            content={user.name || "Not provided"}
          />
          <ProfileCard
            icon={<FiMail />}
            name="Email Address"
            content={user.email || "Not provided"}
          />
          <ProfileCard icon={<FiPhone />} name="Phone" content="Not provided" />
          <ProfileCard
            icon={<FiCalendar />}
            name="Member Since"
            content={
              user.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "Unknown"
            }
          />
          <ProfileCard icon={<FiBriefcase />} name="Role" content="Teacher" />
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="user-profile-activity"
      >
        <h2>Account Settings</h2>
        <div className={styles.settingsRow}>
          <div className={styles.settingsCard}>
            <h3>Account Security</h3>
            <div className={styles.settingsCardOption}>
              <p>Password</p>
              <button className={styles.pageButton}>Change Password</button>
            </div>
            <div className={styles.settingsCardOption}>
              <p>Two-Factor Authentication</p>
              <Switch
                initialState={false}
                onChange={(value) => handleSwitchChange("2FA", value)}
              />
            </div>
            <div className={styles.settingsCardOption}>
              <p>Recent Activity</p>
              <button className={styles.pageButton}>View Activity</button>
            </div>
          </div>
          <div className={styles.settingsCard}>
            <h3>Notification Preferences</h3>
            <div className={styles.settingsCardOption}>
              <p>Email Notifications</p>
              <Switch
                initialState={true}
                onChange={(value) => handleSwitchChange("email", value)}
              />
            </div>
            <div className={styles.settingsCardOption}>
              <p>SMS Notifications</p>
              <Switch
                initialState={false}
                onChange={(value) => handleSwitchChange("sms", value)}
              />
            </div>
            <div className={styles.settingsCardOption}>
              <p>In-app Notifications</p>
              <Switch
                initialState={true}
                onChange={(value) => handleSwitchChange("inApp", value)}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
