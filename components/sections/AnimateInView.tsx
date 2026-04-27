"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type AnimateInViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
  amount?: number;
};

/**
 * Fade-up-on-scroll wrapper used across the marketing site. For users with
 * `prefers-reduced-motion: reduce`, the animation is skipped entirely and the
 * element renders in its natural CSS state — so below-the-fold content is
 * always visible regardless of scroll/intersection behavior.
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
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
