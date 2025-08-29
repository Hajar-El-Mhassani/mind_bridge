import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContentWrapper}>
        <div className={styles.footerGrid}>
          {/* BrandSection  */}
          <div className={styles.brandSection}>
            <div className={styles.brandLogoWrapper}>
              <Image
                src="/footer/logo.png"
                alt="Logo of page"
                width={160}
                height={40}
              />
            </div>

            <p className={styles.brandDescription}>
              MindBridge is a leading AI platform revolutionizing financial risk
              discovery and anomaly detection for enterprises worldwide.
            </p>
          </div>

          {/* SocialSection  */}

          <div className={styles.socialSection}>
            <h3 className={styles.sectionTitle}>Follow Us</h3>
            <div className={styles.socialIconsWrapper}>
              " Social Media Icons"
            </div>
          </div>
          {/* NewsletterSection  */}

          <div className={styles.newsletterSection}>
            <h3 className={styles.sectionTitle}>Subscribe to our Newsletter</h3>
            <p className={styles.newsletterDescription}>
              Stay up-to-date with the latest news, features, and insights from
              MindBridge.
            </p>

            <form className={styles.newsletterForm}>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className={styles.emailInput}
              />
              <button type="submit" className={styles.subscribeButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
