import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { IG_URL } from "@/lib/scroll";

export function InstagramCTA() {
  return (
    <section id="instagram" className="scroll-mt-24 bg-onyx px-6 py-24 md:py-32">
      <FadeIn>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-chiffon/20 bg-gradient-to-br from-[#E2230F] via-milano to-[#5E0801] px-8 py-16 text-center md:px-20 md:py-24">
          {/* Ambient glows */}
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-chiffon/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-black/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 [background-image:linear-gradient(rgba(255,251,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,251,212,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-chiffon/30 bg-black/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-chiffon backdrop-blur-sm">
              <Instagram className="h-3.5 w-3.5" /> @repick_id
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl uppercase leading-[1.05] tracking-tight text-chiffon md:text-6xl">
              Want a faster quote?{" "}
              <span className="bg-chiffon px-3 text-milano">Send us a DM</span>{" "}
              right now.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-chiffon/85 md:text-base">
              Our team replies within minutes — send photos of your jacket and
              get a cash offer without the wait.
            </p>

            <div className="mt-9 flex justify-center">
              <motion.a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-chiffon px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-milano shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-white"
              >
                <Instagram className="h-5 w-5" />
                Message @repick_id
              </motion.a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
