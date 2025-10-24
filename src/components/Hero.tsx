import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register GSAP plugins
if (
  typeof window !== "undefined" &&
  (gsap as any).registeredScrollTrigger !== true
) {
  gsap.registerPlugin(ScrollTrigger);
  (gsap as any).registeredScrollTrigger = true;
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const ctx = gsap.context(() => {
        // Initial logo animation with reduced complexity
        gsap.from(".hero-logo", {
          scale: 0,
          opacity: 0,
          duration: () => {
            const isMobile = window.innerWidth < 768;
            return isMobile ? 2 : 3; // Restored original duration
          },
          ease: "back.out(1.7)", // Restored original easing
        });
        
        // Simplified logo movement animation
        gsap.to(".hero-logo", {
          x: () => {
            const isMobile = window.innerWidth < 768;
            return isMobile ? -window.innerWidth / 2 + 42 : -window.innerWidth / 2 + 110;
          },
          y: () => {
            const isMobile = window.innerWidth < 768;
            return isMobile ? -window.innerHeight / 2 - 18 : -window.innerHeight / 2 - 22;
          },
          scale: () => {
            const isMobile = window.innerWidth < 768;
            return isMobile ? 0.7 : 0.7;
          },
          duration: () => {
            const isMobile = window.innerWidth < 768;
            return isMobile ? 1.5 : 2; // Reduced duration
          },
          delay: 1, // Reduced delay
          ease: "power2.inOut", // Simpler easing
          onComplete: () => {
            // Clean up animation references
            // gsap.set(".hero-logo", { clearProps: "transform" });
          }
        });
        
        // Optimized text animations
        gsap.from(".hero-title", {
          y: 30, // Reduced movement
          opacity: 0,
          duration: 1, // Reduced duration
          delay: 0.2,
          ease: "power2.out",
        });
        
        gsap.from(".hero-sub", {
          y: 20, // Reduced movement
          opacity: 0,
          duration: 0.8, // Reduced duration
          delay: 0.4,
          ease: "power2.out",
        });
        
        gsap.from(".hero-cta", {
          y: 15, // Reduced movement
          opacity: 0,
          duration: 0.6, // Reduced duration
          delay: 0.6,
          ease: "power2.out",
        });

        // Optimized scroll trigger with reduced complexity
        gsap.to(".hero-video-overlay", {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=40%", // Reduced scroll distance
            scrub: 0.5, // Reduced scrub intensity for better performance
          },
          opacity: 0.2, // Reduced opacity change
        });
      }, heroRef);
      
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
      id="top"
      ref={heroRef}
      className="relative h-[132dvh] w-full overflow-hidden"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="https://framerusercontent.com/assets/Eq4EEHatmXUgd8dAU90MTP0bKeo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://framerusercontent.com/images/Eq4EEHatmXUgd8dAU90MTP0bKeo.jpg"
        onLoadStart={() => {
          // Optimize video loading
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
          }
        }}
      />
      <div className="hero-video-overlay absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1
          className={cn(
            "hero-title font-display text-[18vw] leading-none text-white md:text-[160px]",
            "select-none",
          )}
        >
           <img
          src="https://framerusercontent.com/images/tS63ua8WeK8xnL0gJHbXwOvcbs.png"
          alt="Mood Logo"
          className="hero-logo h-6 md:h-16 w-auto mb-3"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
        </h1>
        <p className="hero-sub mt-2 max-w-lg text-base text-white/80 md:text-4xl font-bold">
          AS THINKERS, DESIGNERS AND STRATEGISTS,
        </p>
        <div className="hero-cta mt-6">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
          >
            Create with Mood
          </a>
        </div>
      </div>
    </section>
  );
}
