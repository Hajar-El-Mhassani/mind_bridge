// components/ProfilePage/ProfilePage.jsx
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
        console.log("Fetching from:", `${backendUrl}/api/users/1`);

        const response = await fetch(`${backendUrl}/api/users/1`);

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
    <main>
      <div className="section-header">
        <h1>Profile Overview</h1>
      </div>

      <section className={`card ${styles.profileTopCard}`}>
        <div className={styles.profileTopContent}>
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
            <div className={styles.userInfo}>
              <h2>{user.name || "Unknown User"}</h2>
              <p>{user.email || "No email"}</p>
            </div>
          </div>
          <button className={styles.editButton} aria-label="Edit user profile">
            Edit Profile
          </button>
        </div>
      </section>

      <section className={`card ${styles.personalInfoCard}`}>
        <div className="section-header">
          <h2>Personal Information</h2>
        </div>
        <div className="grid-2">
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

      <section className="card">
        <div className="section-header">
          <h2>Account Settings</h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <h3>Account Security</h3>
            <div className={styles.settingsOption}>
              <p>Password</p>
              <button className={styles.settingsButton}>Change Password</button>
            </div>
            <div className={styles.settingsOption}>
              <p>Two-Factor Authentication</p>
              <Switch
                initialState={false}
                onChange={(value) => handleSwitchChange("2FA", value)}
              />
            </div>
            <div className={styles.settingsOption}>
              <p>Recent Activity</p>
              <button className={styles.settingsButton}>View Activity</button>
            </div>
          </div>

          <div className="card">
            <h3>Notification Preferences</h3>
            <div className={styles.settingsOption}>
              <p>Email Notifications</p>
              <Switch
                initialState={true}
                onChange={(value) => handleSwitchChange("email", value)}
              />
            </div>
            <div className={styles.settingsOption}>
              <p>SMS Notifications</p>
              <Switch
                initialState={false}
                onChange={(value) => handleSwitchChange("sms", value)}
              />
            </div>
            <div className={styles.settingsOption}>
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
