import styles from "./ContactUs.module.css";
import { useState } from "react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true); // Just show message (no backend)
  };
  return (
    <section className={styles.contactPage}>
      {/* Title Section */}
      <div className={styles.titleSection}>
        <h1>Contact Us</h1>
      </div>

      {/* Form + Info */}
      <div className={styles.contactContainer}>
        {/* Left Form */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <h1>Get Your touch</h1>
          <div className={styles.row}>
            <input type="text" placeholder="Your Name *" />
            <input type="email" placeholder="Email *" />
          </div>
          <input type="text" placeholder="Subject *" />
          <textarea rows="5" placeholder="Your Message *"></textarea>
          <button type="submit">Send Message</button>
          {sent && (
            <p className={styles.successMessage}>Message sent successfully!</p>
          )}
        </form>

        {/* Right Info */}
        <div className={styles.contactInfo}>
          <h3>Address</h3>
          <p>Copenhagen, Denmark - 2500</p>

          <h3>Contact</h3>
          <p>+45 26 83 07 52</p>
          <p>example@gmail.com</p>

          <h3>Open Time</h3>
          <p>Mon - Fri: 10:00 - 20:00</p>
          <p>Sat - Sun: 11:00 - 18:00</p>
        </div>
      </div>

      {/* Map */}
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19807.5795552477!2d-0.12085089785784149!3d51.503324644195225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900c3c2c3%3A0x2b0f3a4e2d86e475!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v163143646"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
