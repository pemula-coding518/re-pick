import { MotionConfig } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DropsShowcase } from "@/components/sections/DropsShowcase";
import { WhyRepick } from "@/components/sections/WhyRepick";
import { InstagramCTA } from "@/components/sections/InstagramCTA";
import { Footer } from "@/components/sections/Footer";
import { CategoryTicker } from "@/components/CategoryTicker";
import { AppleStyleDock } from "@/components/AppleStyleDock";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-chiffon/40 focus:bg-onyx focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        Skip to content
      </a>
      <MotionConfig reducedMotion="user">
        <main id="main" className="relative bg-onyx text-chiffon">
          <Hero />
          <CategoryTicker />
          <HowItWorks />
          <DropsShowcase />
          <WhyRepick />
          <InstagramCTA />
          <Footer />
          <AppleStyleDock />
        </main>
      </MotionConfig>
    </>
  );
}
