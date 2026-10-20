import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/content";

const ICONS = { Truck, ShieldCheck, RotateCcw, Headset } as const;

export function TrustBadges() {
  return (
    <section className="container-x pt-8">
      <div className="card grid grid-cols-2 gap-5 px-5 py-5 sm:px-8 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          return (
            <div key={item.title} className="flex items-start gap-3">
              <Icon size={22} className="mt-0.5 shrink-0 text-brand-red" strokeWidth={1.8} />
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-tight">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-brand-gray">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
