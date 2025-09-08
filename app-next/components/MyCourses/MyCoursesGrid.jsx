"use client";

import MyCoursesCard from "./MyCoursesCard";
import styles from "./MyCourses.module.css";
// import { useState } from "react";
// import { useEffect } from "react";
const courses = [
  {
    category: "Web Dev",
    imageUrl: "https://web.dev/images/social-wide.jpg",
    header: "Full‑Stack Web Development 101",
    created_by: "Jane Doe",
    description:
      "Build modern web apps end‑to‑end with React, Node, and PostgreSQL.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "Data Science",
    imageUrl:
      "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
    header: "Python for Data Analysis",
    created_by: "Arjun Mehta",
    description:
      "Clean, transform, and visualize data with Pandas and Jupyter.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "UI/UX",
    imageUrl:
      "https://www.aufaitux.com/wp-content/uploads/2020/05/UIUX-designing-1.jpg",
    header: "Design Systems Fundamentals",
    created_by: "Lina Park",
    description:
      "Create scalable UI foundations with tokens, components, and docs.",
    enrolled: 36,

    status: "Archived",
  },
  {
    category: "Cloud",
    imageUrl: "https://cdn.mos.cms.futurecdn.net/pL5rBKGq88cnoqgdJgCXGS.jpg",
    header: "Deploying Apps on Render",
    created_by: "Samir Patel",
    description: "Ship full‑stack apps using Render services, envs, and CI.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "DevOps",
    imageUrl: "https://shalb.com/wp-content/uploads/2019/11/Devops1.jpeg",
    header: "DevOps with CI/CD",
    created_by: "Olivia Brooks",
    description:
      "Automate builds, tests, and deployments with GitHub Actions and pipelines.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "AI/ML",
    imageUrl:
      "https://financialit.net/sites/default/files/1_c_fib-ygbnml6nntygbmhq.jpg",
    header: "Intro to Machine Learning with scikit‑learn",
    created_by: "Rahul Verma",
    description:
      "Train, evaluate, and deploy classic ML models using Python and scikit‑learn.",
    enrolled: 36,

    status: "Archived",
  },
  {
    category: "Security",
    imageUrl:
      "https://www.nokia.com/sites/default/files/2022-01/cybersecurity4.jpg",
    header: "Web Security Essentials",
    created_by: "Amina Salah",
    description:
      "Protect apps with XSS/CSRF prevention, secure auth, and OWASP best practices.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "Web Dev",
    imageUrl:
      "https://newline.tech/wp-content/uploads/2023/07/Profession_-Backend-Developer.png",
    header: "Go for Backend Services",
    created_by: "Tomasz Nowak",
    description:
      "Build fast, concurrent APIs with Go, net/http, and database integrations.",
    enrolled: 36,
    status: "Draft",
  },
  {
    category: "TypeScript",
    imageUrl: "https://blog.theodo.com/_astro/ts_logo.BstCNrTU_1Dbxpr.webp",
    header: "TypeScript Deep Dive",
    created_by: "Haruto Sato",
    description:
      "Types, generics, utility types, and patterns for large‑scale React/Node apps.",
    enrolled: 36,

    status: "Published",
  },
  {
    category: "Testing",
    imageUrl:
      "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg",
    header: "Testing JavaScript Applications",
    created_by: "Sophie Martin",
    description:
      "Unit, integration, and E2E testing with Jest, Testing Library, and Playwright.",
    enrolled: 36,
    status: "Draft",
  },
  {
    category: "Docker",
    imageUrl:
      "https://www.docker.com/app/uploads/2023/08/logo-guide-scale-1.svg",
    header: "Docker & Kubernetes Fundamentals",
    created_by: "Daniel Kim",
    description:
      "Containerize apps, write Dockerfiles, and orchestrate with Kubernetes basics.",
    enrolled: 36,

    status: "Archived",
  },
  {
    category: "Career",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5QQV9wdoHwkqF3JMQq6f0RgBLaAl4Z6PZA&s",
    header: "Technical Interview Prep",
    created_by: "Maria Rossi",
    description:
      "Ace coding interviews with DS&A practice, system design, and soft skills.",
    enrolled: 36,
    status: "Draft",
  },
];

export default function MyCoursesGrid() {
  // const [courses, setCourses] = useState([]);
  // const [loadingState, setLoadingState] = useState("LOADING");

  // const fetchMyCourses = async () => {
  //   const myCoursesResponse = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/my-courses.json`
  //   )
  //     .then((response) => response.json())
  //     .catch((e) => {
  //       setLoadingState("LOADING_FAILED");
  //     });

  //   if (myCoursesResponse !== undefined) {
  //     setLoadingState("LOADING_SUCCEEDED");
  //     setCourses(myCoursesResponse.results);
  //   }
  // };

  // useEffect(() => {
  //   fetchMyCourses();
  // }, []);


  // let message = "";
  // if (loadingState === "LOADING") {
  //   message = "Loading your courses...";
  // } else if (loadingState === "LOADING_FAILED") {
  //   message = "Unable to fetch your courses!";
  // }

  return (
    <div className={styles.grid}>
      {/* <div>{message}</div> */}
      {courses.map((c) => (
        <MyCoursesCard key={c.header} {...c} />
      ))}
    </div>
  );
}
