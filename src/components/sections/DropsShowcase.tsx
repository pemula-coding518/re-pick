import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductModal } from "@/components/ui/product-modal";
import { products, type CategoryId, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  categoryLabel,
  getCategories,
  productMeta,
  productTitle,
  useLanguage,
} from "@/lib/i18n";

function Badge({ badge }: { badge: Product["badge"] }) {
  if (badge === "JUST BOUGHT") {
    return (
      <span className="absolute left-4 top-4 rounded-full bg-milano px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-chiffon shadow-[0_4px_16px_rgba(169,14,2,0.5)]">
        {badge}
      </span>
    );
  }
  return (
    <span className="absolute left-4 top-4 rounded-full border border-chiffon/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-chiffon backdrop-blur-sm">
      {badge}
    </span>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const { t } = useLanguage();
  const title = productTitle(product.id, t);
  const meta = productMeta(product.id, t);
  const cat = categoryLabel(product.category, t);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-chiffon/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Photo — the whole image is the "view details" trigger */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t.modal.viewDetails}: ${title}`}
        aria-haspopup="dialog"
        className="relative block aspect-[4/5] w-full overflow-hidden bg-carbon text-left"
      >
        <img
          src={product.images.front}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        {product.sold && (
          <span className="absolute left-4 top-4 rounded-full border border-chiffon/35 bg-onyx/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-chiffon backdrop-blur-sm">
            {t.drops.soldOut}
          </span>
        )}
        {!product.sold && <Badge badge={product.badge} />}
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-chiffon/70 backdrop-blur-sm">
          {cat}
        </span>

        {/* View-details affordance — visible on touch, appears on hover on desktop */}
        <span className="absolute inset-x-4 bottom-4 flex max-md:translate-y-0 max-md:opacity-100 md:translate-y-6 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <span className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-chiffon/40 bg-black/50 text-xs font-semibold uppercase tracking-[0.2em] text-chiffon backdrop-blur-md transition-colors duration-300 group-hover:border-chiffon group-hover:bg-milano">
            {t.modal.viewDetails}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
      </button>

      <div className="p-5">
        <h3 className="text-sm font-semibold leading-snug text-chiffon">{title}</h3>
        <p className="mt-1.5 text-xs text-chiffon/65">{meta}</p>
        {product.sold ? (
          <>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-chiffon/60">
                {t.drops.statusLabel}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-chiffon/50">
                {t.drops.soldOut}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.15em] text-chiffon/45">
                {t.drops.lastValuation}
              </span>
              <span className="font-semibold tabular-nums text-chiffon/45 line-through">
                {product.valuation}
              </span>
            </div>
          </>
        ) : (
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-chiffon/60">
              {t.drops.valuationLabel}
            </span>
            <span className="font-semibold tabular-nums text-chiffon">
              {product.valuation}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function DropsShowcase() {
  const { t } = useLanguage();
  const categories = getCategories(t);
  const [active, setActive] = useState<CategoryId>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section id="drops" className="relative scroll-mt-24 bg-carbon px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.drops.eyebrow}
          title={t.drops.title}
          sub={t.drops.sub}
        />

        <FadeIn className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id as CategoryId)}
              aria-pressed={active === cat.id}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300",
                active === cat.id
                  ? "border-milano bg-milano text-chiffon shadow-[0_0_24px_rgba(169,14,2,0.4)]"
                  : "border-white/15 bg-white/[0.03] text-chiffon/70 hover:border-chiffon/40 hover:text-chiffon"
              )}
            >
              {cat.label}
            </button>
          ))}
        </FadeIn>

        {/* Screen-reader announcement when the filter changes */}
        <p aria-live="polite" role="status" className="sr-only">
          {t.drops.showing(shown.length, products.length)}
        </p>

        <div
          aria-hidden="true"
          className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] text-chiffon/60"
        >
          <span className="h-px w-8 bg-chiffon/20" />
          <span>{t.drops.count(shown.length, products.length)}</span>
          <span className="h-px w-8 bg-chiffon/20" />
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={() => setSelected(product)} />
          ))}
        </motion.div>

        <FadeIn delay={0.1} className="mt-12 flex justify-center">
          <a
            href="#instagram"
            className="group inline-flex items-center gap-2 text-sm font-medium text-chiffon/70 transition-colors hover:text-chiffon"
          >
            <Quote className="h-4 w-4 text-ember" />
            {t.drops.footerLink}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>

      {/* Rendered as a section sibling so no transformed ancestor breaks `fixed` */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
