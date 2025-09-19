"use client";
import React, { useEffect, useState } from "react";
import styles from "./EditCourse.module.css";
import { useParams, useRouter } from "next/navigation";

export default function EditCourse() {
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
    created_by: "0",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/courses/course-3.png");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); //  new state for success/error message
  const [messageType, setMessageType] = useState(null); // "success" | "error"
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const fetchCourse = async () => {
    const token = localStorage.getItem("token");
    const coursesDetailsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-courses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((e) => {});

    if (coursesDetailsResponse !== undefined) {
      setFormData(coursesDetailsResponse);
      if (thumbnail === null) {
        setPreviewUrl(coursesDetailsResponse.image);
      }
    }
  };

  // update preview when file changes
  useEffect(() => {
    if (formData.created_by == "0") {
      fetchCourse();
      return;
    }

    if (!thumbnail) return;
    const objectUrl = URL.createObjectURL(thumbnail);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnail]);

  const handleCancel = (e) => {
    router.push("/my-courses/");
  };

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

    if (isNaN(formData.duration) || parseInt(formData.duration, 10) <= 0) {
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-courses/${id}`,
        {
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();

      if (res.ok) {
        router.push("/my-courses/");
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

  return (
    <div className={styles.editCourseContainer}>
      <h2 className={styles.title}>Edit Course</h2>
      <br />
      <form className={styles.courseForm} onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formRow}>
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
            {errors.status && (
              <p className={styles.errorText}>{errors.status}</p>
            )}
          </div>
        </div>
        {/* Description */}
        <div className={styles.formRow}>
          <div className={`${styles.formGroup}`}>
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
        </div>

        <div className={styles.formRow}>
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

          {/* Difficulty */}
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
        </div>
        <div className={styles.formRow}>
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
        </div>
        <div className={styles.formRow}>
          {/* Price */}
          <div className={styles.formGroup}>
            <label>Course Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
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
              value={formData.duration}
              onChange={handleChange}
              className={errors.duration ? styles.errorInput : ""}
            />
            {errors.duration && (
              <p className={styles.errorText}>{errors.duration}</p>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className={`${styles.formActions} ${styles.fullWidth}`}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Save Course
          </button>
        </div>
      </form>

      {/* ✅ Bottom message */}
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
