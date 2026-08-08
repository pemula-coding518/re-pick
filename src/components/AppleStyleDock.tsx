import { Home, Instagram, Package, ShieldCheck, Sparkles } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { IG_URL, scrollToId, scrollToTop } from "@/lib/scroll";

const dockItems = [
  {
    title: "Home",
    icon: Home,
    action: scrollToTop,
  },
  {
    title: "Sell Jacket",
    icon: Package,
    action: () => scrollToId("how-it-works"),
  },
  {
    title: "Drops",
    icon: Sparkles,
    action: () => scrollToId("drops"),
  },
  {
    title: "Why Us",
    icon: ShieldCheck,
    action: () => scrollToId("why"),
  },
  {
    title: "Instagram",
    icon: Instagram,
    href: IG_URL,
  },
];

export function AppleStyleDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 max-w-full -translate-x-1/2 px-3">
      <Dock
        className="items-end gap-3 border border-chiffon/20 bg-neutral-900/80 px-3 pb-3 shadow-[0_12px_48px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <DockItem
              key={item.title}
              aria-label={item.title}
              className="group aspect-square rounded-full bg-neutral-800/90 ring-1 ring-white/5 transition-colors hover:bg-neutral-700/90 hover:ring-chiffon/40"
              onClick={"action" in item ? item.action : undefined}
              href={"href" in item ? item.href : undefined}
            >
              <DockLabel className="border-chiffon/10 bg-onyx text-chiffon/90 shadow-lg">
                {item.title}
              </DockLabel>
              <DockIcon>
                <Icon className="h-full w-full text-chiffon/85 transition-colors group-hover:text-chiffon" />
              </DockIcon>
            </DockItem>
          );
        })}
      </Dock>
    </div>
  );
}
