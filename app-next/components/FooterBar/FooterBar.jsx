// components/FooterBar/FooterBar.jsx
import React from "react";
import styles from "./FooterBar.module.css";
import Image from "next/image";

const socialLinks = [
  {
    href: "https://facebook.com/mindbridge_ai",
    label: "Facebook",
    src: "/footer/socialmedia/facebook.png",
  },
  {
    href: "https://twitter.com/mindbridge_ai",
    label: "Twitter",
    src: "/footer/socialmedia/twitter.png",
  },
  {
    href: "https://linkedin.com/in/mindbridge",
    label: "LinkedIn",
    src: "/footer/socialmedia/linkedin.png",
  },
  {
    href: "https://instagram.com/mindbridge",
    label: "Instagram",
    src: "/footer/socialmedia/instagram.png",
  },
];

export default function FooterBar() {
  return (
    <footer className={styles.footerContainer}>
      <div className="container container-xl">
        <div className={styles.footerContentWrapper}>
          <div className={styles.footerlinks}>
            <a href="/resources">Resources</a>
            <a href="/legal">Legal</a>
            <a href="/contact">Contact Us</a>
          </div>

          <div className={styles.socialSection}>
            <div className={styles.socialIconsWrapper}>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.socialIconLink}
                  aria-label={link.label}
                >
                  <Image
                    src={link.src}
                    alt={link.label}
                    width={20}
                    height={20}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
