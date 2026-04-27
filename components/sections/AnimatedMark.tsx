"use client";

import { motion } from "motion/react";

type AnimatedMarkProps = {
  size?: number;
  className?: string;
  delay?: number;
  amount?: number;
};

export default function AnimatedMark({
  size = 36,
  className,
  delay = 0,
  amount = 0.5,
}: AnimatedMarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={`shrink-0 ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {/* Crown — scales in */}
      <motion.path
        d="M16 4.5 C20.6 4.5 23.5 7 23.5 11.2 L23.5 14.2 C23.5 16.1 22 17.2 19.8 17.2 L12.2 17.2 C10 17.2 8.5 16.1 8.5 14.2 L8.5 11.2 C8.5 7 11.4 4.5 16 4.5 Z"
        fill="var(--color-ink)"
        style={{ transformOrigin: "16px 17px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.7 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }}
      />
      {/* Left root — fades up */}
      <motion.path
        d="M11.4 17.6 L11.4 22.5 C11.4 25.2 12.6 26.6 14.2 26.2 C15 26 15.2 24.4 15.2 22.4 L15.2 17.6 Z"
        fill="var(--color-tide)"
        variants={{
          hidden: { opacity: 0, y: 5 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + 0.18,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }}
      />
      {/* Right root — fades up */}
      <motion.path
        d="M16.8 17.6 L16.8 25.4 C16.8 27.7 18.6 28.4 20.4 27.6 C22.4 26.7 22.4 23.4 21.7 19.6 L21.4 17.6 Z"
        fill="var(--color-ink)"
        variants={{
          hidden: { opacity: 0, y: 5 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + 0.28,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }}
      />
    </motion.svg>
  );
}
