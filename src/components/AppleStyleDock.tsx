import { Home, Instagram, Package, ShieldCheck, Sparkles } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { LangSwitcher } from "@/components/ui/lang-switcher";
import { IG_URL, scrollToId, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/lib/i18n";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

/** Section ids tracked by the scroll spy, in page order. */
const SECTIONS = ["top", "how-it-works", "drops", "why", "instagram"] as const;

type SectionId = (typeof SECTIONS)[number];

export function AppleStyleDock() {
  const { t } = useLanguage();
  const activeSection = useScrollSpy([...SECTIONS]);

  const dockItems: {
    title: string;
    icon: typeof Home;
    section: SectionId;
    action?: () => void;
    href?: string;
  }[] = [
    {
      title: t.dock.home,
      icon: Home,
      section: "top",
      action: scrollToTop,
    },
    {
      title: t.dock.sell,
      icon: Package,
      section: "how-it-works",
      action: () => scrollToId("how-it-works"),
    },
    {
      title: t.dock.drops,
      icon: Sparkles,
      section: "drops",
      action: () => scrollToId("drops"),
    },
    {
      title: t.dock.why,
      icon: ShieldCheck,
      section: "why",
      action: () => scrollToId("why"),
    },
    {
      title: t.dock.instagram,
      icon: Instagram,
      section: "instagram",
      href: IG_URL,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 max-w-full -translate-x-1/2 px-3">
      <Dock
        aria-label={t.dock.toolbar}
        className="items-end gap-3 border border-chiffon/20 bg-neutral-900/80 px-3 pb-3 shadow-[0_12px_48px_rgba(0,0,0,0.6)] backdrop-blur-md sm:gap-3 [@media(max-width:380px)]:gap-2 [@media(max-width:380px)]:px-2.5"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.section;
          return (
            <DockItem
              key={item.title}
              aria-label={item.title}
              active={active}
              className="group aspect-square rounded-full bg-neutral-800/90 ring-1 ring-white/5 transition-colors hover:bg-neutral-700/90 hover:ring-chiffon/40"
              onClick={"action" in item ? item.action : undefined}
              href={"href" in item ? item.href : undefined}
            >
              <DockLabel className="border-chiffon/10 bg-onyx text-chiffon/90 shadow-lg">
                {item.title}
              </DockLabel>
              <DockIcon>
                <Icon
                  className={cn(
                    "h-full w-full transition-colors group-hover:text-chiffon",
                    active ? "text-ember drop-shadow-[0_0_8px_rgba(255,106,80,0.8)]" : "text-chiffon/85"
                  )}
                />
              </DockIcon>
            </DockItem>
          );
        })}
        <LangSwitcher />
      </Dock>
    </div>
  );
}
