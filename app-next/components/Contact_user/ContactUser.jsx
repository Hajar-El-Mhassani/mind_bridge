"use client";
import { useState } from "react";
import styles from "./ContactUser.module.css";

export default function ContactUser() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true); // Just show message (no backend)
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <p className={styles.intro}>
        We'd love to hear from you! Please fill out the form below.
      </p>

      <div className={styles.contactGrid}>
        {/* Form */}

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h3>Send us a message</h3>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="John Doe" required />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@example.com"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            placeholder="Your message..."
            required
          ></textarea>

          <button type="submit">Send Message</button>

          {sent && (
            <p className={styles.successMessage}>Message sent successfully!</p>
          )}
        </form>

        {/* Info */}
        <div className={styles.contactInfo}>
          <h3>Get in touch</h3>
          <p>Copenhagen, Denmark 2500</p>
          <p>+45 26 83 07 52</p>
          <p>support@example.com</p>
        </div>
      </div>
    </div>
  );
}
