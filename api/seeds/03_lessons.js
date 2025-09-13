
export async function seed(knex) {
  // Delete existing rows
  await knex("lessons").del();

  await knex("lessons").insert([
    // Course 1
    {
      title: "Intro to Full-Stack Development",
      content: "Overview of front-end, back-end, and databases.",
      course_id: 1,
    },
    {
      title: "React Basics",
      content: "JSX, components, props, and state.",
      course_id: 1,
    },
    {
      title: "Node.js & Express",
      content: "Building APIs with Express.js.",
      course_id: 1,
    },

    // Course 2
    {
      title: "Intro to Data Science",
      content: "What is data science and why it matters.",
      course_id: 2,
    },
    {
      title: "Pandas for Data Analysis",
      content: "Loading, cleaning, and transforming data.",
      course_id: 2,
    },
    {
      title: "Data Visualization",
      content: "Plotting with matplotlib and seaborn.",
      course_id: 2,
    },

    // Course 3
    {
      title: "Intro to Design Systems",
      content: "Principles of design tokens and components.",
      course_id: 3,
    },
    {
      title: "Component Libraries",
      content: "How to build and reuse UI libraries.",
      course_id: 3,
    },

    // Course 4
    {
      title: "Render Basics",
      content: "Deploying a simple app on Render.",
      course_id: 4,
    },
    {
      title: "Environment Variables",
      content: "Managing secrets and environment configs.",
      course_id: 4,
    },

    // Course 5
    {
      title: "What is CI/CD?",
      content: "Introduction to continuous integration and deployment.",
      course_id: 5,
    },
    {
      title: "GitHub Actions",
      content: "Automating builds and tests.",
      course_id: 5,
    },

    // Course 6
    {
      title: "Intro to Machine Learning",
      content: "Supervised vs unsupervised learning.",
      course_id: 6,
    },
    {
      title: "scikit-learn Basics",
      content: "Training and evaluating models.",
      course_id: 6,
    },

    // Course 7
    {
      title: "Web Security Overview",
      content: "Common web vulnerabilities (XSS, CSRF, SQLi).",
      course_id: 7,
    },
    {
      title: "Authentication & Authorization",
      content: "Sessions, JWT, OAuth basics.",
      course_id: 7,
    },

    // Course 8
    {
      title: "Intro to Go",
      content: "Basic syntax, packages, and concurrency.",
      course_id: 8,
    },
    {
      title: "Building APIs in Go",
      content: "net/http and REST APIs.",
      course_id: 8,
    },

    // Course 9
    {
      title: "Intro to TypeScript",
      content: "Types, interfaces, and generics.",
      course_id: 9,
    },
    {
      title: "Advanced TS",
      content: "Utility types and large-scale patterns.",
      course_id: 9,
    },

    // Course 10
    {
      title: "Testing Basics",
      content: "Unit tests with Jest.",
      course_id: 10,
    },
    {
      title: "Integration Testing",
      content: "Testing APIs and databases.",
      course_id: 10,
    },

    // Course 11
    {
      title: "Docker Basics",
      content: "Images, containers, and Dockerfiles.",
      course_id: 11,
    },
    {
      title: "Kubernetes Intro",
      content: "Pods, deployments, and services.",
      course_id: 11,
    },

    // Course 12
    {
      title: "Interview Prep Strategy",
      content: "How to plan and study effectively.",
      course_id: 12,
    },
    {
      title: "System Design Basics",
      content: "Scalability, databases, and APIs.",
      course_id: 12,
    },
  ]);
}
