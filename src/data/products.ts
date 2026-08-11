import hoodzipp from "@/images/hoodzipp-uni1ql0.webp";
import hoodzippBack from "@/images/hoodzipp-uni1ql0-back.webp";
import tracktopF1la from "@/images/tracktop-f1la.webp";
import tracktopF1laBack from "@/images/tracktop-f1la-back.webp";
import tracktopK4ppa from "@/images/tracktop-k4ppa.webp";
import tracktopK4ppaBack from "@/images/tracktop-k4ppa-back.webp";
import windbreakerK4ppa from "@/images/windbreaker-k4ppa.webp";

export type ProductBadge = "JUST BOUGHT" | "CURATED DROP";

/** Stable, language-neutral category ids — labels live in the i18n dictionaries.
 *  "other" is used for Supabase rows whose category doesn't map to a chip
 *  (they still appear under "All Drops"). */
export type ProductCategory = "hoodies" | "tracktops" | "windbreakers" | "other";

export type CategoryId = "all" | ProductCategory;

/** One or two views per piece — `back` is optional and drives the gallery toggle. */
export type ProductImages = {
  front: string;
  /** Back-view photo. When present, the detail modal shows a Depan/Belakang toggle. */
  back?: string;
};

export type Product = {
  id: string;
  category: ProductCategory;
  images: ProductImages;
  /** Provenance tag (static catalog only — dynamic rows show status instead). */
  badge?: ProductBadge;
  /** IDR valuation range (static catalog). */
  valuation?: string;
  sold: boolean;
  /* --- Dynamic (Supabase) fields — when present they override dict lookups --- */
  /** DB title; falls back to the i18n dictionary for static products. */
  title?: string;
  /** Short line under the title (static: i18n meta; dynamic: DB description). */
  meta?: string;
  /** Single DB price (e.g. "Rp 150.000"); falls back to `valuation`. */
  price?: string;
};

export const categories: { id: CategoryId }[] = [
  { id: "all" },
  { id: "hoodies" },
  { id: "tracktops" },
  { id: "windbreakers" },
];

export const products: Product[] = [
  {
    id: "1",
    category: "windbreakers",
    images: { front: windbreakerK4ppa },
    badge: "JUST BOUGHT",
    valuation: "Rp 120.000 – Rp 150.000",
    sold: true,
  },
  {
    id: "2",
    category: "hoodies",
    images: { front: hoodzipp, back: hoodzippBack },
    badge: "CURATED DROP",
    valuation: "Rp 150.000 – Rp 185.000",
    sold: true,
  },
  {
    id: "3",
    category: "tracktops",
    images: { front: tracktopK4ppa, back: tracktopK4ppaBack },
    badge: "JUST BOUGHT",
    valuation: "Rp 100.000 – Rp 140.000",
    sold: true,
  },
  {
    id: "4",
    category: "tracktops",
    images: { front: tracktopF1la, back: tracktopF1laBack },
    badge: "CURATED DROP",
    valuation: "Rp 160.000 – Rp 200.000",
    sold: true,
  },
];
