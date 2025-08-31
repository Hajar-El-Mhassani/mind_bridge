import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import Hero from "../HeroSection/Hero";
import WhyChooseSection from '../WhyChooseSection/WhyChooseSection.jsx';
import PopularCoursesSection from '../PopularCoursesSection/PopularCoursesSection.jsx';

export default function HomePage() {
    return (
        <div>
            <Hero />
            <WhyChooseSection />
            <PopularCoursesSection />
          </div>
    );
}
   