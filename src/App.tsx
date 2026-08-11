import { MotionConfig } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { usePath } from "@/lib/router";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DropsShowcase } from "@/components/sections/DropsShowcase";
import { WhyRepick } from "@/components/sections/WhyRepick";
import { InstagramCTA } from "@/components/sections/InstagramCTA";
import { Footer } from "@/components/sections/Footer";
import { CategoryTicker } from "@/components/CategoryTicker";
import { AppleStyleDock } from "@/components/AppleStyleDock";
import { AdminApp } from "@/pages/admin/AdminApp";

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-chiffon/40 focus:bg-onyx focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {t.skipLink}
    </a>
  );
}

export default function App() {
  const path = usePath();
  const isAdmin = path.startsWith("/admin");

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        {isAdmin ? (
          <AdminApp />
        ) : (
          <>
            <SkipLink />
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
          </>
        )}
      </MotionConfig>
    </LanguageProvider>
  );
}
