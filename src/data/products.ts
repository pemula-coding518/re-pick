import hoodzipp from "@/images/hoodzipp-uni1ql0.webp";
import tracktopF1la from "@/images/tracktop-f1la.webp";
import tracktopK4ppa from "@/images/tracktop-k4ppa.webp";
import windbreakerK4ppa from "@/images/windbreaker-k4ppa.webp";

export type CategoryId = "all" | "hoodies" | "tracktops" | "windbreakers";

export type Product = {
  id: number;
  title: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  /** All current drops have already been sold. */
  sold: boolean;
  valuation: string;
  meta: string;
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Drops" },
  { id: "hoodies", label: "Zip Hoodies" },
  { id: "tracktops", label: "Track Tops" },
  { id: "windbreakers", label: "Windbreakers" },
];

export const products: Product[] = [
  {
    id: 1,
    title: "Unisex Zip Hoodie",
    category: "hoodies",
    image: hoodzipp,
    sold: true,
    valuation: "$25 – $45",
    meta: "Heavyweight fleece · YKK zip · size M",
  },
  {
    id: 2,
    title: "Raglan Track Top",
    category: "tracktops",
    image: tracktopF1la,
    sold: true,
    valuation: "$20 – $40",
    meta: "Zip-up track top · raglan sleeves · size L",
  },
  {
    id: 3,
    title: "Kappa Track Top",
    category: "tracktops",
    image: tracktopK4ppa,
    sold: true,
    valuation: "$35 – $65",
    meta: "Contrast piping · retro fit · size L",
  },
  {
    id: 4,
    title: "Kappa Windbreaker",
    category: "windbreakers",
    image: windbreakerK4ppa,
    sold: true,
    valuation: "$40 – $75",
    meta: "Nylon shell · packable · size M",
  },
];
