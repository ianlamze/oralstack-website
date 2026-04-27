"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type AnimateInViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
  amount?: number;
};

export default function AnimateInView({
  children,
  delay = 0,
  amount = 0.2,
  ...rest
}: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
