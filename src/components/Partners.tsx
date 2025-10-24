import { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTNERS = [
  "https://framerusercontent.com/images/NWpaJkswVAuDfYpMrFJ8hPXjOvk.png",
  "https://framerusercontent.com/images/XQBrXRwyB9veQpu7zTcYuRY9Eto.png",
  "https://framerusercontent.com/images/plGbnHSUeAFSFOMP36Arv5lLJJ8.png",
  "https://framerusercontent.com/images/y2InqiLOzjmZoElGTsXvLGL1e3o.jpg",
  "https://framerusercontent.com/images/DpeGk1rDwjbutyxEf52n2bAtQw.jpg",
];

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;

        // total width of one sequence (now we have 4 copies, so divide by 4)
        // We will animate x from 0 to -quarterWidth for seamless infinite loop
        const quarterWidth = track.scrollWidth / 4;

        animRef.current = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -quarterWidth,
            duration: 12, // Slightly slower for better performance
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(track, { x: 0 });
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    // Use requestAnimationFrame for better performance
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseEnter = () => {
    animRef.current?.pause();
  };

  const handleMouseLeave = () => {
    animRef.current?.resume();
  };

  return (
    <section
      id="partners"
      className="bg-black py-16 border-t-[0.1px] border-white/20"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div ref={sectionRef} className="mx-auto w-screen">
        <div className="flex items-center justify-center pb-20 ">
          <h3 
            className="font-display text-2xl text-white md:text-6xl text-center"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            Our Trusted Partners!
          </h3>
        </div>
        <div
          className="mt-8 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Duplicated sequence for seamless loop */}
          <div
            ref={trackRef}
            className="flex items-center gap-12 will-change-transform w-screen"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map(
              (src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Partner logo"
                  className="h-16 w-auto grayscale contrast-125 opacity-80"
                  draggable={false}
                  loading="lazy"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
