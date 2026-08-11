import { useCallback, useEffect, useState } from "react";
import {
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  deleteProductImages,
  supabase,
  uploadProductImage,
  type DbProduct,
} from "@/lib/supabase";
import {
  AdminLayout,
  Btn,
  ConfirmDialog,
  ModalShell,
  Notice,
  StatusPill,
} from "./admin-ui";
import { ProductForm, type ProductFormInput } from "./ProductForm";

type NoticeState = { kind: "success" | "error"; text: string } | null;

export function AdminDashboard() {
  const [rows, setRows] = useState<DbProduct[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notice, setNotice] = useState<NoticeState>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [editBusy, setEditBusy] = useState(false);
  const [deleting, setDeleting] = useState<DbProduct | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [createKey, setCreateKey] = useState(0);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoadError(null);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError(error.message);
      setRows([]);
    } else {
      setRows((data ?? []) as DbProduct[]);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreate = async (input: ProductFormInput) => {
    if (!supabase) return;
    setBusy(true);
    try {
      if (!input.frontFile) throw new Error("Foto depan wajib diunggah.");
      const id = crypto.randomUUID();
      const frontUrl = await uploadProductImage(input.frontFile, id, "front");
      const backUrl = input.backFile
        ? await uploadProductImage(input.backFile, id, "back")
        : null;
      const { error } = await supabase.from("products").insert({
        id,
        title: input.title,
        price: input.price,
        status: input.status,
        image_front: frontUrl,
        image_back: backUrl,
        description: input.description || null,
        category: input.category || null,
      });
      if (error) throw error;
      setNotice({ kind: "success", text: "Produk berhasil ditambahkan ke katalog." });
      setCreateKey((k) => k + 1);
      await load();
    } catch (err) {
      setNotice({
        kind: "error",
        text: err instanceof Error ? err.message : "Gagal menambahkan produk.",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = async (input: ProductFormInput) => {
    if (!supabase || !editing) return;
    setEditBusy(true);
    try {
      const updates: Record<string, unknown> = {
        title: input.title,
        price: input.price,
        status: input.status,
        description: input.description || null,
        category: input.category || null,
      };
      if (input.frontFile)
        updates.image_front = await uploadProductImage(input.frontFile, editing.id, "front");
      if (input.backFile)
        updates.image_back = await uploadProductImage(input.backFile, editing.id, "back");
      const { error } = await supabase.from("products").update(updates).eq("id", editing.id);
      if (error) throw error;
      setNotice({ kind: "success", text: "Produk berhasil diperbarui." });
      setEditing(null);
      await load();
    } catch (err) {
      setNotice({
        kind: "error",
        text: err instanceof Error ? err.message : "Gagal memperbarui produk.",
      });
    } finally {
      setEditBusy(false);
    }
  };

  const handleToggle = async (row: DbProduct) => {
    if (!supabase) return;
    const next = row.status === "AVAILABLE" ? "SOLD OUT" : "AVAILABLE";
    const { error } = await supabase
      .from("products")
      .update({ status: next })
      .eq("id", row.id);
    if (error) setNotice({ kind: "error", text: error.message });
    else await load();
  };

  const handleDelete = async () => {
    if (!supabase || !deleting) return;
    setDeleteBusy(true);
    try {
      const { error } = await supabase.from("products").delete().eq("id", deleting.id);
      if (error) throw error;
      await deleteProductImages(deleting.id); // best-effort cleanup
      setNotice({ kind: "success", text: "Produk dihapus." });
      setDeleting(null);
      await load();
    } catch (err) {
      setNotice({
        kind: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus produk.",
      });
    } finally {
      setDeleteBusy(false);
    }
  };

  const logout = async () => {
    await supabase?.auth.signOut();
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight">Kelola Katalog</h1>
          <p className="mt-1 text-sm text-chiffon/60">
            Tambah, edit, dan kelola status jaket di toko.
          </p>
        </div>
        <Btn variant="ghost" onClick={() => void logout()}>
          <LogOut className="h-4 w-4" aria-hidden />
          Keluar
        </Btn>
      </div>

      {notice && (
        <div className="mb-6">
          <Notice kind={notice.kind}>{notice.text}</Notice>
        </div>
      )}

      {/* Create */}
      <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="mb-5 flex items-center gap-2 font-display text-xl uppercase tracking-wide">
          <Plus className="h-5 w-5 text-ember" aria-hidden />
          Tambah Jaket Baru
        </h2>
        <ProductForm
          key={createKey}
          submitLabel="Tambah ke Katalog"
          busy={busy}
          onSubmit={handleCreate}
        />
      </section>

      {/* List */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide">
            Katalog ({rows ? rows.length : "…"})
          </h2>
          <Btn variant="ghost" onClick={() => void load()}>
            <RefreshCw className="h-4 w-4" aria-hidden />
            Muat ulang
          </Btn>
        </div>

        {loadError && <Notice kind="error">Gagal memuat katalog: {loadError}</Notice>}

        {!rows && !loadError && (
          <p className="text-sm text-chiffon/50">Memuat katalog…</p>
        )}

        {rows && rows.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-chiffon/50">
            Belum ada produk. Tambahkan jaket pertama lewat form di atas.
          </div>
        )}

        {rows && rows.length > 0 && (
          <ul className="grid gap-4">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex gap-2">
                  <img
                    src={row.image_front}
                    alt=""
                    loading="lazy"
                    className="h-20 w-16 rounded-lg object-cover"
                  />
                  {row.image_back && (
                    <img
                      src={row.image_back}
                      alt=""
                      loading="lazy"
                      className="h-20 w-16 rounded-lg object-cover opacity-60"
                    />
                  )}
                </div>
                <div className="min-w-44 flex-1">
                  <p className="font-semibold leading-snug">{row.title}</p>
                  <p className="mt-0.5 text-xs text-chiffon/55">
                    {row.price ?? "Tanpa harga"} · {row.category ?? "tanpa kategori"}
                  </p>
                  {row.description && (
                    <p className="mt-0.5 text-[11px] text-chiffon/40">{row.description}</p>
                  )}
                </div>
                <StatusPill status={row.status === "AVAILABLE" ? "AVAILABLE" : "SOLD OUT"} />
                <div className="flex flex-wrap gap-2">
                  <Btn variant="ghost" onClick={() => void handleToggle(row)} title="Ubah status">
                    {row.status === "AVAILABLE" ? (
                      <ToggleRight className="h-4 w-4" aria-hidden />
                    ) : (
                      <ToggleLeft className="h-4 w-4" aria-hidden />
                    )}
                    {row.status === "AVAILABLE" ? "Tandai Habis" : "Tandai Tersedia"}
                  </Btn>
                  <Btn variant="ghost" onClick={() => setEditing(row)}>
                    <Pencil className="h-4 w-4" aria-hidden />
                    Edit
                  </Btn>
                  <Btn variant="danger" onClick={() => setDeleting(row)}>
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Hapus
                  </Btn>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Edit modal */}
      {editing && (
        <ModalShell title="Edit Jaket" onClose={() => setEditing(null)}>
          <ProductForm
            key={editing.id}
            initial={editing}
            submitLabel="Simpan Perubahan"
            busy={editBusy}
            onSubmit={handleEdit}
          />
        </ModalShell>
      )}

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleting !== null}
        title="Hapus Jaket?"
        body={
          <>
            <span className="font-semibold text-chiffon">{deleting?.title ?? ""}</span> beserta
            fotonya akan dihapus permanen.
          </>
        }
        confirmLabel="Hapus"
        busy={deleteBusy}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleting(null)}
      />
    </AdminLayout>
  );
}
