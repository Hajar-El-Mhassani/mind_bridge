import React from "react";
import styles from "./FooterBar.module.css";
import Image from "next/image";

const socialLinks = [
  {
    href: "https://facebook.com/mindbridge_ai",
    label: "Facebook",
    src: "/footer/socialMedia/facebook.png",
  },
  {
    href: "https://twitter.com/mindbridge_ai",
    label: "Twitter",
    src: "/footer/socialMedia/twitter.png",
  },
  {
    href: "https://linkedin.com/in/mindbridge",
    label: "LinkedIn",
    src: "/footer/socialMedia/linkedin.png",
  },
  {
    href: "https://instagram.com/mindbridge",
    label: "Instagram",
    src: "/footer/socialMedia/instagram.png",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContentWrapper}>
        {/* <div className={styles.footerlinks}>
          <a href="/resources">Resources</a>
          <a href="/legal">Legal</a>
          <a href="/contact">Contact Us</a>
        </div> */}

        <div className={styles.socialSection}>
          <div className={styles.socialIconsWrapper}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.socialIconLink}
              >
                <Image
                  src={link.src}
                  alt={link.label}
                  width={20} //  1.25rem
                  height={20} // 1.25rem
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
