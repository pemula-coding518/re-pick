/** Shared helpers for page-wide navigation. */

export const IG_URL =
  "https://www.instagram.com/repick_id?igsh=dWxvbDlxcHM3c2Ry";

/** Deep link straight into the @repick_id Instagram DM thread. */
export const IG_DM_URL = "https://ig.me/m/repick_id";

/** Explicitly smooth scrolls only when the user hasn't asked to reduce motion. */
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/** Smooth-scrolls the document so `id` sits below the sticky/fixed chrome. */
export function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

/** Scrolls back to the top of the page. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}
