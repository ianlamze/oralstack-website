"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "onDark";
  withArrow?: boolean;
  strength?: number;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const base =
  "relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-[var(--radius-md)] transition-colors duration-150 min-h-[44px]";

const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)]",
  ghost:
    "text-[var(--color-ink)] border border-[var(--color-border-strong)] hover:bg-[var(--color-canvas-tinted)]",
  onDark:
    "bg-[var(--color-canvas)] text-[var(--color-ink)] hover:bg-[var(--color-tide)] hover:text-[var(--color-canvas)]",
};

export default function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  withArrow = false,
  strength = 0.18,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className="size-4" aria-hidden />}
    </motion.a>
  );
}
