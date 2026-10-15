import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";
import { hairStyles } from "@/lib/content";
import { photos } from "@/lib/photos";

export function HairSection() {
  return (
    <section aria-labelledby="hair-heading" className="bg-cream py-20 md:py-28">
      <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div data-reveal className="lg:order-2 lg:sticky lg:top-40 lg:self-start">
          <div className="grid grid-cols-2 gap-4">
            <div className="frame-gold float-bridal-main relative mt-14 aspect-[3/4] min-h-[220px] overflow-hidden bg-beige sm:min-h-[300px]">
              <Image
                src={photos.hairPearls.src}
                alt={photos.hairPearls.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 26vw, 46vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="frame-gold float-bridal-sub relative aspect-[3/4] min-h-[220px] overflow-hidden bg-beige sm:min-h-[300px]">
              <Image
                src={photos.hairSleekBun.src}
                alt={photos.hairSleekBun.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 26vw, 46vw"
                className="object-cover object-[60%_30%]"
              />
            </div>
          </div>
        </div>

        <div data-reveal className="lg:order-1">
          <p className="eyebrow">Hair &amp; styling</p>
          <h2 id="hair-heading" className="mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem] lg:text-[3.1rem]">
            The perfect finish <span className="italic text-gold-deep">to your look</span>
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-6 text-[1.03rem] leading-[1.85] text-muted">
            The right hairstyle doesn’t just match your makeup — it can take your whole look to the next level. Our
            stylists create Indian and international hairstyles for brides, guests and special occasions, and offer
            saree draping to complete the look.
          </p>
          <ul className="mt-8 divide-y divide-gold/25 border-y border-gold/25">
            {hairStyles.map((h) => (
              <li key={h.title} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <span className="font-display text-xl text-ink">{h.title}</span>
                <span className="text-[0.95rem] leading-relaxed text-muted">{h.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/hair-styling" className="btn btn-outline">
              Explore Hair &amp; Styling <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/saree-draping" className="link-gold self-center">
              Saree draping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
