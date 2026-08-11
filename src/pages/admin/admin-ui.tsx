import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigate } from "@/lib/router";

/* ------------------------------------------------------------------ */
/* Shared primitives for the admin panel (Indonesian UI, onyx glass)   */
/* ------------------------------------------------------------------ */

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-onyx text-chiffon">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(169,14,2,0.16),transparent_70%)]"
      />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-onyx/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-milano shadow-[0_0_12px_rgba(169,14,2,0.9)]" />
            <span className="font-display text-sm uppercase tracking-[0.25em]">Repick Admin</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-chiffon/60 transition-colors hover:text-chiffon"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Kembali ke situs
          </button>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-chiffon/70">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-chiffon/45">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        "h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-chiffon outline-none transition-colors placeholder:text-chiffon/35 focus:border-chiffon/50",
        className
      )}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={cn(
        "w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-chiffon outline-none transition-colors placeholder:text-chiffon/35 focus:border-chiffon/50",
        className
      )}
    />
  );
}

export function Select(props: InputHTMLAttributes<HTMLSelectElement>) {
  const { className, children, ...rest } = props;
  return (
    <select
      {...rest}
      className={cn(
        "h-11 w-full appearance-none rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-chiffon outline-none transition-colors focus:border-chiffon/50 [&>option]:bg-onyx",
        className
      )}
    >
      {children}
    </select>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
};

export function Btn({
  variant = "primary",
  loading,
  className,
  children,
  disabled,
  ...rest
}: BtnProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-milano text-chiffon shadow-[0_8px_24px_rgba(169,14,2,0.35)] hover:bg-milanoLight",
        variant === "ghost" &&
          "border border-white/15 bg-white/[0.03] text-chiffon/80 hover:border-chiffon/40 hover:text-chiffon",
        variant === "danger" &&
          "border border-milano/60 bg-milano/15 text-ember hover:bg-milano/25",
        className
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

export function Notice({ kind, children }: { kind: "success" | "error"; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        kind === "success"
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          : "border-milano/50 bg-milano/10 text-ember"
      )}
    >
      {children}
    </div>
  );
}

export function StatusPill({ status }: { status: "SOLD OUT" | "AVAILABLE" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
        status === "AVAILABLE"
          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/40"
          : "bg-milano/15 text-ember ring-1 ring-inset ring-milano/40"
      )}
    >
      {status === "AVAILABLE" ? "Tersedia" : "Sold Out"}
    </span>
  );
}

export function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-chiffon/15 bg-neutral-900/95 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.7)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-wide">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-chiffon/70 transition-colors hover:border-chiffon/40 hover:text-chiffon"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  busy,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body: ReactNode;
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Batal"
        onClick={onCancel}
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm rounded-3xl border border-chiffon/15 bg-neutral-900/95 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.7)]"
      >
        <h2 className="font-display text-lg uppercase tracking-wide">{title}</h2>
        <div className="mt-2 text-sm leading-relaxed text-chiffon/65">{body}</div>
        <div className="mt-6 flex justify-end gap-3">
          <Btn variant="ghost" onClick={onCancel}>
            Batal
          </Btn>
          <Btn variant="danger" loading={busy} onClick={onConfirm}>
            {confirmLabel}
          </Btn>
        </div>
      </div>
    </div>
  );
}
