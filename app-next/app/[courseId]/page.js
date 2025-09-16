import CourseDetailsComponent from '@/components/CourseDetails/CourseDetailsComponent.jsx';
import Navbar from '@/components/NavBar/Navbar.jsx'; // مسیر صحیح Navbar
import TopBar from '@/components/TopBar/TopBar.jsx'; // مسیر صحیح TopBar
import Footer from '@/components/Footer/Footer.js'; // اگر Footer دارید
import FooterBar from '@/components/FooterBar/FooterBar.jsx'; // اگر FooterBar دارید

export default async function CourseDetailPage({ params }) {
  const { courseId } = params;
  let course = null;

  try {
    const res = await fetch(`http://localhost:3001/api/courses/${courseId}`, { cache: 'no-store' });

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
      <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
        خطا: دوره یافت نشد یا بارگذاری آن با مشکل مواجه شد.
      </div>
    );
  }

  return (
    <div>
      {/* TopBar و Navbar را اضافه می‌کنیم */}
      <TopBar />
      <Navbar />

      <main style={{ padding: '20px' }}> {/* می‌توانید استایل‌های این main را طبق طراحی خود تنظیم کنید */}
        <CourseDetailsComponent course={course} />
      </main>

      {/* اگر Footer و FooterBar هم دارید، آن‌ها را اضافه کنید */}
      <Footer />
      <FooterBar />
    </div>
  );
}