import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/lib/content";
import { photos } from "@/lib/photos";

/** Six service cards in a staggered editorial grid. */
export function ServiceHighlights() {
  return (
    <section aria-labelledby="services-heading" className="bg-cream py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="services-heading"
          eyebrow="Makeup services"
          title={
            <>
              Your moment. Your beauty.
              <br className="hidden sm:block" /> <span className="italic text-gold-deep">Your signature look.</span>
            </>
          }
          description="From your wedding day to a creative photoshoot, every service begins with understanding you — your features, your outfit and the occasion."
        />

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const photo = photos[s.photo];
            return (
              <li
                key={s.slug}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 110}ms` } as React.CSSProperties}
                className="group flex flex-col"
              >
                <Link
                  href={`/makeup/${s.slug}`}
                  className="frame-gold img-zoom card-hover-lift relative block w-full aspect-[4/5] min-h-[280px] overflow-hidden bg-beige"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover object-center"
                  />
                </Link>
                <div className="flex flex-1 flex-col pt-6">
                  <p className="font-display text-lg italic text-gold-text">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[1.75rem] leading-tight text-ink">
                    <Link href={`/makeup/${s.slug}`} className="hover:text-gold-text">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{s.short}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={`/makeup/${s.slug}`} className="link-gold">
                      Learn more<span className="sr-only"> about {s.name}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/book-appointment?service=${encodeURIComponent(s.bookingValue)}`}
                      className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold/60 underline-offset-[6px] hover:decoration-ink"
                    >
                      Book this service<span className="sr-only">: {s.name}</span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
