import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";
import { bridalStyles } from "@/lib/content";
import { photos } from "@/lib/photos";

export function BridalShowcase() {
  return (
    <section aria-labelledby="bridal-heading" className="relative overflow-hidden bg-sand py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-10 h-[40rem] w-[40rem] rounded-full border border-gold/25"
      />
      <div className="container-luxe relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative mx-auto w-full max-w-lg pb-16 lg:max-w-none lg:pb-24">
          <div className="frame-gold relative aspect-[4/5] w-[82%] overflow-hidden bg-beige">
            <Image
              src={photos.maangTikka.src}
              alt={photos.maangTikka.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 75vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[48%]">
            <div className="frame-gold relative aspect-[4/5] overflow-hidden border-[6px] border-sand bg-beige shadow-[0_30px_60px_-30px_rgba(48,38,31,0.7)]">
              <Image
                src={photos.redJewellery.src}
                alt={photos.redJewellery.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">The bridal experience</p>
          <h2 id="bridal-heading" className="mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem] lg:text-[3.1rem]">
            Your wedding day.
            <br />
            <span className="italic text-gold-deep">Your unforgettable glow.</span>
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-6 text-[1.03rem] leading-[1.85] text-muted">
            Every bride has a unique vision. We work with you to understand your preferences, wedding attire,
            ceremony, and desired look to create a personalised bridal beauty experience.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {bridalStyles.map((s) => (
              <li key={s} className="flex gap-3 text-[0.95rem] leading-snug text-brown">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-deep" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/book-appointment?service=Bridal%20Makeup" className="btn btn-gold">
              Plan Your Bridal Look <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/makeup/bridal-makeup" className="link-gold">
              Bridal makeup details
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            Dates and artist availability are confirmed by our team after you enquire.
          </p>
        </div>
      </div>
    </section>
  );
}
