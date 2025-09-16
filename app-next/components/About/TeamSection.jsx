import TeamMemberCard from './TeamMemberCard.jsx';
import styles from './About.module.css';

// اطلاعات اعضای تیم را در یک آرایه ذخیره می‌کنیم
const teamMembers = [
  {
    id: 1,
    name: "مهراد عظیمی",
    role: "نقش شما در تیم",
    photo: "/images/your-photo-1.jpg", // عکس اعضا را در پوشه public/images قرار دهید
    linkedin: "https://www.linkedin.com/in/mehrad-azimi"
  },
  {
    id: 2,
    name: "نام عضو ۲",
    role: "نقش او در تیم",
    photo: "/images/your-photo-2.jpg",
    linkedin: "https://www.linkedin.com/in/member-2"
  },
  {
    id: 3,
    name: "نام عضو ۳",
    role: "نقش او در تیم",
    photo: "/images/your-photo-3.jpg",
    linkedin: "https://www.linkedin.com/in/member-3"
  },
  {
    id: 4,
    name: "نام عضو ۴",
    role: "نقش او در تیم",
    photo: "/images/your-photo-4.jpg",
    linkedin: "https://www.linkedin.com/in/member-4"
  },
];

export default function TeamSection() {
  return (
    <section className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>درباره ما</h2>
      <p className={styles.aboutDescription}>
        ما یک تیم کوچک و پرانگیزه از توسعه‌دهندگان هستیم که در تلاش برای ارائه بهترین تجربه یادگیری آنلاین هستیم.
      </p>

      <div className={styles.teamGrid}>
        {teamMembers.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}