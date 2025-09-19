"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
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
  FiLogOut,
  FiSave,
  FiX,
  FiLock,
} from "react-icons/fi";

const handleSwitchChange = (settingName, value) => {
  console.log(`${settingName} changed to:`, value);
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    image: null,
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/auth");
      }
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (user && isEditing) {
      setEditFormData({
        name: user.name || "",
        email: user.email || "",
        date_of_birth: user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : "",
        image: null,
      });
      setImagePreview(null);
    }
  }, [user, isEditing]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsChangingPassword(false);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setIsEditing(false);
    setPasswordError(null);
    setPasswordSuccess(false);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      name: "",
      email: "",
      date_of_birth: "",
      image: null,
    });
    setImagePreview(null);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError(null);
    setPasswordSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", editFormData.name);
      formData.append("email", editFormData.email);
      if (editFormData.date_of_birth) {
        formData.append("date_of_birth", editFormData.date_of_birth);
      }
      if (editFormData.image) {
        formData.append("image", editFormData.image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUpdateSuccess(true);
      setIsEditing(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setUpdateError(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordError("New passwords do not match");
      setPasswordLoading(false);
      return;
    }

    if (passwordFormData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      setPasswordLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordFormData.currentPassword,
            newPassword: passwordFormData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setPasswordSuccess(true);
      setIsChangingPassword(false);
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (authLoading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div className={styles.loading}>Redirecting...</div>;
  }

  const getImageUrl = () => {
    if (!user.image) return "/images/default-avatar.jpg";

    if (user.image.startsWith("http")) {
      return user.image;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("NEXT_PUBLIC_API_URL not set, using default avatar");
      return "/images/default-avatar.jpg";
    }

    const apiBaseUrl = apiUrl.replace("/api", "");

    if (user.image.startsWith("/uploads")) {
      return `${apiBaseUrl}${user.image}`;
    }

    return `${apiBaseUrl}/uploads/users/${user.image}`;
  };

  const formatDateOfBirth = () => {
    if (!user.date_of_birth) return "Not provided";

    try {
      const date = new Date(user.date_of_birth);
      if (isNaN(date.getTime())) return "Not provided";
      return date.toLocaleDateString();
    } catch {
      return "Not provided";
    }
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
            unoptimized // Add this for Render deployment
            onError={(e) => {
              e.target.src = "/images/default-avatar.jpg";
            }}
          />
          <div className={styles.userName}>
            <h2>{user.name || "Unknown User"}</h2>
            <p>{user.email || "No email"}</p>
          </div>
        </div>
        <div className={styles.profileActions}>
          {!isEditing && !isChangingPassword ? (
            <button
              className={styles.pageButton}
              onClick={handleEditClick}
              aria-label="Edit user profile"
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles.editActions}>
              <button
                className={styles.cancelButton}
                onClick={
                  isEditing ? handleCancelEdit : handleCancelPasswordChange
                }
                aria-label="Cancel editing"
              >
                <FiX /> Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {updateSuccess && (
        <div className={styles.successMessage}>
          Profile updated successfully!
        </div>
      )}

      {passwordSuccess && (
        <div className={styles.successMessage}>
          Password changed successfully!
        </div>
      )}

      <section
        className={styles.section}
        aria-labelledby="user-profile-details"
      >
        <h2>Personal Information</h2>

        {!isEditing && !isChangingPassword ? (
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
            <ProfileCard
              icon={<FiPhone />}
              name="Phone"
              content="Not provided"
            />
            <ProfileCard
              icon={<FiCalendar />}
              name="Date of Birth"
              content={formatDateOfBirth()}
            />
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
        ) : isEditing ? (
          <form onSubmit={handleUpdateProfile} className={styles.editForm}>
            <div className={styles.editFormGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  <FiUser /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  <FiMail /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="date_of_birth" className={styles.label}>
                  <FiCalendar /> Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={editFormData.date_of_birth}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="image" className={styles.label}>
                  <FiUser /> Profile Picture
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </div>
            </div>

            {updateError && (
              <div className={styles.errorMessage}>{updateError}</div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={updateLoading}
              >
                <FiSave /> {updateLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className={styles.editForm}>
            <div className={styles.passwordFormGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="currentPassword" className={styles.label}>
                  <FiLock /> Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordInputChange}
                  className={styles.input}
                  placeholder="Enter your current password"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="newPassword" className={styles.label}>
                  <FiLock /> New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordInputChange}
                  className={styles.input}
                  placeholder="Enter your new password"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  <FiLock /> Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className={styles.input}
                  placeholder="Confirm your new password"
                  required
                />
              </div>
            </div>

            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={passwordLoading}
              >
                <FiSave /> {passwordLoading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        )}
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
              <button
                className={styles.pageButton}
                onClick={handleChangePasswordClick}
              >
                Change Password
              </button>
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
