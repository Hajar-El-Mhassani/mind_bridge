import CoursesGrid from "@/components/PublicCourses/CoursesGrid.jsx";
import CourseHeader from "@/components/PublicCourses/CourseHeader";

export default function PublicCourses() {
  return (
    <>
      <CourseHeader />
      <div className="container container-xl">
        <div className="section">
          <CoursesGrid />
        </div>
      </div>
    </>
  );
}
