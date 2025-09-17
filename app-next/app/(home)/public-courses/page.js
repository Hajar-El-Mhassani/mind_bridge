"use client";

import CoursesGrid from "@/components/PublicCourses/CoursesGrid.jsx";
import CourseHeader from "@/components/PublicCourses/CourseHeader";
import { useEffect, useState } from "react";
export default function PublicCourses() {
  const [courses, setCourses] = useState([]);
  const [loadingState, setLoadingState] = useState("LOADING");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("newest");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  const fetchCourseAuthors = async () => {
    const authorsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/course-authors`
    )
      .then((response) => response.json())
      .catch((e) => {
        setLoadingState("LOADING_FAILED");
      });

    if (authorsResponse !== undefined) {
      setLoadingState("LOADING_SUCCEEDED");
      setAuthors(authorsResponse);
    }
  };

  const fetchCourses = async () => {
    const coursesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses?search=${search}&category=${category}&level=${level}&price=${price}&sort=${sort}&created_by=${selectedAuthor}`
    )
      .then((response) => response.json())
      .catch((e) => {
        setLoadingState("LOADING_FAILED");
      });

    if (coursesResponse !== undefined) {
      setLoadingState("LOADING_SUCCEEDED");
      setCourses(coursesResponse);
    }
  };

  useEffect(() => {
    if (authors.length === 0) {
      fetchCourseAuthors();
    }

    fetchCourses();
  }, [search, category, level, price, sort, selectedAuthor]);

  let message = "";
  if (loadingState === "LOADING") {
    message = "Loading your courses...";
  } else if (loadingState === "LOADING_FAILED") {
    message = "Unable to fetch your courses!";
  } else if (courses.length === 0) {
    message = "No courses found";
  }

  return (
    <div>
      <CourseHeader
        authors={authors}
        selectedAuthor={selectedAuthor}
        onSelectedAuthorChange={setSelectedAuthor}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoyChange={setCategory}
        level={level}
        onLevelChange={setLevel}
        price={price}
        onPriceChange={setPrice}
        sort={sort}
        onSortChange={setSort}
      />
      <div>{message}</div>
      <CoursesGrid courses={courses} />
    </div>
  );
}
