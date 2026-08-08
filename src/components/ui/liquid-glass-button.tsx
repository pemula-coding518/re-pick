import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LiquidGlassButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  className?: string;
  size?: "md" | "lg";
  /** "primary" gets the Milano Red fluid fill; "ghost" stays quiet so a
      screen keeps exactly one dominant CTA. */
  variant?: "primary" | "ghost";
};

/**
 * Liquid glass CTA: frosted glass body with a Lemon Chiffon hairline,
 * inner glow, and a Milano Red fluid wash + shimmer sweep on hover.
 */
export function LiquidGlassButton({
  children,
  onClick,
  href,
  className,
  size = "md",
  variant = "primary",
}: LiquidGlassButtonProps) {
  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-medium tracking-wide backdrop-blur-xl",
    "transition-[border-color,box-shadow,background-color,color] duration-500 ease-out",
    size === "lg" ? "min-h-14 px-9 text-sm md:text-base" : "min-h-12 px-7 text-sm",
    variant === "primary"
      ? "border-chiffon/30 bg-white/5 text-chiffon shadow-[inset_0_1px_0_rgba(255,251,212,0.15),0_10px_40px_rgba(0,0,0,0.4)] hover:border-chiffon/70 hover:shadow-[inset_0_1px_0_rgba(255,251,212,0.4),0_0_44px_rgba(169,14,2,0.55)]"
      : "border-chiffon/20 bg-transparent text-chiffon/75 hover:border-chiffon/45 hover:bg-white/5 hover:text-chiffon",
    className
  );

  const content = (
    <>
      {variant === "primary" && (
        <>
          {/* Milano Red fluid fill */}
          <span
            aria-hidden
            className="absolute inset-0 z-0 rounded-full bg-gradient-to-br from-[#E2230F] via-milano to-[#6E0901] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
          {/* Chiffon hairline kept visible on hover */}
          <span
            aria-hidden
            className="absolute inset-0 z-0 rounded-full ring-1 ring-inset ring-chiffon/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </>
      )}
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-1/3 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-chiffon/30 to-transparent blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[500%]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
