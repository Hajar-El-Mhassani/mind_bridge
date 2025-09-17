"use client";
import { useState } from "react";
import styles from "./ContactUser.module.css";
import { FaHome } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { MdAddCall } from "react-icons/md";

export default function ContactUser() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactCard}>
        {/* Left side - Contact Info */}
        <div className={styles.contactInfo}>
          <h2>Contact Us</h2>
          <p>
            <span className={styles.icon}>
              <FaHome />
            </span>
            MindBridge Building 1, Copenhagen, Denmark
          </p>
          <p>
            <span className={styles.icon}>
              <SlEnvolope />
            </span>
            support@example.com
          </p>
          <p>
            <span className={styles.icon}>
              <MdAddCall />
            </span>
            +45 75 63 73 92
          </p>
        </div>

        {/* Right side - Form */}
        <div className={styles.contactForm}>
          <h2>Get in Touch</h2>
          <p>Feel free to drop us a line below!</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" placeholder="Subject" required />
            <textarea
              placeholder="Type your message here..."
              rows="5"
              required
            />
            <button type="submit">Send</button>
          </form>

          {sent && (
            <p className={styles.successMessage}>Your message has been sent!</p>
          )}
        </div>
      </div>
    </div>
  );
}
