import { useState } from "react";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

// Local types (replacing removed @shared/api import)
type ContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactResponse = {
  ok: boolean;
  message?: string;
};

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: ContactRequest = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ContactResponse;
      if (res.ok && data.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-foreground">
      <section className="container py-12 md:py-20">
        <div className="text-center py-10">
          <BlurredStagger
            text="CONTACT US"
            as="h1"
            className="text-4xl md:text-7xl font-extrabold tracking-wide uppercase"
            triggerOnView
            duration={1}
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Left: Form */}
          <div className="relative w-full md:w-[95%] rounded-2xl bg-[#111111] backdrop-blur supports-[backdrop-filter]:bg-[#111111] p-4 md:p-8 border border-white/5 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-5xl font-medium">
                Send us a <span className="text-red-500">message</span>
              </h2>
              <p className="mt-5 text-lg text-white font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 font-white">
                <Field label="First Name" name="firstName" type="text" />
                <Field label="Last Name" name="lastName" type="text" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone" name="phone" type="tel" />
                <Field
                  label="Subject"
                  name="subject"
                  type="text"
                  className="md:col-span-2"
                />
                <FieldTextarea
                  label="Message"
                  name="message"
                  className="md:col-span-2"
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-6 py-3 font-medium"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-emerald-400">
                  Message sent successfully.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Failed to send message. Please try again.
                </p>
              )}

              {/* <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" /> */}
            </form>
          </div>

          {/* Right: Details */}
          <div className="hidden md:block relative w-[95%] rounded-2xl bg-[#111111] backdrop-blur supports-[backdrop-filter]:bg-[#111111] p-6 md:p-8 border border-white/5 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-5xl font-medium">
                Get in <span className="text-red-500">Touch</span>
              </h2>
              <p className="mt-5 text-lg text-white font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <ul className="space-y-5">
              <InfoRow
                icon={<IconPin />}
                title="Location"
                text="Anas Bin Malek Rd, Almalqa, F&F Building, Ground Floor, Office #01"
              />
              <InfoRow
                icon={<IconMail />}
                title="Email Us"
                text="info@beinmood.com"
              />
              <InfoRow
                icon={<IconPhone />}
                title="Call Us"
                text="+966 11 220 1123"
              />
            </ul>

            <div className="mt-8">
              <p className="font-medium text-white">Follow Our Social Media</p>
              <div className="mt-3 flex items-center gap-3">
                <Social href="#" label="Facebook" icon={<IconFacebook />} />
                <Social href="#" label="Instagram" icon={<IconInstagram />} />
                <Social href="#" label="X" icon={<IconX />} />
                <Social href="#" label="LinkedIn" icon={<IconLinkedIn />} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm text-white">{label}</span>
      <input
        name={name}
        type={type}
        required={name !== "phone"}
        className="mt-2 w-full bg-transparent outline-none border-b border-white/20 focus:border-primary transition-colors placeholder:text-muted-foreground/70 py-2"
        placeholder={label}
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  className = "",
}: {
  label: string;
  name: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm text-white">{label}</span>
      <textarea
        name={name}
        required
        rows={4}
        className="mt-2 w-full bg-transparent outline-none border-b border-white/20 focus:border-primary transition-colors placeholder:text-muted-foreground/70 py-2 resize-y min-h-[120px]"
        placeholder={label}
      />
    </label>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-white">
        {icon}
      </span>
      <div>
        <p className="text-xl font-semibold text-white">{title}</p>
        <p className="font-medium text-lg leading-snug text-white">{text}</p>
      </div>
    </li>
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
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white hover:bg-white hover:text-red-700 transition-colors"
    >
      {icon}
    </a>
  );
}

// Minimal inline brand icons (SVG)
function IconPin() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6zm0 8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05C19.9 8 23 10 23 14.7V23h-4v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23h-4V8z" />
    </svg>
  );
}
