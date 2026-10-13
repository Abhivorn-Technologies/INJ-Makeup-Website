import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

const suggestions = [
  { label: "Makeup services", href: "/makeup" },
  { label: "Bridal gallery", href: "/gallery" },
  { label: "Book an appointment", href: "/book-appointment" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
      <div className="container-luxe relative text-center">
        <p className="font-display text-[6rem] italic leading-none text-gold-deep md:text-[8rem]">404</p>
        <h1 className="mt-4 text-[2.4rem] text-ink md:text-[3rem]">This page has slipped away</h1>
        <Ornament className="mx-auto mt-5" />
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          The page you’re looking for may have moved as part of our new website. These might help:
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="btn btn-outline">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="link-gold mt-10">
          Return home <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
