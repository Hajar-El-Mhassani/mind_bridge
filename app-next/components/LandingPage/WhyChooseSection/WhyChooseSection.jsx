import styles from "./WhyChooseSection.module.css";
import Image from "next/image";

export default function WhyChooseSection() {
  return (
    <section className={styles.whyChooseSection}>
      <div className="container container-xl">
        <div className="section">
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2>Why Choose MindBridge?</h2>
          </div>

          <div className="grid-3">
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/whymindsection/Expert.png"
                  alt="Expert-Led Instruction Icon"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.cardTitle}>Expert-Led Instruction</h3>
              <p className={styles.cardDescription}>
                Learn from industry professionals and experienced educators
                dedicated to your success.
              </p>
            </div>

            <div className={`card ${styles.featureCard}`}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/whymindsection/Flexible.png"
                  alt="Flexible Learning Icon"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.cardTitle}>Flexible Learning</h3>
              <p className={styles.cardDescription}>
                Access courses anywhere, anytime. Fit learning into your
                schedule with our flexible options.
              </p>
            </div>

            <div className={`card ${styles.featureCard}`}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/whymindsection/Community.png"
                  alt="Community Support Icon"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.cardTitle}>Community Support</h3>
              <p className={styles.cardDescription}>
                Join a vibrant community of learners. Collaborate, share
                insights, and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
