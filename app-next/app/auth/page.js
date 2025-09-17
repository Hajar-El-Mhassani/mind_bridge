"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./auth.module.css";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, loading, error, isAuthenticated, clearError } =
    useAuth();
  const hasRedirected = useRef(false);

  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!loading && isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      window.location.href = "/profile";
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    clearError();
    setFormErrors({});
  }, [mode, clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
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

  const validateForm = () => {
    const errors = {};

    if (mode === "register" && !formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (mode === "register" && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (
      mode === "register" &&
      formData.image &&
      formData.image.size > 5 * 1024 * 1024
    ) {
      errors.image = "Image must be less than 5MB";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (hasRedirected.current) {
      return;
    }

    const result =
      mode === "login"
        ? await login(formData.email, formData.password)
        : await register(
            formData.name,
            formData.email,
            formData.password,
            formData.dateOfBirth,
            formData.image
          );

    if (result.success) {
      hasRedirected.current = true;
      window.location.href = "/profile";
    }
  };

  const switchMode = () => {
    const newMode = mode === "login" ? "register" : "login";
    setMode(newMode);

    if (typeof window !== "undefined") {
      const url = new URL(window.location);
      url.searchParams.set("mode", newMode);
      window.history.replaceState({}, "", url);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      image: null,
    });
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Back to Homepage
        </Link>
        <div className={styles.logoSection}>
          <Image
            src="/auth/auth_logo.png"
            alt="MindBridge Logo"
            width={400}
            height={200}
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.formSection}>
          <div className={styles.authCard}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Back to Homepage
        </Link>
        <div className={styles.logoSection}>
          <Image
            src="/auth/auth_logo.png"
            alt="MindBridge Logo"
            width={400}
            height={200}
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.formSection}>
          <div className={styles.authCard}>
            <p>Redirecting to profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Homepage
      </Link>

      <div className={styles.logoSection}>
        <Image
          src="/auth/auth_logo.png"
          alt="MindBridge Logo"
          width={400}
          height={200}
          className={styles.logo}
          priority
        />
      </div>

      <div className={styles.formSection}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className={styles.subtitle}>
            {mode === "login"
              ? "Sign in to your MindBridge account"
              : "Join MindBridge and start learning"}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === "register" && (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      formErrors.name ? styles.inputError : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <span className={styles.error}>{formErrors.name}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="dateOfBirth" className={styles.label}>
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="image" className={styles.label}>
                    Profile Picture (Optional)
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  {formErrors.image && (
                    <span className={styles.error}>{formErrors.image}</span>
                  )}
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
              </>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  formErrors.email ? styles.inputError : ""
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <span className={styles.error}>{formErrors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  formErrors.password ? styles.inputError : ""
                }`}
                placeholder="Enter your password"
              />
              {formErrors.password && (
                <span className={styles.error}>{formErrors.password}</span>
              )}
            </div>

            {mode === "register" && (
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    formErrors.confirmPassword ? styles.inputError : ""
                  }`}
                  placeholder="Confirm your password"
                />
                {formErrors.confirmPassword && (
                  <span className={styles.error}>
                    {formErrors.confirmPassword}
                  </span>
                )}
              </div>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className={styles.switchMode}>
            <p>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={switchMode}
                className={styles.switchButton}
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
