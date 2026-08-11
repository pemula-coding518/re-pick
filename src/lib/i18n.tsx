import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  categories as categoryData,
  products as productData,
  type CategoryId,
  type ProductCategory,
} from "@/data/products";

export type Language = "id" | "en";

/* ------------------------------------------------------------------ */
/* Dictionaries                                                        */
/* ------------------------------------------------------------------ */

const id = {
  hero: {
    badge: "REPICK — JUAL BELI JAKET BEKAS",
    taglineA: "See It.",
    taglineB: "Pick It.",
    sub: "Ubah jaket bekasmu jadi uang tunai instan. Kami beli, restorasi, dan kurasi jaket vintage & streetwear favoritmu.",
    ctaPrimary: "Jual Jaketmu",
    ctaSecondary: "Lihat Drop Terbaru",
    stat1: "1.000+ Jaket Terjual",
    stat2: "Penawaran 24 Jam",
    stat3: "100% Produk Original",
  },
  how: {
    eyebrow: "Cara Kerja Repick",
    title: "Jual Jaket Bekasmu dengan Mudah",
    sub: "Dari lemari ke pembayaran hanya dalam tiga langkah — tanpa tawar-menawar, tanpa biaya tersembunyi, tanpa nunggu berminggu-minggu.",
    steps: [
      {
        num: "01",
        title: "Foto & Kirim",
        text: "Foto 3 bagian jaketmu (depan, belakang, tag) lalu kirim via form web atau Instagram DM.",
      },
      {
        num: "02",
        title: "Dapatkan Penawaran",
        text: "Tim kami akan mengecek merek, kondisi, dan kelangkaan untuk memberikan harga penawaran terbaik dalam hitungan jam.",
      },
      {
        num: "03",
        title: "Jemput / Kirim & Payout",
        text: "Kirim jaketmu ke tempat kami. Setelah diverifikasi, uang langsung cair ke rekeningmu.",
      },
    ],
    cta: "Dapatkan Penawaran Instan",
  },
  categories: [
    { id: "all", label: "Semua Drop" },
    { id: "hoodies", label: "Zip Hoodie" },
    { id: "tracktops", label: "Tracktop" },
    { id: "windbreakers", label: "Windbreaker" },
  ],
  products: {
    1: {
      title: "Vintage Racing Windbreaker",
      meta: "Racing windbreaker vintage · shell anti-air · size L",
    },
    2: {
      title: "Oversized Heavyweight Denim Jacket",
      meta: "Denim tebal oversized · stonewash · size XL",
    },
    3: {
      title: "Classic Corduroy Work Jacket",
      meta: "Jaket kerja korduroi · detail patch · size M",
    },
    4: {
      title: "Streetwear Fleece Outerwear",
      meta: "Fleece streetwear heavy · hoodie · size L",
    },
  },
  drops: {
    eyebrow: "The Inventory",
    title: "Katalog & Hasil Kurasi Terbaru",
    sub: "Contoh kisaran harga beli dan penawaran jaket di Repick.",
    soldOut: "Habis",
    statusLabel: "Status",
    footerLink: "Punya jaket mirip? Dapatkan penawaran dalam hitungan jam",
    quoteCta: "Dapatkan Penawaran Serupa",
    valuationLabel: "Kisaran Harga Beli",
    cashValuation: "Harga Beli",
    lastValuation: "Penawaran Terakhir",
    priceLabel: "Harga",
    otherCategory: "Lainnya",
    showing: (n: number, total: number) => `Menampilkan ${n} dari ${total} drop.`,
    count: (n: number, total: number) => `${n} dari ${total} drop`,
  },
  modal: {
    viewDetails: "Lihat Detail",
    close: "Tutup",
    front: "Depan",
    back: "Belakang",
    gallery: "Galeri foto produk",
    swipeHint: "Geser untuk lihat sisi lain",
    soldNote:
      "Jaket ini sudah laku. Kirim jaketmu dan dapatkan penawaran serupa dalam hitungan jam.",
    cta: "Ingin Jaket Seperti Ini? DM Instagram",
  },
  why: {
    eyebrow: "Kepercayaan & Jaminan",
    title: "Mengapa Jual di Repick?",
    sub: "Kami membangun pengalaman jual-beli seperti yang kami inginkan sendiri — cepat, adil, dan tanpa ribet.",
    features: [
      {
        title: "Harga Fair & Transparan",
        text: "Penilaian sesuai tren vintage dan kualitas bahan.",
      },
      {
        title: "Fashion Ramah Lingkungan",
        text: "Perpanjang masa pakai pakaian dan kurangi limbah fashion.",
      },
      {
        title: "Proses Cepat & Tanpa Ribet",
        text: "Gak perlu nunggu pembeli, kami beli langsung jaketmu.",
      },
      {
        title: "Komunitas Thrifting",
        text: "Dipercaya oleh ribuan pencinta streetwear di Indonesia.",
      },
    ],
  },
  instagram: {
    eyebrow: "@repick_id",
    headlineA: "Ingin penawaran harga lebih cepat?",
    headlineHighlight: "Langsung DM kami",
    headlineB: "sekarang.",
    sub: "Tim kami membalas dalam hitungan menit — kirim foto jaketmu dan dapatkan penawaran tanpa nunggu lama.",
    cta: "Kirim DM Instagram",
  },
  footer: {
    tagline: "“See It. Pick It.” — Jual beli jaket bekas & kurasi drop vintage.",
    links: [
      { label: "Cara Kerja", href: "#how-it-works" },
      { label: "Katalog", href: "#drops" },
      { label: "Kenapa Kami", href: "#why" },
      { label: "Instagram", href: "", external: true },
    ],
    rights: "Hak cipta.",
    location: "Jakarta, Indonesia — Pengiriman ke seluruh dunia",
  },
  ticker: [
    "Kulit Vintage",
    "Flight Bomber",
    "Workwear Carhartt",
    "Denim Langka",
    "Windbreaker 90-an",
    "Ikon Streetwear",
  ],
  dock: {
    home: "Beranda",
    sell: "Jual Jaket",
    drops: "Katalog",
    why: "Kenapa Kami",
    instagram: "Instagram",
    toolbar: "Dock navigasi",
    switchLang: "Ganti bahasa",
  },
  skipLink: "Lewati ke konten",
};

const en: typeof id = {
  hero: {
    badge: "REPICK — PRELOVED JACKET BUYBACK",
    taglineA: "See It.",
    taglineB: "Pick It.",
    sub: "Turn your preloved outerwear into instant cash. We buy, restore, and rehome iconic vintage jackets.",
    ctaPrimary: "Sell Your Jacket",
    ctaSecondary: "Browse Recent Drops",
    stat1: "1,000+ Jackets Rescued",
    stat2: "24-Hour Offers",
    stat3: "100% Authentic",
  },
  how: {
    eyebrow: "The Process",
    title: "Selling Your Jacket is Simple",
    sub: "From pocket to payout in three steps — no haggling, no hidden fees, no waiting weeks for your cash.",
    steps: [
      {
        num: "01",
        title: "Snap & Send",
        text: "Take 3 clear photos of your jacket (front, back, tag) and submit via our web form or Instagram DM.",
      },
      {
        num: "02",
        title: "Get an Instant Valuation",
        text: "Our team reviews the brand, condition, and rarity to give you a fair cash offer within hours.",
      },
      {
        num: "03",
        title: "Fast Pickup & Cash Payout",
        text: "Ship your jacket or schedule a pickup. Once verified, get cash sent directly to your account.",
      },
    ],
    cta: "Get Your Instant Valuation",
  },
  categories: [
    { id: "all", label: "All Drops" },
    { id: "hoodies", label: "Zip Hoodies" },
    { id: "tracktops", label: "Track Tops" },
    { id: "windbreakers", label: "Windbreakers" },
  ],
  products: {
    1: {
      title: "Vintage Racing Windbreaker",
      meta: "Vintage racing windbreaker · water-repellent shell · size L",
    },
    2: {
      title: "Oversized Heavyweight Denim Jacket",
      meta: "Oversized heavyweight denim · stonewash · size XL",
    },
    3: {
      title: "Classic Corduroy Work Jacket",
      meta: "Classic corduroy work jacket · patch details · size M",
    },
    4: {
      title: "Streetwear Fleece Outerwear",
      meta: "Heavy streetwear fleece · hooded · size L",
    },
  },
  drops: {
    eyebrow: "The Inventory",
    title: "Curated Outerwear Drops",
    sub: "Sample buyback ranges — see what Repick pays for your jackets.",
    soldOut: "Sold Out",
    statusLabel: "Status",
    footerLink: "Have a similar piece? Get an offer in hours",
    quoteCta: "Get Similar Quote",
    valuationLabel: "Cash Valuation",
    cashValuation: "Cash Valuation",
    lastValuation: "Last Valuation",
    priceLabel: "Price",
    otherCategory: "Other",
    showing: (n: number, total: number) => `Showing ${n} of ${total} drops.`,
    count: (n: number, total: number) => `${n} of ${total} drops`,
  },
  modal: {
    viewDetails: "View Details",
    close: "Close",
    front: "Front",
    back: "Back",
    gallery: "Product photo gallery",
    swipeHint: "Swipe to see the other side",
    soldNote:
      "This piece has sold. Send us your jacket and get a similar quote within hours.",
    cta: "Want a Jacket Like This? DM Instagram",
  },
  why: {
    eyebrow: "Trust & Guarantee",
    title: "Why Sell to Repick?",
    sub: "We built the buyback experience the way we'd want it ourselves — fast, fair, and fuss-free.",
    features: [
      {
        title: "Top Dollar for Quality",
        text: "Fair market value based on vintage trends, rarity, and condition — priced the way the market really values it.",
      },
      {
        title: "Eco-Friendly Fashion",
        text: "Keep great outerwear in circulation and reduce fashion waste, one rescued jacket at a time.",
      },
      {
        title: "Hassle-Free Logistics",
        text: "We handle shipping costs and offer direct payouts — you never lift a finger beyond the pickup.",
      },
      {
        title: "Curated Community",
        text: "Joined by thousands of thrifters across Indonesia hunting the same racks as you.",
      },
    ],
  },
  instagram: {
    eyebrow: "@repick_id",
    headlineA: "Want a faster quote?",
    headlineHighlight: "Send us a DM",
    headlineB: "right now.",
    sub: "Our team replies within minutes — send photos of your jacket and get a cash offer without the wait.",
    cta: "Message @repick_id",
  },
  footer: {
    tagline: "“See It. Pick It.” — Preloved jacket buyback & curated vintage drops.",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Drops", href: "#drops" },
      { label: "Why Us", href: "#why" },
      { label: "Instagram", href: "", external: true },
    ],
    rights: "All rights reserved.",
    location: "Jakarta, Indonesia — Worldwide shipping",
  },
  ticker: [
    "Vintage Leather",
    "Flight Bombers",
    "Carhartt Workwear",
    "Rare Denim",
    "90s Windbreakers",
    "Streetwear Icons",
  ],
  dock: {
    home: "Home",
    sell: "Sell Jacket",
    drops: "Drops",
    why: "Why Us",
    instagram: "Instagram",
    toolbar: "Application dock",
    switchLang: "Switch language",
  },
  skipLink: "Skip to content",
};

export type Dict = typeof id;

export const dictionaries: Record<Language, Dict> = { id, en };

/* ------------------------------------------------------------------ */
/* Context + hook                                                      */
/* ------------------------------------------------------------------ */

type LanguageContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "repick-lang";

function getInitialLang(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence errors */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "id" ? "en" : "id"),
      t: dictionaries[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Localized helpers for data-driven content                           */
/* ------------------------------------------------------------------ */

/** Localized category chips — pairs stable ids with the active dictionary's labels. */
export function getCategories(t: Dict): { id: CategoryId; label: string }[] {
  return categoryData.map((c) => {
    const cat = t.categories.find((x) => x.id === c.id);
    return { id: c.id, label: cat?.label ?? c.id };
  });
}

export function productTitle(productId: string | number, t: Dict = dictionaries.id): string {
  const key = Number(productId);
  const entry = Number.isFinite(key)
    ? (t.products as Record<number, { title: string }>)[key]
    : undefined;
  return entry?.title ?? (typeof productId === "string" ? productId : `Product ${productId}`);
}

export function productMeta(productId: string | number, t: Dict = dictionaries.id): string {
  const key = Number(productId);
  const entry = Number.isFinite(key)
    ? (t.products as Record<number, { meta: string }>)[key]
    : undefined;
  return entry?.meta ?? "";
}

export function categoryLabel(categoryId: ProductCategory, t: Dict): string {
  if (categoryId === "other") return t.drops.otherCategory;
  return t.categories.find((c) => c.id === categoryId)?.label ?? categoryId;
}

/* Re-export product data so consumers import from one place. */
export { productData as products };

export type { CategoryId, Product, ProductBadge, ProductCategory } from "@/data/products";
