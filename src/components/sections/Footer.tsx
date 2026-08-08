import { useId } from "react";
import { Instagram } from "lucide-react";
import { IG_URL } from "@/lib/scroll";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Drops", href: "#drops" },
  { label: "Why Us", href: "#why" },
  { label: "Instagram", href: IG_URL, external: true },
];

export function Footer() {
  const gradientId = useId();
  return (
    <footer className="border-t border-white/10 bg-onyx px-6 pb-32 pt-14 md:pb-36">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
              className="h-9 w-9 drop-shadow-[0_0_16px_rgba(169,14,2,0.45)]"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#E2230F" />
                  <stop offset="1" stopColor="#8F0C02" />
                </linearGradient>
              </defs>
              <path
                d="M14 5 C 27 2, 42 9, 46 23"
                stroke="#FFFBD4"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                fillRule="evenodd"
                fill={`url(#${gradientId})`}
                d="M14 13 h36 a9 9 0 0 1 9 9 v20 a9 9 0 0 1 -9 9 h-36 a9 9 0 0 1 -9 -9 v-20 a9 9 0 0 1 9 -9 z
                   M46 17 a6 6 0 1 0 0 12 a6 6 0 1 0 0 -12 z"
              />
              <g
                stroke="#FFFBD4"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M26 43 V24" />
                <path d="M29.5 24 a7.5 7.5 0 0 1 7.5 7.5 a7.5 7.5 0 0 1 -7.5 7.5" />
                <path d="M33 36.5 L41 44" />
              </g>
            </svg>
            <span className="font-display text-xl uppercase tracking-[0.2em] text-chiffon">
              Repick<span className="text-milanoLight">.</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm italic leading-relaxed text-chiffon/65">
            “See It. Pick It.” — Preloved jacket buyback &amp; curated vintage
            drops.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-chiffon/60">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-chiffon"
              >
                <Instagram className="h-3.5 w-3.5" />
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-chiffon"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-chiffon/55 md:flex-row">
        <span>© {new Date().getFullYear()} Repick. All rights reserved.</span>
        <span>Jakarta, Indonesia — Worldwide shipping</span>
      </div>
    </footer>
  );
}
