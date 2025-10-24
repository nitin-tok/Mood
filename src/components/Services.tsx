import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ServiceItem = { title: string; desc: string; img: string };

const SERVICES: ServiceItem[] = [
  {
    title: "Brand development & design",
    desc: "We offer a range of services related to logo design and brand development, including",
    img: "https://framerusercontent.com/images/VowTjMjEXhFsAhghLuOxkxijCF8.png",
  },
  {
    title: "Digital & Social Media",
    desc: "We offer a comprehensive range of social media services to help your brand thrive in the digital landscape, including",
    img: "https://framerusercontent.com/images/DpeGk1rDwjbutyxEf52n2bAtQw.jpg",
  },
  {
    title: "Integrated Campaign",
    desc: "We provide a comprehensive range of services to support your marketing and communication needs, including:",
    img: "https://framerusercontent.com/images/UGvsylkzyEl0BcNdzX1arQJw.png",
  },
  {
    title: "Media production & motion graphics",
    desc: "We specialize in video production and offer a wide range of services to meet your needs:",
    img: "https://framerusercontent.com/images/y2InqiLOzjmZoElGTsXvLGL1e3o.jpg",
  },
  {
    title: "Events & Activations",
    desc: "We offer comprehensive event management services for various types of events, including:",
    img: "https://framerusercontent.com/images/DW2W6eq23aBoTutD3CYVqQrc.png?scale-down-to=512",
  },
  {
    title: "Public Relations",
    desc: "We offer public relations services to enhance the reputation and public image of individuals, organizations, or brands.",
    img: "https://framerusercontent.com/images/ghAMQFUyB0Rvwl4zAajeueSsgQ.jpg?scale-down-to=512",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Create infinite scroll by duplicating services
  const infiniteServices = [...SERVICES, ...SERVICES, ...SERVICES];

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const ctx = gsap.context(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Optimized card entrance animation
        gsap.from(".service-card", {
          opacity: 0,
          y: 20, // Reduced movement for better performance
          duration: 0.6, // Reduced duration
          ease: "power2.out",
          stagger: 0.05, // Reduced stagger for better performance
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%", // Later trigger for better performance
            end: "bottom 15%",
            toggleActions: "play none none reverse", // Optimized toggle actions
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate card width for infinite scroll
    const cardElement = track.querySelector(".service-card") as HTMLElement;
    const cardWidth = cardElement?.offsetWidth || 0;
    const gap = 24; // gap-6 = 24px
    const cardWithGap = cardWidth + gap;
    const middlePosition = cardWithGap * SERVICES.length;

    // Set initial position to middle
    track.scrollLeft = middlePosition;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      track.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      scrollLeftRef.current = track.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      // Use requestAnimationFrame for smoother dragging
      requestAnimationFrame(() => {
        const dx = e.clientX - startXRef.current;
        track.scrollLeft = scrollLeftRef.current - dx;
      });
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {}
    };

    // Optimized infinite scroll logic with throttling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // Throttle scroll events for better performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = track.scrollLeft;

        // If scrolled to the end (third set), jump to middle (second set)
        if (scrollLeft >= cardWithGap * SERVICES.length * 2) {
          track.scrollLeft = middlePosition;
        }
        // If scrolled to the beginning (first set), jump to middle (second set)
        else if (scrollLeft <= 0) {
          track.scrollLeft = middlePosition;
        }
      }, 16); // ~60fps throttling
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointerleave", endDrag);
    track.addEventListener("scroll", handleScroll);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointerleave", endDrag);
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={ref} 
      className="py-10 md:py-20 mt-[-10rem] md:mt-[-25rem] z-50"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-[95%] md:w-[90%] lg:w-[70%] mx-auto pb-10 md:pb-20 pt-5 md:pt-10 px-3 md:px-5 border-white/20 border-t-[0.1px] z-20">
          <h2 className="font-display text-2xl md:text-3xl lg:text-7xl text-white mb-4 md:mb-0">
            Services
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-[55rem] text-white">
            "We offer a range of services related to Brand development & design,
            Digital & social media, Integrated campain, Media production &
            motion graphic, Including"
          </p>
        </div>

        <div className="mt-6 md:mt-10 overflow-x-hidden">
          <div
            ref={trackRef}
            className={`no-scrollbar w-screen flex gap-4 md:gap-6 touch-pan-x select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling: "auto",
              willChange: 'scroll-position',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {infiniteServices.map((s, index) => (
              <article
                key={`${s.title}-${index}`}
                className="service-card group relative flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-[#141414] flex flex-col md:flex-row items-stretch h-80 md:h-[20rem] w-[90vw] sm:w-[75vw] md:w-[40rem]"
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Card-wide subtle left-to-right gradient for readability - hidden on mobile */}
                <div className="hidden md:block pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#141414]/80 via-[#141414]/30 to-transparent" />
                <div className="relative md:w-4/6 md:order-2 p-3 md:p-5 pl-0">
                  {/* Dark gradient overlay over the image - hidden on mobile */}
                  <div className="hidden md:block pointer-events-none absolute inset-y-3 md:inset-y-5 -inset-x-3 md:-inset-x-5 z-10 rounded-lg md:rounded-xl bg-gradient-to-r from-[#141414]/100 via-[#141414]/50 to-transparent" />
                  <img
                    src={s.img}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    className="h-32 md:h-full w-full select-none rounded-lg md:rounded-xl object-cover transition duration-500"
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>
                <div className="relative z-30 p-3 md:p-5 md:w-2/5 md:order-1 flex flex-col justify-center text-start h-full">
                  <h3 className="font-display text-lg md:text-xl text-white mb-2">{s.title}</h3>
                  <p className="text-xs md:text-sm text-white/70">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </section>
  );
}
