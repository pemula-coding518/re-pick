import { createClient } from "@supabase/supabase-js";
import type {
  Product,
  ProductCategory,
} from "@/data/products";

/* ------------------------------------------------------------------ */
/* Client — created only when credentials are present in .env          */
/* ------------------------------------------------------------------ */

const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

/** True when .env has working Supabase credentials. The site degrades to the
 *  static catalog (src/data/products.ts) when this is false. */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export const STORAGE_BUCKET = "jacket-images";

/* ------------------------------------------------------------------ */
/* Product row shape (public.products)                                 */
/* ------------------------------------------------------------------ */

export type DbProduct = {
  id: string;
  title: string;
  price: string | null;
  status: string | null; // 'SOLD OUT' | 'AVAILABLE'
  image_front: string;
  image_back: string | null;
  description: string | null;
  category: string | null;
  created_at: string;
};

/** Loose mapping so admin-typed categories land on the filter chips. */
const CATEGORY_MAP: Record<string, ProductCategory> = {
  hoodies: "hoodies",
  hoodie: "hoodies",
  zip: "hoodies",
  tracktops: "tracktops",
  tracktop: "tracktops",
  windbreakers: "windbreakers",
  windbreaker: "windbreakers",
};

/** Normalizes a Supabase row into the card/modal Product shape. */
export function toCatalogProduct(row: DbProduct): Product {
  const key = row.category?.trim().toLowerCase() ?? "";
  return {
    id: row.id,
    category: CATEGORY_MAP[key] ?? "other",
    images: { front: row.image_front, back: row.image_back ?? undefined },
    sold: row.status !== "AVAILABLE",
    title: row.title,
    meta: row.description ?? undefined,
    price: row.price ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Storage helpers (admin panel)                                       */
/* ------------------------------------------------------------------ */

function fileExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && /^[a-z0-9]{1,5}$/.test(ext) ? ext : "webp";
}

/** Uploads a photo to `jacket-images/<productId>/<side>.<ext>` and returns
 *  the public URL. Throws with a human-readable message on failure. */
export async function uploadProductImage(
  file: File,
  productId: string,
  side: "front" | "back"
): Promise<string> {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const path = `${productId}/${side}.${fileExt(file.name)}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || "image/webp" });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Removes every file stored under `<productId>/` — used when a product is
 *  deleted so orphaned photos don't accumulate. */
export async function deleteProductImages(productId: string): Promise<void> {
  if (!supabase) return;
  const { data: files, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(productId);
  if (error || !files || files.length === 0) return;
  const paths = files.map((f) => `${productId}/${f.name}`);
  await supabase.storage.from(STORAGE_BUCKET).remove(paths);
}
