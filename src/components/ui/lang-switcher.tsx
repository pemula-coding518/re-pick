import { useLanguage } from "@/lib/i18n";

export function LangSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.dock.switchLang}
      className={`relative flex min-h-11 items-center gap-0.5 self-center rounded-full border border-chiffon/20 bg-neutral-900/60 p-1 backdrop-blur-md ${className ?? ""}`}
    >
      {(["id", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`relative z-10 inline-flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${
              active ? "text-onyx" : "text-chiffon/60 hover:text-chiffon"
            }`}
          >
            {active && (
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#FF7A5C] to-milano shadow-[0_2px_10px_rgba(169,14,2,0.5)]"
              />
            )}
            {code}
          </button>
        );
      })}
    </div>
  );
}
