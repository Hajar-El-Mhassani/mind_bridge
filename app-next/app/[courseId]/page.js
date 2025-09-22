import CourseDetailsComponent from "@/components/CourseDetails/CourseDetailsComponent.jsx";
import Navbar from "@/components/NavBar/Navbar.jsx";
import TopBar from "@/components/TopBar/TopBar.jsx";
import Footer from "@/components/Footer/Footer.js";

export default async function CourseDetailPage({ params }) {
  const { courseId } = params;
  let course = null;

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
    const res = await fetch(`${apiUrl}/courses/${courseId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      course = await res.json();
    } else {
      console.error(`Failed to fetch course: Status ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch course:", error);
  }

  if (!course) {
    return (
      <div
        style={{ color: "red", textAlign: "center", marginTop: "50px" }}
      ></div>
    );
  }

  return (
    <div>
      <TopBar />
      <Navbar />

      <main style={{ padding: "20px" }}>
        <CourseDetailsComponent course={course} />
      </main>

      <Footer />
    </div>
  );
}
