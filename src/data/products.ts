import hoodzipp from "@/images/hoodzipp-uni1ql0.webp";
import tracktopF1la from "@/images/tracktop-f1la.webp";
import tracktopK4ppa from "@/images/tracktop-k4ppa.webp";
import windbreakerK4ppa from "@/images/windbreaker-k4ppa.webp";

export type ProductBadge = "JUST BOUGHT" | "CURATED DROP";

/** Stable, language-neutral category ids — labels live in the i18n dictionaries. */
export type ProductCategory = "hoodies" | "tracktops" | "windbreakers";

export type CategoryId = "all" | ProductCategory;

export type Product = {
  id: number;
  category: ProductCategory;
  image: string;
  badge: ProductBadge;
  /** IDR valuation range. */
  valuation: string;
  sold: boolean;
};

export const categories: { id: CategoryId }[] = [
  { id: "all" },
  { id: "hoodies" },
  { id: "tracktops" },
  { id: "windbreakers" },
];

export const products: Product[] = [
  {
    id: 1,
    category: "windbreakers",
    image: windbreakerK4ppa,
    badge: "JUST BOUGHT",
    valuation: "Rp 120.000 – Rp 150.000",
    sold: false,
  },
  {
    id: 2,
    category: "hoodies",
    image: hoodzipp,
    badge: "CURATED DROP",
    valuation: "Rp 150.000 – Rp 185.000",
    sold: false,
  },
  {
    id: 3,
    category: "tracktops",
    image: tracktopK4ppa,
    badge: "JUST BOUGHT",
    valuation: "Rp 100.000 – Rp 140.000",
    sold: false,
  },
  {
    id: 4,
    category: "tracktops",
    image: tracktopF1la,
    badge: "CURATED DROP",
    valuation: "Rp 160.000 – Rp 200.000",
    sold: false,
  },
];
