import { useEffect, useState } from "react";

/**
 * Scroll spy: returns the id of the page section that currently crosses the
 * middle of the viewport (or `null` when no tracked section is in view, e.g.
 * inside the footer).
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const compute = () => {
      const centerY = window.innerHeight / 2;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // The section whose band covers the viewport center wins.
        if (rect.top <= centerY && rect.bottom >= centerY) {
          current = id;
          break;
        }
      }
      // Past the last tracked section (footer area): keep it highlighted so
      // the dock doesn't go dark right before the page ends.
      if (!current) {
        const last = sectionIds[sectionIds.length - 1];
        const lastEl = document.getElementById(last);
        if (lastEl && lastEl.getBoundingClientRect().bottom < centerY) current = last;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    window.addEventListener("load", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      window.removeEventListener("load", compute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}
