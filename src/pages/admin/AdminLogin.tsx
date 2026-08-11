import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { AdminLayout, Btn, Field, Notice, TextInput } from "./admin-ui";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setBusy(false);
  };

  return (
    <AdminLayout>
      <div className="mx-auto mt-8 max-w-md md:mt-16">
        <form
          onSubmit={submit}
          className="rounded-3xl border border-chiffon/15 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <h1 className="font-display text-2xl uppercase tracking-tight">Login Admin</h1>
          <p className="mt-1.5 text-sm text-chiffon/60">
            Masuk untuk mengelola katalog Repick.
          </p>

          <div className="mt-6 grid gap-4">
            <Field label="Email" required>
              <TextInput
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@repick.id"
              />
            </Field>
            <Field label="Password" required>
              <TextInput
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
          </div>

          {error && (
            <div className="mt-4">
              <Notice kind="error">{error}</Notice>
            </div>
          )}

          <Btn type="submit" loading={busy} className="mt-6 w-full">
            Masuk
          </Btn>
        </form>
        <p className="mt-4 text-center text-[11px] text-chiffon/40">
          Akun dibuat di Supabase → Authentication → Users.
        </p>
      </div>
    </AdminLayout>
  );
}
