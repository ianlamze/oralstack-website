import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section">;

export default function Section({
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("px-6 md:px-10", className)} {...rest}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}
