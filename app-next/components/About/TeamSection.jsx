import Image from "next/image";
import TeamMemberCard from "./TeamMemberCard.jsx";
import styles from "./About.module.css";

const teamMembers = [
  {
    id: 1,
    name: "Maksym Dronov",
    role: "Member of team",
    photo: "/images/maksym.jpg",
    linkedin: "https://www.linkedin.com/in/maksym-dronov",
  },
  {
    id: 2,
    name: "Monireh Zargarnejad",
    role: "Member of team",
    photo: "/images/monireh.png",
    linkedin: "https://www.linkedin.com/in/monireh-zargarnejad",
  },
  {
    id: 3,
    name: "Hajar El Mhassani",
    role: "Member of team",
    photo: "/images/hajar.jpg",
    linkedin: "https://www.linkedin.com/in/hajar-el-mhassani",
  },
  {
    id: 4,
    name: "Amin Babapour",
    role: "Member of team",
    photo: "/images/amin.JPG",
    linkedin: "https://www.linkedin.com/in/amin-babapour",
  },
];

const directors = [
  {
    name: "Helena Birkholm",
    role: "Managing Director",
    photo: "/images/helena.jpg",
  },
  {
    name: "Saloumeh Sarabi",
    role: "Program Manager",
    photo: "/images/saloumeh.jpg",
  },
  {
    name: "Anna Lulu",
    role: "Data & Partnership Manager",
    photo: "/images/anna.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>About Us</h2>
      <p className={styles.aboutDescription}>
        We are a team of four who collaborated on this final project as part of
        the **HackYourFuture** program. This project not only helped us practice
        our coding skills but also provided an opportunity to learn teamwork,
        problem-solving, and effective communication. We are proud to be a part
        of the HackYourFuture community.
      </p>

      <div className={styles.teamGrid}>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Combined Section for HackYourFuture and Directors */}
      <section className={styles.hackYourFutureAndDirectorsSection}>
        <div className={styles.hackYourFutureHeader}>
          <Image
            src="/images/hyf.jpg"
            alt="Hack Your Future Logo"
            width={150}
            height={70}
            className={styles.hyfLogo}
          />
          <h3 className={styles.specialThanksTitle}>
            Special Thanks to Our Directors
          </h3>
        </div>

        <p className={styles.specialThanksText}>
          We would like to express our sincere gratitude to the
          **HackYourFuture** team, as well as all the instructors and mentors
          who guided us through this course. Your dedication, expertise, and
          encouragement have been instrumental in our learning journey. We are
          sincerely grateful for your unwavering support and invaluable guidance
          throughout this journey.
        </p>

        <div className={styles.directorsGrid}>
          {directors.map((director, index) => (
            <div key={index} className={styles.directorCard}>
              <Image
                src={director.photo}
                alt={director.name}
                width={120}
                height={120}
                className={styles.directorPhoto}
              />
              <h4 className={styles.directorName}>{director.name}</h4>
              <p className={styles.directorRole}>{director.role}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
