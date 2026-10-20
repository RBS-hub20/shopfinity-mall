import Image from "next/image";
import {
  BadgeCheck,
  Facebook,
  Instagram,
  Music2,
  Percent,
  Star,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { FOOTER_TRUST, SOCIALS } from "@/lib/content";
import { USD_TO_PHP } from "@/lib/currency";

const TRUST_ICONS = { BadgeCheck, Users, Star, Percent } as const;
const SOCIAL_ICONS = { Facebook, Instagram, Twitter, Youtube, Music2 } as const;

export function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="container-x py-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:items-center">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {FOOTER_TRUST.map((item) => {
              const Icon = TRUST_ICONS[item.icon as keyof typeof TRUST_ICONS];
              return (
                <div key={item.title} className="flex items-start gap-2.5">
                  <Icon size={19} className="mt-0.5 shrink-0 text-brand-red" strokeWidth={1.8} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold leading-tight">{item.title}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-brand-gray">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:justify-end">
            <span className="text-[12px] font-semibold">Follow us</span>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <span
                    key={s.name}
                    aria-label={s.name}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white transition hover:bg-brand-redDark"
                  >
                    <Icon size={14} />
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-transparent.png"
              alt="Shopfinity"
              width={120}
              height={120}
              className="h-8 w-8 object-contain"
            />
            <span className="leading-none">
              <span className="block font-display text-sm font-extrabold text-brand-red">
                Shopfinity
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-gray">
                Endless Finds. One Shop
              </span>
            </span>
          </div>
          <p className="text-center text-[11px] text-brand-gray">
            Demo store for portfolio purposes. Prices converted at 1 USD = {USD_TO_PHP} PHP.
          </p>
          <p className="text-[11px] text-brand-gray">
            © {new Date().getFullYear()} Shopfinity
          </p>
        </div>
      </div>
    </footer>
  );
}
