import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  withArrow?: boolean;
};

const base =
  "inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] px-5 py-3 text-sm font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-150";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-canvas)] shadow-[var(--shadow-1)] hover:-translate-y-px hover:bg-[var(--color-accent-deep)] hover:shadow-[var(--shadow-2)]",
  ghost:
    "border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] text-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)]",
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
