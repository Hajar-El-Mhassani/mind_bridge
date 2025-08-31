"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.wrap}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            Share Your{" "}
            <span className={styles.highlight}> Expertise, Knowledge,</span>
            <br />
            <span className={styles.tight}>Grow Your Community</span>
          </h1>

          <p className={styles.lead}>
            <strong className={styles.brand1}>Mind</strong>
            <strong className={styles.brand2}>Bridge </strong>is your platform
            to easily create, publish, and share engaging online courses with a
            global audience. Empower learners, expand your reach, and foster a
            vibrant educational community.
          </p>

          <div className={styles.actions}>
            <Link
              href="/public-courses"
              className={`${styles.btn} ${styles.primary}`}
            >
              Explore Courses
            </Link>
            <Link
              href="/instructor"
              className={`${styles.btn} ${styles.ghost}`}
            >
              Become an Instructor
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className={styles.media}>
          <img
            src="/hero/hero.png"
            alt="Learners collaborating"
            className={styles.art}
            width="900"
            height="640"
          />
        </div>
      </div>
    </section>
  );
}
