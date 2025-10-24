"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BlurredStaggerProps = {
  text: string;
  className?: string;
  triggerOnView?: boolean;
  as?: "h1" | "p" | "span" | "div";
  duration?: number;
};

export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  className,
  triggerOnView = true,
  as = "h1",
  duration = 0.3,
}: BlurredStaggerProps) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const MotionTag =
    as === "p"
      ? motion.p
      : as === "span"
        ? motion.span
        : as === "div"
          ? motion.div
          : motion.h1;

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      animate={triggerOnView ? undefined : "show"}
      whileInView={triggerOnView ? "show" : undefined}
      viewport={triggerOnView ? { once: true, amount: 0.6 } : undefined}
      className={cn("text-base", className)}
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          transition={{ duration }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
};
