export async function seed(knex) {
  // Delete existing rows
  await knex("courses").del();

  await knex("courses").insert([
    {
      title: "Full-Stack Web Development 101",
      description:
        "Build modern web apps end-to-end with React, Node, and PostgreSQL.",
      image: "/uploads/courses/1.jpg",
      price: 0,
      category: "Web Dev",
      status: "published",
      level: "beginner",
      duration: 40,
      created_by: 1,
    },
    {
      title: "Python for Data Analysis",
      description:
        "Clean, transform, and visualize data with Pandas and Jupyter.",
      image: "/uploads/courses/2.jpg",
      price: 0,
      category: "Data Science",
      status: "published",
      level: "beginner",
      duration: 35,
      created_by: 2,
    },
    {
      title: "Design Systems Fundamentals",
      description:
        "Create scalable UI foundations with tokens, components, and docs.",
      image: "/uploads/courses/3.jpg",
      price: 0,
      category: "UI/UX",
      status: "archived",
      level: "beginner",
      duration: 20,
      created_by: 3,
    },
    {
      title: "Deploying Apps on Render",
      description: "Ship full-stack apps using Render services, envs, and CI.",
      image: "/uploads/courses/4.jpg",
      price: 0,
      category: "Cloud",
      status: "published",
      level: "beginner",
      duration: 25,
      created_by: 4,
    },
    {
      title: "DevOps with CI/CD",
      description:
        "Automate builds, tests, and deployments with GitHub Actions and pipelines.",
      image: "/uploads/courses/5.jpeg",
      price: 0,
      category: "DevOps",
      status: "published",
      level: "beginner",
      duration: 30,
      created_by: 5,
    },
    {
      title: "Intro to Machine Learning with scikit-learn",
      description:
        "Train, evaluate, and deploy classic ML models using Python and scikit-learn.",
      image: "/uploads/courses/6.jpg",
      price: 0,
      category: "AI/ML",
      status: "archived",
      level: "beginner",
      duration: 45,
      created_by: 6,
    },
    {
      title: "Web Security Essentials",
      description:
        "Protect apps with XSS/CSRF prevention, secure auth, and OWASP best practices.",
      image: "/uploads/courses/7.jpg",
      price: 0,
      category: "Security",
      status: "published",
      level: "beginner",
      duration: 20,
      created_by: 7,
    },
    {
      title: "Go for Backend Services",
      description:
        "Build fast, concurrent APIs with Go, net/http, and database integrations.",
      image: "/uploads/courses/8.png",
      price: 0,
      category: "Web Dev",
      status: "draft",
      level: "beginner",
      duration: 50,
      created_by: 8,
    },
    {
      title: "TypeScript Deep Dive",
      description:
        "Types, generics, utility types, and patterns for large-scale React/Node apps.",
      image: "/uploads/courses/9.webp",
      price: 0,
      category: "TypeScript",
      status: "published",
      level: "beginner",
      duration: 40,
      created_by: 9,
    },
    {
      title: "Testing JavaScript Applications",
      description:
        "Unit, integration, and E2E testing with Jest, Testing Library, and Playwright.",
      image: "/uploads/courses/10.avif",
      price: 0,
      category: "Testing",
      status: "draft",
      level: "beginner",
      duration: 25,
      created_by: 10,
    },
    {
      title: "Docker & Kubernetes Fundamentals",
      description:
        "Containerize apps, write Dockerfiles, and orchestrate with Kubernetes basics.",
      image: "/uploads/courses/default.jpg",
      price: 0,
      category: "Docker",
      status: "archived",
      level: "beginner",
      duration: 30,
      created_by: 11,
    },
    {
      title: "Technical Interview Prep",
      description:
        "Ace coding interviews with DS&A practice, system design, and soft skills.",
      image: "/uploads/courses/12.jpg",
      price: 0,
      category: "Career",
      status: "draft",
      level: "beginner",
      duration: 15,
      created_by: 12,
    },
  ]);