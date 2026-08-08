import { BadgeDollarSign, Leaf, Truck, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/lib/i18n";

const featureIcons = [BadgeDollarSign, Leaf, Truck, Users];

export function WhyRepick() {
  const { t } = useLanguage();
  const features = t.why.features;

  return (
    <section id="why" className="relative scroll-mt-24 bg-onyx px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} sub={t.why.sub} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const FeatureIcon = featureIcons[i % featureIcons.length];
            return (
            <FadeIn key={feature.title} delay={i * 0.1} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-milano/50 hover:bg-white/[0.05]">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-milano/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-milano/30 bg-milano/15 text-ember transition-all duration-500 group-hover:border-milano group-hover:bg-milano group-hover:text-chiffon group-hover:shadow-[0_0_24px_rgba(169,14,2,0.5)]">
                  <FeatureIcon className="h-5 w-5" />
                </div>
                <h3 className="relative text-lg font-semibold text-chiffon">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-chiffon/60">
                  {feature.text}
                </p>
              </div>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
