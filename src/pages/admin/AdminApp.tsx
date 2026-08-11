import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Redirect, usePath } from "@/lib/router";
import { AdminLayout } from "./admin-ui";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

function SetupNotice() {
  return (
    <AdminLayout>
      <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-chiffon/15 bg-white/[0.04] p-8">
        <h1 className="font-display text-2xl uppercase tracking-tight">
          Supabase belum dikonfigurasi
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-chiffon/70">
          Isi <Code>NEXT_PUBLIC_SUPABASE_URL</Code> dan <Code>NEXT_PUBLIC_SUPABASE_ANON_KEY</Code>{" "}
          di file <Code>.env</Code> (lihat <Code>.env.example</Code>), lalu jalankan{" "}
          <Code>supabase/schema.sql</Code> di SQL Editor dan buat akun admin di Authentication →
          Users.
        </p>
      </div>
    </AdminLayout>
  );
}

function Code({ children }: { children: string }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-chiffon/90">
      {children}
    </code>
  );
}

/** Route shell for everything under /admin. Guards /admin/dashboard behind a
 *  Supabase Auth session and redirects between login and dashboard. */
export function AdminApp() {
  const path = usePath();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <SetupNotice />;

  if (session === undefined) {
    return (
      <AdminLayout>
        <p className="py-16 text-center text-sm text-chiffon/50">Memeriksa sesi…</p>
      </AdminLayout>
    );
  }

  if (path === "/admin/login") {
    return session ? <Redirect to="/admin/dashboard" /> : <AdminLogin />;
  }
  if (path.startsWith("/admin/dashboard")) {
    return session ? <AdminDashboard /> : <Redirect to="/admin/login" />;
  }
  // "/admin" and anything else under /admin
  return <Redirect to={session ? "/admin/dashboard" : "/admin/login"} />;
}
