import { BadgeDollarSign, Leaf, Truck, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: BadgeDollarSign,
    title: "Top Dollar for Quality",
    text: "Fair market value based on vintage trends, rarity, and condition — priced the way the market really values it.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Fashion",
    text: "Keep great outerwear in circulation and reduce fashion waste, one rescued jacket at a time.",
  },
  {
    icon: Truck,
    title: "Hassle-Free Logistics",
    text: "We handle shipping costs and offer direct payouts — you never lift a finger beyond the pickup.",
  },
  {
    icon: Users,
    title: "Curated Community",
    text: "Joined by thousands of thrifters across Indonesia hunting the same racks as you.",
  },
];

export function WhyRepick() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-onyx px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Trust & Guarantee"
          title="Why Sell to Repick?"
          sub="We built the buyback experience the way we'd want it ourselves — fast, fair, and fuss-free."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-milano/50 hover:bg-white/[0.05]">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-milano/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-milano/30 bg-milano/15 text-ember transition-all duration-500 group-hover:border-milano group-hover:bg-milano group-hover:text-chiffon group-hover:shadow-[0_0_24px_rgba(169,14,2,0.5)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="relative text-lg font-semibold text-chiffon">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-chiffon/60">
                  {feature.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
