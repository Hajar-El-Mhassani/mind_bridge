import CourseCard from "./CourseCard.jsx";
import styles from "./Courses.module.css";

const courses = [
  {
    tag: "Web Dev",
    imageUrl: "https://web.dev/images/social-wide.jpg",
    header: "Full‑Stack Web Development 101",
    author: "Jane Doe",
    description:
      "Build modern web apps end‑to‑end with React, Node, and PostgreSQL.",
    price: 49,
  },
  {
    tag: "Data Science",
    imageUrl:
      "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
    header: "Python for Data Analysis",
    author: "Arjun Mehta",
    description:
      "Clean, transform, and visualize data with Pandas and Jupyter.",
    price: 59,
  },
  {
    tag: "UI/UX",
    imageUrl:
      "https://www.aufaitux.com/wp-content/uploads/2020/05/UIUX-designing-1.jpg",
    header: "Design Systems Fundamentals",
    author: "Lina Park",
    description:
      "Create scalable UI foundations with tokens, components, and docs.",
    price: 39,
  },
  {
    tag: "Cloud",
    imageUrl: "https://cdn.mos.cms.futurecdn.net/pL5rBKGq88cnoqgdJgCXGS.jpg",
    header: "Deploying Apps on Render",
    author: "Samir Patel",
    description: "Ship full‑stack apps using Render services, envs, and CI.",
    price: 29,
  },
  {
    tag: "DevOps",
    imageUrl: "https://shalb.com/wp-content/uploads/2019/11/Devops1.jpeg",
    header: "DevOps with CI/CD",
    author: "Olivia Brooks",
    description:
      "Automate builds, tests, and deployments with GitHub Actions and pipelines.",
    price: 42,
  },
  {
    tag: "AI/ML",
    imageUrl:
      "https://financialit.net/sites/default/files/1_c_fib-ygbnml6nntygbmhq.jpg",
    header: "Intro to Machine Learning with scikit‑learn",
    author: "Rahul Verma",
    description:
      "Train, evaluate, and deploy classic ML models using Python and scikit‑learn.",
    price: 69,
  },
  {
    tag: "Security",
    imageUrl:
      "https://www.nokia.com/sites/default/files/2022-01/cybersecurity4.jpg",
    header: "Web Security Essentials",
    author: "Amina Salah",
    description:
      "Protect apps with XSS/CSRF prevention, secure auth, and OWASP best practices.",
    price: 47,
  },
  {
    tag: "Go",
    imageUrl:
      "https://newline.tech/wp-content/uploads/2023/07/Profession_-Backend-Developer.png",
    header: "Go for Backend Services",
    author: "Tomasz Nowak",
    description:
      "Build fast, concurrent APIs with Go, net/http, and database integrations.",
    price: 54,
  },
  {
    tag: "TypeScript",
    imageUrl: "https://blog.theodo.com/_astro/ts_logo.BstCNrTU_1Dbxpr.webp",
    header: "TypeScript Deep Dive",
    author: "Haruto Sato",
    description:
      "Types, generics, utility types, and patterns for large‑scale React/Node apps.",
    price: 33,
  },
  {
    tag: "Testing",
    imageUrl:
      "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg",
    header: "Testing JavaScript Applications",
    author: "Sophie Martin",
    description:
      "Unit, integration, and E2E testing with Jest, Testing Library, and Playwright.",
    price: 31,
  },
  {
    tag: "Docker",
    imageUrl:
      "https://www.docker.com/app/uploads/2023/08/logo-guide-scale-1.svg",
    header: "Docker & Kubernetes Fundamentals",
    author: "Daniel Kim",
    description:
      "Containerize apps, write Dockerfiles, and orchestrate with Kubernetes basics.",
    price: 58,
  },
  {
    tag: "Career",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5QQV9wdoHwkqF3JMQq6f0RgBLaAl4Z6PZA&s",
    header: "Technical Interview Prep",
    author: "Maria Rossi",
    description:
      "Ace coding interviews with DS&A practice, system design, and soft skills.",
    price: 0,
  },
];

export default function CoursesGrid() {
  return (
    <div className={styles.grid}>
      {courses.map((c) => (
        <CourseCard key={c.header} {...c} />
      ))}
    </div>
  );
}
