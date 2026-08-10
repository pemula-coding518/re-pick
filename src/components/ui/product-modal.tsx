import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowRight, MoveHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";
import { categoryLabel, productMeta, productTitle, useLanguage } from "@/lib/i18n";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

type ProductModalProps = {
  /** The product to show; `null` closes the modal. */
  product: Product | null;
  onClose: () => void;
};

type GalleryView = "front" | "back";

/** Slide direction: 1 = next view enters from the right, -1 = previous from the left. */
type SwipeDir = 1 | -1;

/** How far/fast a swipe must go before the gallery flips views. */
const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 400;

/**
 * Product detail modal with a front/back photo gallery, sold-out state, and a
 * buyback CTA. Glass panel + Milano Red accents match the landing page system.
 *
 * A11y: role="dialog" + aria-modal, ESC to close, scrim click to close, focus
 * moves to the close button on open and returns to the trigger on close, body
 * scroll is locked, and Tab is trapped inside the panel.
 */
export function ProductModal({ product, onClose }: ProductModalProps) {
  const { t } = useLanguage();
  const [view, setView] = useState<GalleryView>("front");
  const [dir, setDir] = useState<SwipeDir>(1);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = product !== null;

  /* Reset the gallery view + remember the trigger whenever a product opens,
     and hand focus back to the trigger when the modal closes. */
  useEffect(() => {
    if (product) {
      setView("front");
      setDir(1);
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    } else {
      returnFocusRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  /* Focus the close button once the panel is on screen. */
  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => window.clearTimeout(timeout);
  }, [open]);

  /* Lock body scroll while the modal is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* ESC closes. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Keep Tab inside the dialog. */
  const trapTab = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const title = product ? productTitle(product.id, t) : "";
  const meta = product ? productMeta(product.id, t) : "";
  const cat = product ? categoryLabel(product.category, t) : "";
  const showBackToggle = product?.images.back != null;

  /** Swipe left → next view, swipe right → previous. Rubber-bands otherwise. */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!showBackToggle) return;
    const { offset, velocity } = info;
    const swipedLeft = offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY;
    const swipedRight = offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY;
    if (swipedLeft && view === "front") {
      setDir(1);
      setView("back");
    } else if (swipedRight && view === "back") {
      setDir(-1);
      setView("front");
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
        >
          {/* Scrim — click to close */}
          <button
            type="button"
            aria-label={t.modal.close}
            onClick={onClose}
            tabIndex={-1}
            className="absolute inset-0 cursor-pointer bg-black/65 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={trapTab}
            className="relative z-10 grid max-h-[90dvh] w-full max-w-4xl grid-cols-1 overflow-y-auto overscroll-contain rounded-3xl border border-chiffon/20 bg-neutral-900/90 shadow-[0_32px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:grid-cols-2"
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t.modal.close}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-chiffon/25 bg-black/50 text-chiffon backdrop-blur-md transition-colors duration-200 hover:border-chiffon hover:bg-milano"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Gallery */}
            <div className="relative flex flex-col bg-carbon">
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* Swipeable photo stage — drag follows the finger, then the new
                    view slides in from the direction you swiped. */}
                <motion.div
                  drag={showBackToggle ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "absolute inset-0",
                    showBackToggle && "cursor-grab active:cursor-grabbing"
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                    <motion.img
                      key={view}
                      custom={dir}
                      variants={{
                        enter: (d: SwipeDir) => ({ x: d * 80, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: SwipeDir) => ({ x: d * -80, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 320, damping: 32 },
                        opacity: { duration: 0.2 },
                      }}
                      src={
                        view === "back" && product.images.back
                          ? product.images.back
                          : product.images.front
                      }
                      alt={
                        view === "back"
                          ? `${title} — ${t.modal.back}`
                          : `${title} — ${t.modal.front}`
                      }
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

                {product.sold && (
                  <span className="absolute left-4 top-4 rounded-full border border-chiffon/35 bg-onyx/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-chiffon backdrop-blur-sm">
                    {t.drops.soldOut}
                  </span>
                )}
                {/* right-16 on mobile clears the close button; on md+ the close
                    button sits over the details column, so right-4 is safe */}
                <span className="absolute right-16 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-chiffon/70 backdrop-blur-sm md:right-4">
                  {cat}
                </span>
              </div>

              {/* View switcher — only when a back photo exists */}
              <div
                role="group"
                aria-label={t.modal.gallery}
                className="flex items-center gap-2 px-4 py-3"
              >
                {showBackToggle ? (
                  <>
                    {(["front", "back"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={view === v}
                        onClick={() => setView(v)}
                        className={cn(
                          "inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200",
                          view === v
                            ? "border-milano bg-milano text-chiffon shadow-[0_0_20px_rgba(169,14,2,0.4)]"
                            : "border-white/15 bg-white/[0.03] text-chiffon/70 hover:border-chiffon/40 hover:text-chiffon"
                        )}
                      >
                        {v === "front" ? t.modal.front : t.modal.back}
                      </button>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-chiffon/45">
                      <MoveHorizontal className="h-3.5 w-3.5" aria-hidden />
                      {t.modal.swipeHint}
                    </span>
                  </>
                ) : (
                  <span className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-chiffon/50">
                    {t.modal.front}
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 md:p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-chiffon/60">
                {cat}
              </span>
              <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight text-chiffon md:text-3xl">
                {title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-chiffon/65">{meta}</p>

              <span
                className={cn(
                  "mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
                  product.badge === "JUST BOUGHT"
                    ? "bg-milano/15 text-ember ring-1 ring-inset ring-milano/40"
                    : "border border-chiffon/30 text-chiffon/70"
                )}
              >
                {product.badge}
              </span>

              <div className="mt-auto pt-7">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-chiffon/60">
                      {t.drops.statusLabel}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ember">
                      {t.drops.soldOut}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-chiffon/45">
                      {t.drops.lastValuation}
                    </span>
                    <span className="text-lg font-semibold tabular-nums text-chiffon/45 line-through md:text-xl">
                      {product.valuation}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-chiffon/55">{t.modal.soldNote}</p>

                <LiquidGlassButton
                  className="mt-4 w-full"
                  onClick={() => {
                    onClose();
                    // Scroll after the exit animation so the target is visible.
                    window.setTimeout(() => scrollToId("how-it-works"), 200);
                  }}
                >
                  {t.drops.quoteCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </LiquidGlassButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
