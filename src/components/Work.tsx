import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORK_IMAGES = [
  "https://framerusercontent.com/images/x8HpwRJxZ3b51TOFOHOoqhk3Y.png",
  "https://framerusercontent.com/images/Snwicyo0vbcN9JV0QXzsxSzyIJ8.png",
  "https://framerusercontent.com/images/nhfZLb2Zzwwnqk6sCClIRrUcXIw.png",
  "https://framerusercontent.com/images/y2InqiLOzjmZoElGTsXvLGL1e3o.jpg",
];

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredSpan, setHoveredSpan] = useState<number | null>(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      // Detect low-end device
      const isLowEndDevice = () => {
        const connection = (navigator as any).connection;
        const memory = (navigator as any).deviceMemory;
        const cores = navigator.hardwareConcurrency;
        
        return (
          connection?.effectiveType === 'slow-2g' ||
          connection?.effectiveType === '2g' ||
          memory < 4 ||
          cores < 4 ||
          window.innerWidth < 480
        );
      };

      const ctx = gsap.context(() => {
        const isLowEnd = isLowEndDevice();
        
        // Optimized animation for all devices
        gsap.from("h2", {
          y: isLowEnd ? 20 : 30, // Reduced movement for better performance
          opacity: 0,
          duration: isLowEnd ? 0.5 : 0.6, // Reduced duration
          ease: "power2.out",
          scrollTrigger: { 
            trigger: ref.current, 
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse" // Optimized toggle actions
          },
        });
      }, ref);
      
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
      id="work"
      ref={ref}
      className="bg-black py-10 md:py-[15rem] relative overflow-hidden"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Background pattern/image to blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-100" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blurred glass effect - reduced for low-end devices */}
      <div className="absolute inset-0 bg-black/100 backdrop-blur-[2rem] md:backdrop-blur-[5rem] border border-white/20" />

      {/* Background image that changes on hover */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${hoveredSpan !== null ? "opacity-40" : "opacity-0"}`}
      >
        {hoveredSpan !== null && (
          <img
            src={WORK_IMAGES[hoveredSpan]}
            alt="Work background"
            className="h-full w-full object-cover blur-[8rem] md:blur-[12rem] brightness-[200%] rounded-full"
            loading="lazy"
            style={{
              willChange: 'opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
        )}
      </div>

      {/* Top dark gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md" />

      {/* Bottom dark gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-center">
          <h2 
            className="flex flex-col items-center leading-[3rem] md:leading-[6rem] lg:leading-[10rem] justify-center font-display text-center text-[3rem] md:text-[6rem] lg:text-6xl xl:text-[11rem] text-white"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div
              className="cursor-pointer w-screen transition-all duration-300 hover:text-gray-300 flex items-center justify-center relative"
              onMouseEnter={() => setHoveredSpan(0)}
              onMouseLeave={() => setHoveredSpan(null)}
            >
              What
              <img
                className={`hidden lg:block absolute top-[5rem] lg:top-[10rem] left-10 lg:left-20 rounded-xl lg:rounded-[1.5rem] transition-opacity duration-300 ${hoveredSpan === 0 ? "opacity-100" : "opacity-0"} w-48 h-48 lg:w-[30rem] lg:h-[16rem] xl:w-[30rem] xl:h-[16rem]`}
                src="https://framerusercontent.com/images/Ue0szEoKNKA3F4giJTcQQZ8Gw.jpg?scale-down-to=512"
                alt=""
                loading="lazy"
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
            <div
              className="cursor-pointer w-screen transition-all duration-300 hover:text-gray-300 flex items-center justify-center relative"
              onMouseEnter={() => setHoveredSpan(1)}
              onMouseLeave={() => setHoveredSpan(null)}
            >
              We
              <img
                className={`hidden lg:block absolute top-[-5rem] lg:top-[-10rem] right-[8rem] lg:right-[15rem] rounded-xl lg:rounded-[1.5rem] transition-opacity duration-300 ${hoveredSpan === 1 ? "opacity-100" : "opacity-0"} w-48 h-48 lg:w-[30rem] lg:h-[16rem] xl:w-[30rem] xl:h-[16rem]`}
                src="https://framerusercontent.com/images/1quBl2kJNxY4AQxPnq85z9QuLw.jpg?scale-down-to=512"
                alt=""
                loading="lazy"
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
            <div
              className="cursor-pointer w-screen transition-all duration-300 hover:text-gray-300 flex items-center justify-center relative"
              onMouseEnter={() => setHoveredSpan(2)}
              onMouseLeave={() => setHoveredSpan(null)}
            >
              Have
              <img
                className={`hidden lg:block absolute top-[-6rem] lg:top-[-12rem] left-[5rem] lg:left-[10rem] rounded-xl lg:rounded-[1.5rem] transition-opacity duration-300 ${hoveredSpan === 2 ? "opacity-100" : "opacity-0"} w-48 h-48 lg:w-[30rem] lg:h-[16rem] xl:w-[30rem] xl:h-[16rem]`}
                src="https://framerusercontent.com/images/erpNOKSGXUP2Ly0SEuXysDuEb94.jpg?scale-down-to=512"
                alt=""
                loading="lazy"
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
            <div
              className="cursor-pointer w-screen transition-all duration-300 hover:text-gray-300 flex items-center justify-center relative"
              onMouseEnter={() => setHoveredSpan(3)}
              onMouseLeave={() => setHoveredSpan(null)}
            >
              Done?
              <img
                className={`hidden lg:block absolute top-[-6rem] lg:top-[-12rem] right-[8rem] lg:right-[16rem] rounded-xl lg:rounded-[1.5rem] transition-opacity duration-300 ${hoveredSpan === 3 ? "opacity-100" : "opacity-0"} w-48 h-48 lg:w-[30rem] lg:h-[16rem] xl:w-[30rem] xl:h-[16rem]`}
                src="https://framerusercontent.com/images/ghAMQFUyB0Rvwl4zAajeueSsgQ.jpg?scale-down-to=512"
                alt=""
                loading="lazy"
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
      </div>
    </section>
  );
}
