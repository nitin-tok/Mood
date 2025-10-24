import { MoreVertical, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Fixed Logo - stays in place on scroll */}
      <a
        href="#top"
        className="fixed left-4 md:left-6 top-4 z-50 flex items-center gap-3"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {/* <img
          src="https://framerusercontent.com/images/tS63ua8WeK8xnL0gJHbXwOvcbs.png"
          alt="Mood Logo"
          className="navbar-logo h-6 md:h-10 w-auto opacity-0"
        /> */}
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed right-4 md:right-6 top-4 z-50 text-white/80 hover:text-white transition-colors md:hidden"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop 3-dot icon - mirrors logo on the right */}
      <button
        className="fixed right-6 top-4 z-50 text-white/80 hover:text-white transition-colors mt-2 hidden md:block"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {/* Scrolling Navigation */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
          {/* Placeholder to balance the logo */}
          <div className="w-6 md:w-8"></div>

          {/* Desktop Centered Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-16 mt-10">
            <a
              href="#top"
              className="text-md text-white/80 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-md text-white/80 hover:text-white transition-colors"
            >
              About Us
            </a>
            <a
              href="#services"
              className="text-md text-white/80 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#partners"
              className="text-md text-white/80 hover:text-white transition-colors"
            >
              Partners
            </a>
            <a
              href="#contact"
              className="text-md text-white/80 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right placeholder to balance fixed icon */}
          <div className="w-6 md:w-8"></div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          {/* Close button in top right */}
          <button
            onClick={toggleMobileMenu}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a
              href="#top"
              className="text-2xl text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-2xl text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#services"
              className="text-2xl text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#partners"
              className="text-2xl text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partners
            </a>
            <a
              href="#contact"
              className="text-2xl text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}
