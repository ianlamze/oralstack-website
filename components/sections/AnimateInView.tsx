"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type AnimateInViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
  amount?: number;
};

/**
 * Fade-up-on-scroll wrapper used across the marketing site. SSR always renders
 * in the visible state (initial={false}) so content is never invisible if JS
 * is slow, fails to hydrate, or never gets a scroll trigger. For users with
 * `prefers-reduced-motion: reduce`, the entrance transition is skipped too.
 */
export default function AnimateInView({
  children,
  delay = 0,
  amount = 0.2,
  ...rest
}: AnimateInViewProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
