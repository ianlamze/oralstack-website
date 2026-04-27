"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

export default function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Parse leading digits + optional decimal + suffix.
  // Handles "85%", "120+", "3 weeks", "0", "$200", "1.6M+".
  const match = value.match(/^([^\d-]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = numStr ? parseFloat(numStr) : 0;
  const isInt = numStr && !numStr.includes(".");

  const [display, setDisplay] = useState(match ? `${prefix}0${suffix}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const n = isInt ? Math.round(latest).toString() : latest.toFixed(1);
        setDisplay(`${prefix}${n}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, target, duration, prefix, suffix, isInt, match]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
