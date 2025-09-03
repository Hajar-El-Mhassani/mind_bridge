import React from "react";

export default function MyCoursesList() {

    const myCourses = [
      {
        id: 1,
        title: "Introduction to Web Development",
        category: "Programming",
        author: "Sarah Chen",
        enrollments: 120,
        status: "Published", // Published | Draft | Archived
        image: "", // placeholder
      },
      {
        id: 2,
        title: "Advanced React Hooks for State Management",
        category: "Programming",
        author: "Michael Wong",
        enrollments: 45,
        status: "Draft",
        image: "",
      },
      {
        id: 3,
        title: "Data Science with Python: From Basics to Machine Learning",
        category: "Data Science",
        author: "Emily Davis",
        enrollments: 210,
        status: "Published",
        image: "",
      },
      {
        id: 4,
        title: "UI/UX Design Principles: Crafting Engaging Experiences",
        category: "Design",
        author: "David Lee",
        enrollments: 80,
        status: "Archived",
        image: "",
      },
      {
        id: 5,
        title: "Cloud Computing Fundamentals with AWS",
        category: "Infrastructure",
        author: "Jessica Kim",
        enrollments: 150,
        status: "Published",
        image: "",
      },
      {
        id: 6,
        title: "Digital Marketing Strategies for Small Businesses",
        category: "Marketing",
        author: "Robert Johnson",
        enrollments: 60,
        status: "Draft",
        image: "",
      },
      {
        id: 7,
        title: "Mobile App Development with Flutter",
        category: "Programming",
        author: "Alice Smith",
        enrollments: 90,
        status: "Published",
        image: "",
      },
      {
        id: 8,
        title: "Introduction to Cybersecurity",
        category: "Security",
        author: "Mark Taylor",
        enrollments: 75,
        status: "Draft",
        image: "",
      },
    ];

  return (
    <div>
      <p>Courses cards are here to show </p>
    </div>
  );
}
