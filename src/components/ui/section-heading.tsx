import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="inline-flex items-center gap-2.5 rounded-full border border-chiffon/20 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-chiffon/80">
        <span className="h-1.5 w-1.5 rounded-full bg-milano shadow-[0_0_8px_rgba(169,14,2,0.9)]" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl font-display text-4xl uppercase leading-[1.05] tracking-tight text-chiffon md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="max-w-xl text-base leading-relaxed text-chiffon/60">{sub}</p>
      )}
    </FadeIn>
  );
}
