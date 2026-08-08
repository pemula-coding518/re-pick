import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function CategoryTicker() {
  const { t } = useLanguage();
  const tickerItems = t.ticker;

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-10 pr-10">
      {tickerItems.map((label) => (
        <span key={label} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-chiffon/65">
            {label}
          </span>
          <Sparkles className="h-4 w-4 text-milano/80" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group relative overflow-hidden border-y border-chiffon/10 bg-carbon py-5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {row("a")}
        {row("b")}
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-onyx to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-onyx to-transparent"
      />
    </div>
  );
}
