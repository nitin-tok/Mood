import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 md:mt-16 border-t border-white/50 bg-black pt-10 md:pt-20">
      <div className="container py-6 md:py-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">
          {/* Brand + blurb */}
          <div className="lg:flex-1 lg:max-w-md">
            <img
              src="https://framerusercontent.com/images/WcBMgKMOfVAdf9hImjIh83q4.png"
              alt=""
              className="w-32 md:w-40"
            />
            <p className="mt-4 text-sm md:text-md text-white max-w-[31rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-5 flex items-center gap-2 md:gap-3">
              <Social href="#" label="Facebook" icon={<IconFacebook />} />
              <Social href="#" label="Instagram" icon={<IconInstagram />} />
              <Social href="#" label="X" icon={<IconX />} />
              <Social href="#" label="LinkedIn" icon={<IconLinkedIn />} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-row justify-between lg:justify-around lg:items-start gap-8 sm:gap-12 lg:gap-[10rem]">
            {/* Useful Links */}
            <div>
              <h4 className="font-semibold text-lg md:text-xl text-white">Useful Links</h4>
              <ul className="mt-4 space-y-2 text-sm md:text-md text-white/80">
                <li>
                  <Nav to="/">Home</Nav>
                </li>
                <li>
                  <Nav to="/about">About Us</Nav>
                </li>
                <li>
                  <Nav to="/services">Services</Nav>
                </li>
                <li>
                  <Nav to="/partners">Partners</Nav>
                </li>
                <li>
                  <Nav to="/contact">Contact Us</Nav>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="lg:mr-[15rem]">
              <h4 className="font-semibold text-lg md:text-xl text-white">Help</h4>
              <ul className="mt-4 space-y-2 text-sm md:text-md text-white/80">
                <li>
                  <Nav to="/privacy">Privacy Policy</Nav>
                </li>
                <li>
                  <Nav to="/terms">Terms & Conditions</Nav>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/60 w-[88%] mx-auto">
        <div className="container py-4 md:py-6 text-center text-sm md:text-md text-white/80">
          © {year} BEINMOOD.COM. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Nav({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function Social({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-red-700 text-white hover:bg-white hover:text-red-700 transition-colors"
    >
      {icon}
    </a>
  );
}

function IconFacebook() {
  return (
    <svg
      width="20"
      height="20"
      className="md:w-[25px] md:h-[25px]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.85l-.46 2.91h-2.39v7.04A10 10 0 0022 12z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg
      width="20"
      height="20"
      className="md:w-[25px] md:h-[25px]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg
      width="20"
      height="20"
      className="md:w-[25px] md:h-[25px]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 3h4.8l4.2 6.2L16.8 3H21l-7.2 9.6L21 21h-4.8l-4.2-6.2L7.2 21H3l7.2-9.6L3 3z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg
      width="20"
      height="20"
      className="md:w-[25px] md:h-[25px]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05C19.9 8 23 10 23 14.7V23h-4v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23h-4V8z" />
    </svg>
  );
}
