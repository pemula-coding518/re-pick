import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { DbProduct } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Btn, Field, Notice, Select, TextArea, TextInput } from "./admin-ui";

export type ProductFormInput = {
  title: string;
  price: string;
  status: "SOLD OUT" | "AVAILABLE";
  category: string;
  description: string;
  frontFile: File | null;
  backFile: File | null;
};

type ProductFormProps = {
  initial?: DbProduct;
  submitLabel: string;
  busy?: boolean;
  onSubmit: (input: ProductFormInput) => void | Promise<void>;
};

const CATEGORY_OPTIONS = [
  { value: "", label: "— Tanpa kategori —" },
  { value: "hoodies", label: "Zip Hoodie" },
  { value: "tracktops", label: "Tracktop" },
  { value: "windbreakers", label: "Windbreaker" },
];

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/avif";

function PhotoPicker({
  label,
  required,
  value,
  onChange,
  existing,
}: {
  label: string;
  required?: boolean;
  value: File | null;
  onChange: (f: File | null) => void;
  existing?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const shown = preview ?? existing;

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-chiffon/70">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      <label
        className={cn(
          "group flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed transition-colors",
          shown ? "border-chiffon/25 bg-white/[0.02] p-2" : "border-chiffon/25 bg-white/[0.03] hover:border-chiffon/50"
        )}
      >
        {shown ? (
          <img src={shown} alt="" className="max-h-48 rounded-xl object-contain" />
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-chiffon/40 transition-colors group-hover:text-chiffon/70" aria-hidden />
            <span className="text-xs text-chiffon/50">Klik untuk pilih foto</span>
          </>
        )}
        <input
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-1 text-[11px] text-ember transition-colors hover:text-ember/80"
        >
          Hapus foto
        </button>
      )}
    </div>
  );
}

/** Create + edit form. For edits, existing photos stay unless replaced. */
export function ProductForm({ initial, submitLabel, busy, onSubmit }: ProductFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [status, setStatus] = useState<"SOLD OUT" | "AVAILABLE">(
    initial?.status === "AVAILABLE" ? "AVAILABLE" : "SOLD OUT"
  );
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Judul wajib diisi.");
      return;
    }
    if (!price.trim()) {
      setError("Harga wajib diisi (contoh: Rp 150.000).");
      return;
    }
    if (!frontFile && !initial?.image_front) {
      setError("Foto depan wajib diunggah.");
      return;
    }
    setError(null);
    void onSubmit({
      title: title.trim(),
      price: price.trim(),
      status,
      category,
      description: description.trim(),
      frontFile,
      backFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Judul" required>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="cth: Vintage Racing Windbreaker"
          />
        </Field>
        <Field label="Harga" required hint="Format: Rp 150.000">
          <TextInput
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Rp 150.000"
          />
        </Field>
        <Field label="Status">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as "SOLD OUT" | "AVAILABLE")}
          >
            <option value="SOLD OUT">Sold Out</option>
            <option value="AVAILABLE">Tersedia</option>
          </Select>
        </Field>
        <Field label="Kategori" hint="Digunakan untuk filter di halaman utama.">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Deskripsi / Kondisi">
        <TextArea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="cth: Kondisi 9/10, masih original, size L"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <PhotoPicker label="Foto Depan" required value={frontFile} onChange={setFrontFile} existing={initial?.image_front} />
        <PhotoPicker label="Foto Belakang (opsional)" value={backFile} onChange={setBackFile} existing={initial?.image_back ?? undefined} />
      </div>

      {initial && (frontFile || backFile) && (
        <p className="text-[11px] text-chiffon/45">
          Foto lama akan diganti dengan foto baru yang dipilih.
        </p>
      )}

      {error && <Notice kind="error">{error}</Notice>}

      <Btn type="submit" loading={busy} className="w-full sm:w-auto">
        {submitLabel}
      </Btn>
    </form>
  );
}
