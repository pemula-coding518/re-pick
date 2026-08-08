import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Shirt,
  Timer,
} from "lucide-react";
import { ShaderBackground } from "@/components/ui/liquid-metal-noir";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { scrollToId } from "@/lib/scroll";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};


export function Hero() {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden bg-onyx">
      <ShaderBackground className="absolute inset-0" />

      {/* Radial legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,transparent_0%,rgba(14,14,16,0.62)_100%)]"
      />
      {/* Faint blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,251,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,251,212,0.03)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      {/* Seam into the next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-onyx"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-3 rounded-full border border-chiffon/25 bg-black/40 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-chiffon/90 backdrop-blur-md md:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_8px_rgba(255,106,80,0.8)]" />
            Repick — Preloved Jacket Buyback
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 font-display text-[14vw] uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl xl:text-[8.5rem]"
        >
          <span className="text-chiffon drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
            See It.
          </span>{" "}
          <span className="bg-gradient-to-b from-[#FF7A5C] via-[#E2230F] to-milano bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(169,14,2,0.4)]">
            Pick It.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-chiffon/75 md:text-lg"
        >
          Turn your preloved outerwear into instant cash. We buy, restore, and
          rehome iconic vintage jackets.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <LiquidGlassButton size="lg" onClick={() => scrollToId("how-it-works")}>
            Sell Your Jacket
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </LiquidGlassButton>
          <LiquidGlassButton size="lg" variant="ghost" onClick={() => scrollToId("drops")}>
            Browse Recent Drops
          </LiquidGlassButton>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-[0.22em] text-chiffon/65 md:text-xs"
        >
          <span className="inline-flex items-center gap-2">
            <Shirt className="h-4 w-4 text-ember" /> 1+ Jackets Rescued
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-chiffon/30 sm:block" />
          <span className="inline-flex items-center gap-2">
            <Timer className="h-4 w-4 text-ember" /> 24-Hour Offers
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-chiffon/30 sm:block" />
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-ember" /> 100% Authentic
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-chiffon/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
