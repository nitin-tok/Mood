import { useEffect, useRef } from "react";
import gsap from "gsap";

const Gallery = () => {
  const leftRowRef = useRef<HTMLDivElement>(null);
  const centerRowRef = useRef<HTMLDivElement>(null);
  const rightRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame for smoother animations
    const animate = () => {
      const leftRow = leftRowRef.current;
      const centerRow = centerRowRef.current;
      const rightRow = rightRowRef.current;

      if (!leftRow || !centerRow) return;

      // Detect low-end device
      const isLowEndDevice = () => {
        const connection = (navigator as any).connection;
        const memory = (navigator as any).deviceMemory;
        const cores = navigator.hardwareConcurrency;
        
        return (
          connection?.effectiveType === 'slow-2g' ||
          connection?.effectiveType === '2g' ||
          memory < 2 || // Reduced from 4 to 2
          cores < 2 || // Reduced from 4 to 2
          window.innerWidth < 320 // Reduced from 480 to 320
        );
      };

      const isLowEnd = isLowEndDevice();

      // Duplicate content for seamless scrolling but without autoplay for duplicates
      const leftContent = leftRow.innerHTML;
      const centerContent = centerRow.innerHTML;
      const rightContent = rightRow?.innerHTML || '';

      // Create duplicate content without autoplay attributes
      const leftContentNoAutoplay = leftContent.replace(/autoPlay/g, '');
      const centerContentNoAutoplay = centerContent.replace(/autoPlay/g, '');
      const rightContentNoAutoplay = rightContent.replace(/autoPlay/g, '');

      leftRow.innerHTML = leftContent + leftContentNoAutoplay + leftContentNoAutoplay;
      centerRow.innerHTML = centerContent + centerContentNoAutoplay + centerContentNoAutoplay;
      if (rightRow) {
        rightRow.innerHTML = rightContent + rightContentNoAutoplay + rightContentNoAutoplay;
      }

      gsap.set(centerRow, { y: -centerRow.scrollHeight / 2 });
      gsap.set(leftRow, { y: 0 });

      // Create optimized infinite scrolling animations
      if (!isLowEnd) {
        const tl = gsap.timeline({ repeat: -1 });

        // Left and right rows scroll upward (negative Y) - optimized duration
        tl.to(leftRow, {
          y: "-100%",
          duration: 120, // Slightly slower for better performance
          ease: "none"
        });
        
        // Only animate right row if it exists (not hidden in mobile)
        if (rightRow) {
          tl.to(rightRow, {
            y: "-100%",
            duration: 120, // Slightly slower for better performance
            ease: "none"
          }, 0);
        }
        
        // Center row scrolls downward (positive Y) - optimized duration
        tl.to(centerRow, {
          y: "100%",
          duration: 120, // Slightly slower for better performance
          ease: "none"
        }, 0);

        return () => {
          tl.kill();
        };
      }
    };

    // Use requestAnimationFrame for better performance
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      className="py-8 md:py-16 lg:py-42 mb-[5rem] w-screen h-[100vh] md:h-[120vh] overflow-hidden relative"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 md:h-48 z-10 pointer-events-none" style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.95) 50%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0.4) 95%, rgba(0, 0, 0, 0) 100%)'}}></div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 z-10 pointer-events-none" style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.95) 50%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0.4) 95%, rgba(0, 0, 0, 0) 100%)'}}></div>
        
        <div 
          className="flex flex-row md:flex-row gap-2 md:gap-3 lg:gap-5 justify-center md:justify-between items-center w-[95%] mx-auto overflow-hidden"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
            <div 
              ref={leftRowRef} 
              className="flex flex-col gap-2 md:gap-3 lg:gap-5 justify-center items-center"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
                <div>   
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]" 
                  src="https://framerusercontent.com/assets/mJ5fVr17IUJ2VFHmC6zTF2avefM.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                {/* <p className="text-white text-md my-5">YOU ARE THE FOUNDATION</p> */}
                </div>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/Y7AcmMSUpuDNY7KQQTj5jsh4b5c.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/N6dsHkNNfOk8yAXJR3w2fWdRQ.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/XGj50HwohuQSITzx6RHYMiHmoM.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
            </div>
            <div 
              ref={centerRowRef} 
              className="flex flex-col gap-2 md:gap-3 lg:gap-5"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/YubV2SXx1emB9lL4gBvqqZWb0.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/3wpH4NmN6A4oZB05yC9e8QHiGM.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/Eq4EEHatmXUgd8dAU90MTP0bKeo.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/5S3DsFfEz78aaOgfQuQpUl7U2VA.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
            </div>
            <div 
              ref={rightRowRef} 
              className="hidden md:flex flex-col gap-2 md:gap-3 lg:gap-5"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/DUZJPYquwquIMk6w9pZVGT2GA8.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/TZNekn9mhMRT3kFT3Z29BcBjKk.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video 
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/DUZJPYquwquIMk6w9pZVGT2GA8.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
                <video  
                  className="rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/20 object-cover will-change-transform cursor-pointer opacity-100 h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[16rem] md:h-[16rem] md:w-[28rem] lg:h-[18rem] lg:w-[35rem]"
                  src="https://framerusercontent.com/assets/jtyhFshAdOmMxcdOBCSnkbkqg.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                ></video>
            </div>
        </div>
    </div>
  )
}

export default Gallery