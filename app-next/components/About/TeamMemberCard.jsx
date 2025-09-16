import Image from 'next/image';
import Link from 'next/link';
import styles from './About.module.css';

export default function TeamMemberCard({ member }) {
  return (
    <div className={styles.memberCard}>
      <div className={styles.imageWrapper}>
        <Image 
          src={member.photo} 
          alt={member.name} 
          width={150} 
          height={150} 
          className={styles.memberPhoto}
        />
      </div>
      <h3 className={styles.memberName}>{member.name}</h3>
      <p className={styles.memberRole}>{member.role}</p>
      {member.linkedin && (
        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinButton}>
          LinkedIn
        </Link>
      )}
    </div>
  );
}