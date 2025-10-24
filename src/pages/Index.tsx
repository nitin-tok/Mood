import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import Work from "@/components/Work";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

export default function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee linear infinite; }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <VideoSection />
        <Services />
        <Work />
        <Gallery />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
