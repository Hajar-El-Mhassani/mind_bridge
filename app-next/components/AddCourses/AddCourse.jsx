"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./AddCourse.module.css";

export default function AddCourse() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const categories = [
    "Web Development",
    "Data Science",
    "Design",
    "Business",
    "Arts",
    "Music",
    "Data Analysis",
    "Backend Development",
  ];
  const difficultyLevels = ["beginner", "intermediate", "advanced"];
  const courseStatus = ["draft", "published", "archived"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0],
    status: courseStatus[0],
    level: difficultyLevels[0],
    price: "1",
    duration: "1",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/courses/course-3.png");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!thumbnail) return;
    const objectUrl = URL.createObjectURL(thumbnail);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.status.trim()) newErrors.status = "Status is required";
    if (!formData.level.trim())
      newErrors.level = "Difficulty level is required";
    if (!formData.price.trim() || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.duration.trim() || parseInt(formData.duration, 10) <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors above.");
      setMessageType("error");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (thumbnail) data.append("thumbnail", thumbnail);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-course`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (res.ok) {
        setMessage("Course created successfully!");
        setMessageType("success");
        setTimeout(() => {
          router.push("/my-courses");
        }, 2000);
      } else {
        setMessage(" " + (result.error || "Failed to create course"));
        setMessageType("error");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setMessage("Network error");
      setMessageType("error");
    }
  };

  if (authLoading) {
    return (
      <div className={styles.addCourseContainer}>
        <div className={styles.loadingMessage}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.addCourseContainer}>
        <div className={styles.loadingMessage}>Redirecting...</div>
      </div>
    );
  }

  return (
    <div className={styles.addCourseContainer}>
      <h2 className={styles.title}>Add New Course</h2>
      <p className={styles.subtitle}>
        Fill in the details below to create a new course.
      </p>

      <form className={styles.courseForm} onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? styles.errorInput : ""}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label>Course Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={errors.status ? styles.errorInput : ""}
          >
            {courseStatus.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p className={styles.errorText}>{errors.status}</p>}
        </div>

        {/* Description */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Course Description</label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? styles.errorInput : ""}
          ></textarea>
          {errors.description && (
            <p className={styles.errorText}>{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div className={styles.formGroup}>
          <label>Course Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? styles.errorInput : ""}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={styles.errorText}>{errors.category}</p>
          )}
        </div>

        {/* Level */}
        <div className={styles.formGroup}>
          <label>Difficulty Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={errors.level ? styles.errorInput : ""}
          >
            {difficultyLevels.map((level, i) => (
              <option key={i} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && <p className={styles.errorText}>{errors.level}</p>}
        </div>

        {/* Thumbnail */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Course Thumbnail</label>
          <div className={styles.thumbnailUpload}>
            <div className={styles.thumbnailBox}>
              <img src={previewUrl} alt="Thumbnail Preview" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.uploadBtn}
            />
          </div>
        </div>

        {/* Price */}
        <div className={styles.formGroup}>
          <label>Course Price</label>
          <input
            type="number"
            name="price"
            value={formData.price.toString()}
            onChange={handleChange}
            className={errors.price ? styles.errorInput : ""}
          />
          {errors.price && <p className={styles.errorText}>{errors.price}</p>}
        </div>

        {/* Duration */}
        <div className={styles.formGroup}>
          <label>Course Duration (hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration.toString()}
            onChange={handleChange}
            className={errors.duration ? styles.errorInput : ""}
          />
          {errors.duration && (
            <p className={styles.errorText}>{errors.duration}</p>
          )}
        </div>

        <div className={`${styles.formActions} ${styles.fullWidth}`}>
          <button type="button" className={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Save Course
          </button>
        </div>
      </form>

      {message && (
        <p
          className={
            messageType === "success" ? styles.successText : styles.errorText
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
