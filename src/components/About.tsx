import { useEffect, useRef } from "react";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (
  typeof window !== "undefined" &&
  (gsap as any).registeredScrollTrigger !== true
) {
  gsap.registerPlugin(ScrollTrigger);
  (gsap as any).registeredScrollTrigger = true;
}

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const ctx = gsap.context(() => {
        // Optimized animations with reduced complexity
        gsap.from(".about-title", {
          y: 30, // Reduced movement for better performance
          opacity: 0,
          duration: 0.8, // Reduced duration
          ease: "power2.out", // Simpler easing for better performance
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%", // Slightly later trigger for better performance
            end: "bottom 15%",
            toggleActions: "play none none reverse", // Optimized toggle actions
          },
        });
        
        gsap.from(".about-description", {
          y: 20, // Reduced movement
          opacity: 0,
          duration: 0.7, // Reduced duration
          delay: 0.1, // Reduced delay
          ease: "power2.out", // Simpler easing
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        });
        
        gsap.from(".about-button", {
          y: 15, // Reduced movement
          opacity: 0,
          duration: 0.6, // Reduced duration
          delay: 0.2, // Reduced delay
          ease: "power2.out", // Simpler easing
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        });
      }, aboutRef);
      
      return () => ctx.revert();
    };

    // Use requestAnimationFrame for better performance
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef} 
      className="relative py-12 md:py-24 mt-[-5rem] md:mt-[-10rem]"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-[95%] md:max-w-[90%] lg:max-w-[60rem] text-center">
          <div 
            className="about-title text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold text-white"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <BlurredStagger
              text="A unique approach to every project we undertake."
              as="h1"
              className="leading-tight text-2xl md:text-4xl lg:text-6xl xl:text-7xl"
              triggerOnView
            />
          </div>
          <p 
            className="about-description mt-6 md:mt-8 mx-auto max-w-[95%] md:max-w-[39rem] text-base md:text-xl lg:text-2xl font-bold text-center text-white/80"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <BlurredStagger
              text="Our team is composed of creative individuals who excel in generating innovative ideas and solutions."
              as="span"
              className="align-middle"
              triggerOnView
            />
          </p>
          <div 
            className="about-button mt-8 md:mt-12"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <button 
              className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
              style={{
                willChange: 'background-color, border-color',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              Know More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
