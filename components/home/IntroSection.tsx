import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";
import { photos } from "@/lib/photos";

export function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal className="relative">
          <div className="frame-gold relative aspect-[3/4] overflow-hidden bg-beige">
            <Image
              src={photos.artistAtWork.src}
              alt={photos.artistAtWork.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <div className="absolute -right-4 -top-4 -z-10 h-full w-full border border-gold/40 md:-right-6 md:-top-6" aria-hidden="true" />
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">Our philosophy</p>
          <h2 id="intro-heading" className="mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem] lg:text-[3.1rem]">
            The art of beauty, <span className="italic text-gold-deep">the soul of INJ</span>
          </h2>
          <Ornament className="mt-5" />
          <div className="mt-6 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
            <p>
              At INJ Makeup Studio &amp; Academy, makeup is more than a transformation — it is an expression of
              individuality. We combine artistic precision, thoughtful consultation, and professional techniques to
              create looks that complement your features, style, outfit, and occasion.
            </p>
            <p>
              Founded by Nazneen Hussain as a bridal makeup studio in Hyderabad, INJ has grown to include HD,
              airbrush, party and high-fashion makeup, Indian and international hairstyling, saree draping — and an
              academy for those who want to learn the craft themselves.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-gold/30 py-7 sm:grid-cols-3">
            {[
              ["Bridal & occasion", "Makeup for weddings, engagements, receptions and celebrations"],
              ["Hair & draping", "Hairstyling and saree draping to complete the look"],
              ["Academy", "Guided makeup training for aspiring artists"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-display text-xl text-ink">{t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{d}</dd>
              </div>
            ))}
          </dl>
          <Link href="/our-story" className="link-gold mt-9">
            Discover our story <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
