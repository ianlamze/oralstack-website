import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  withArrow?: boolean;
};

const base =
  "inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-[var(--radius-md)] transition-colors duration-150 min-h-[44px]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-accent-deep)]",
  ghost:
    "text-[var(--color-ink)] border border-[var(--color-border-strong)] hover:bg-[var(--color-canvas-tinted)]",
};

export default function Button({
  className,
  variant = "primary",
  withArrow = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowRight className="size-4" aria-hidden />}
    </a>
  );
}
