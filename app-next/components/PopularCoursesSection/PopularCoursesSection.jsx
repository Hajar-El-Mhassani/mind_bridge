import styles from './PopularCoursesSection.module.css';
import Image from 'next/image';

export default function PopularCoursesSection() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Popular Courses at MindBridge</h2>
            
            <div className={styles.coursesWrapper}>
                
                <div className={styles.courseCard}>
                    <Image
                        src="git/courses/course-1.png"
                        alt="Mastering Modern Web Development"
                        width={406}
                        height={192}
                        className={styles.courseImage}
                    />
                    <div className={styles.courseContent}>
                        <h3 className={styles.courseTitle}>Mastering Modern Web Development</h3>
                        <p className={styles.courseInstructor}>By Alice Johnson</p>
                        <p className={styles.courseDescription}>Dive deep into the latest web technologies, building responsive and dynamic applications from scratch. Learn React, Node.js, and more.</p>
                        <div className={styles.courseFooter}>
                            <span className={styles.coursePrice}>$199.99</span>
                            <button className={styles.viewCourseButton}>View Course</button>
                        </div>
                    </div>
                </div>

                <div className={styles.courseCard}>
                    <Image
                        src="/courses/course-2.png"
                        alt="Introduction to Data Science with Python"
                        width={406}
                        height={192}
                        className={styles.courseImage}
                    />
                    <div className={styles.courseContent}>
                        <h3 className={styles.courseTitle}>Introduction to Data Science with Python</h3>
                        <p className={styles.courseInstructor}>By Ben Carter</p>
                        <p className={styles.courseDescription}>An essential guide to data science using Python. Cover data analysis, machine learning fundamentals, and visualization techniques.</p>
                        <div className={styles.courseFooter}>
                            <span className={styles.coursePrice}>$249.99</span>
                            <button className={styles.viewCourseButton}>View Course</button>
                        </div>
                    </div>
                </div>

                <div className={styles.courseCard}>
                    <Image
                        src="/courses/course-3.png"
                        alt="Creative Graphic Design Fundamentals"
                        width={406}
                        height={192}
                        className={styles.courseImage}
                    />
                    <div className={styles.courseContent}>
                        <h3 className={styles.courseTitle}>Creative Graphic Design Fundamentals</h3>
                        <p className={styles.courseInstructor}>By Clara Diaz</p>
                        <p className={styles.courseDescription}>Unleash your creativity with this course on graphic design. Learn principles of design, typography, color theory, and software essentials.</p>
                        <div className={styles.courseFooter}>
                            <span className={styles.coursePrice}>$149.99</span>
                            <button className={styles.viewCourseButton}>View Course</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.browseAllButton}>Browse All Courses</button>
        </section>
    );
}