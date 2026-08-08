import { ArrowRight, Camera, Tag, Wallet } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { scrollToId } from "@/lib/scroll";

const steps = [
  {
    icon: Camera,
    num: "01",
    title: "Snap & Send",
    text: "Take 3 clear photos of your jacket (front, back, tag) and submit via our web form or Instagram DM.",
  },
  {
    icon: Tag,
    num: "02",
    title: "Get an Instant Valuation",
    text: "Our team reviews the brand, condition, and rarity to give you a fair cash offer within hours.",
  },
  {
    icon: Wallet,
    num: "03",
    title: "Fast Pickup & Cash Payout",
    text: "Ship your jacket or schedule a pickup. Once verified, get cash sent directly to your account.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 bg-onyx px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Process"
          title="Selling Your Jacket is Simple"
          sub="From pocket to payout in three steps — no haggling, no hidden fees, no waiting weeks for your cash."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.12} className="h-full">
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-chiffon/30 hover:bg-white/[0.05]">
                <span
                  aria-hidden
                  className="absolute right-6 top-4 font-display text-7xl leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-milano/40"
                >
                  {step.num}
                </span>

                <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-milano/30 bg-milano/15 text-ember shadow-[0_0_24px_rgba(169,14,2,0.25)]">
                  <step.icon className="h-6 w-6" />
                </div>

                <h3 className="relative text-xl font-semibold text-chiffon">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-chiffon/60">
                  {step.text}
                </p>

                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-chiffon/25 md:block"
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <LiquidGlassButton onClick={() => scrollToId("instagram")}>
            Get Your Instant Valuation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </LiquidGlassButton>
        </FadeIn>
      </div>
    </section>
  );
}
