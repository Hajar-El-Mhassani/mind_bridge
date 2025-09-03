"use client";
import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiBriefcase,
} from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/user.json");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
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

  return (
    <main className={styles.profileContainer}>
      <header>
        <h1 className={styles.profileHeader}>Profile Overview</h1>
      </header>

      <section className={styles.profileTop} aria-labelledby="user-info">
        <div className={styles.userDetails}>
          <Image
            src={user.profile_picture}
            alt={`${user.first_name} ${user.last_name}`}
            width={100}
            height={100}
            className={styles.profileImage}
            onError={(e) => {
              e.target.src = "/images/default-avatar.jpg";
            }}
          />
          <div className={styles.userName}>
            <h2>{`${user.first_name} ${user.last_name}`}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button className={styles.editButton} aria-label="Edit user profile">
          Edit Profile
        </button>
      </section>

      <section
        className={styles.profileDetails}
        aria-labelledby="user-profile-details"
      >
        <h2>Personal Information</h2>
        <div className={styles.cardGrid}>
          <ProfileCard
            icon={<FiUser />}
            name="Full Name"
            content={`${user.first_name} ${user.last_name}`}
          />
          <ProfileCard
            icon={<FiMail />}
            name="Email Address"
            content={user.email}
          />
          <ProfileCard
            icon={<FiPhone />}
            name="Phone"
            content={user.phone_number}
          />
          <ProfileCard
            icon={<FiCalendar />}
            name="Birthday"
            content={user.date_of_birth}
          />
          <ProfileCard
            icon={<FiBriefcase />}
            name="Role"
            content={user.role || "Not specified"}
          />
        </div>
      </section>
    </main>
  );
}
