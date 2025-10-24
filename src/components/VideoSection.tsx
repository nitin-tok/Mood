import { useEffect, useMemo, useRef, useState } from "react";
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

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const videoSources = useMemo(
    () => [
      "https://framerusercontent.com/assets/hwvVOfGPLnWOuWRPmGCenbauTo8.mp4",
      "https://framerusercontent.com/assets/mJ5fVr17IUJ2VFHmC6zTF2avefM.mp4",
      "https://framerusercontent.com/assets/Mq1btXpoPCfVQcvpZuy3LsGYs.mp4",
    ],
    []
  );

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const ctx = gsap.context(() => {
        // Optimized entrance animation with reduced complexity
        gsap.from("img, video", {
          scale: 1.05, // Reduced scale for better performance
          opacity: 0,
          duration: 1, // Reduced duration
          ease: "power2.out", // Simpler easing
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Later trigger for better performance
            end: "bottom 15%",
            scrub: 0.5, // Reduced scrub intensity for better performance
            toggleActions: "play none none reverse", // Optimized toggle actions
          },
        });
      }, sectionRef);
      
      return () => ctx.revert();
    };

    // Use requestAnimationFrame for better performance
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Ensure videos are autoplaying, muted, and playing inline
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true as any;
      
      // Set initial positions for each video
      gsap.set(video, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1
      });
      
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay might be blocked; we'll retry on interaction
          const onInteract = () => {
            video.play().finally(() => {
              window.removeEventListener("click", onInteract);
              window.removeEventListener("touchstart", onInteract);
            });
          };
          window.addEventListener("click", onInteract, { once: true });
          window.addEventListener("touchstart", onInteract, { once: true });
        });
      }
    });
  }, [order]);

  // Optimized video animation changes with GSAP
  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    if (videos.length === 0 || expandedVideo !== null) return;

    // Kill any existing animations first
    gsap.killTweensOf(videos);

    videos.forEach((video, index) => {
      const isActive = index === activeIndex;
      const isSecond = index === 1;
      
      gsap.to(video, {
        scale: isActive ? 1.02 : isSecond ? 0.95 : 0.9, // Reduced scale changes for better performance
        zIndex: isActive ? 20 : isSecond ? 10 : 0,
        duration: 0.5, // Reduced duration for better performance
        ease: "power2.out",
        transformOrigin: "center center"
      });
    });
  }, [activeIndex, expandedVideo]);

  // Shuffle/rotate which video comes forward using GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      // Only shuffle if no video is expanded
      if (expandedVideo !== null) {
        return;
      }
      
      setOrder((prev) => {
        // Shuffle order randomly
        const next = [...prev];
        for (let i = next.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [next[i], next[j]] = [next[j], next[i]];
        }
        
        // Optimized animation for next active video
        const nextActive = next[next.length - 1];
        const target = videoRefs.current[nextActive];
        if (target) {
          gsap.fromTo(
            target,
            { scale: 0.5, opacity: 1, transformOrigin: "center center" }, // Reduced scale change
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" } // Reduced duration and simpler easing
          );
        }
        
        // Choose a new active index from shuffled order (prefer last so it "comes forward")
        setActiveIndex(nextActive);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [expandedVideo]);

  // Handle video click to expand to full parent size
  const handleVideoClick = (videoIndex: number) => {
    const video = videoRefs.current[videoIndex];
    if (!video || isAnimating) return;

    // Set animation state to prevent multiple clicks
    setIsAnimating(true);

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(videoRefs.current);

    if (expandedVideo === videoIndex) {
      // Collapse the video and make other videos visible
      const tl = gsap.timeline();
      
      // Optimized collapse animation
      tl.to(video, {
        scaleY: 0,
        scaleX: 1,
        transformOrigin: "top center",
        duration: 0.6, // Reduced duration for better performance
        ease: "power2.in"
      })
      // Then make other videos visible after exit animation completes
      .to(videoRefs.current.filter((_, idx) => idx !== videoIndex), {
        opacity: 1,
        duration: 0.2, // Reduced duration
        ease: "power2.out"
      }, "-=0.1")
      .call(() => {
        setExpandedVideo(null);
        setIsAnimating(false);
      });
    } else {
      // Expand the video and make other videos invisible
      setExpandedVideo(videoIndex);
      
      const tl = gsap.timeline();
      
      // Make all other videos invisible first
      tl.to(videoRefs.current.filter((_, idx) => idx !== videoIndex), {
        opacity: 0,
        duration: 0.2, // Reduced duration
        ease: "power2.out"
      })
      // Then expand the clicked video
      .fromTo(video, 
        {
          scaleY: 0,
          scaleX: 1,
          transformOrigin: "top center"
        },
        {
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "center center",
          duration: 0.6, // Reduced duration for better performance
          ease: "power2.out"
        }, "-=0.1")
        .call(() => setIsAnimating(false));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] md:h-[200vh] w-screen overflow-hidden mt-[-5rem] md:mt-[-10rem]"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="absolute inset-0 bg-black/20 bg-[url('/video-section-image.webp')] bg-cover bg-center flex items-center justify-center">
        <div className="px-4 md:px-0">
          <div className="relative flex items-center justify-center gap-2 md:gap-3 z-10">
            <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/x8HpwRJxZ3b51TOFOHOoqhk3Y.png?scale-down-to=512')] bg-cover bg-center bg-no-repeat rounded-xl md:rounded-[2rem] backdrop-blur-[5rem] md:backdrop-blur-[10rem] blur-[8px] md:blur-[20px] " />
            <div className="group flex flex-col justify-center items-center gap-2 md:gap-3 relative h-[18rem] w-[90vw] md:h-[35rem] md:w-[65rem]">
              {order.map((idx, i) => {
                const isActive = idx === activeIndex;
                const isExpanded = expandedVideo === idx;
                const baseClass =
                  "rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 object-cover will-change-transform cursor-pointer absolute opacity-100";
                const sizeClass = isExpanded
                  ? "h-full w-full absolute inset-0 z-30"
                  : isActive
                  ? "h-[10rem] w-[75vw] md:h-[22rem] md:w-[42rem] rounded-xl md:rounded-[2rem] top-[6rem] md:top-[10rem]"
                  : i === 1
                  ? "h-[1.8rem] w-[65vw] md:h-[3.2rem] md:w-[37rem] top-[3.5rem] md:top-[6rem]"
                  : "h-[1.3rem] w-[55vw] md:h-[2.5rem] md:w-[32rem] top-[2rem] md:top-[3rem]";
                return (
                  <video
                    key={idx}
                    ref={(el) => {
                      if (el) videoRefs.current[idx] = el;
                    }}
                    className={`${baseClass} ${sizeClass}`}
                    src={videoSources[idx]}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    onClick={() => handleVideoClick(idx)}
                    style={{
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
