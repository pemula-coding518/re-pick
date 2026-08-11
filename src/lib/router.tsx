import { useEffect, useState } from "react";

/**
 * Minimal client-side router for a Vite SPA. The landing page has no routes
 * (hash anchors only), but the admin panel lives at real paths (/admin/login,
 * /admin/dashboard) so it can be deep-linked and rewritten by vercel.json.
 */

/** Current `window.location.pathname`, kept in sync with back/forward. */
export function usePath(): string {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onLocation = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onLocation);
    return () => window.removeEventListener("popstate", onLocation);
  }, []);
  return path;
}

/** Imperative navigation — pushes a history entry and scrolls to the top. */
export function navigate(to: string) {
  if (window.location.pathname === to) {
    window.scrollTo({ top: 0 });
    return;
  }
  window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0 });
}

/** Renders nothing and redirects once mounted. */
export function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to);
  }, [to]);
  return null;
}
