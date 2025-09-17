import TeamSection from '@/components/About/TeamSection.jsx';
import Navbar from '@/components/NavBar/Navbar.jsx';
import TopBar from '@/components/TopBar/TopBar.jsx';
import Footer from '@/components/Footer/Footer.js'; 

export default function AboutPage() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <TeamSection />
      <Footer />
    </div>
  );
}