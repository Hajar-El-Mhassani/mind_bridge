import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import Hero from "../LandingPage/HeroSection/Hero.jsx";
import WhyChooseSection from "../LandingPage/WhyChooseSection/WhyChooseSection.jsx";
import PopularCoursesSection from "../LandingPage/PopularCoursesSection/PopularCoursesSection.jsx";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <WhyChooseSection />
      <PopularCoursesSection />
    </div>
  );
}
