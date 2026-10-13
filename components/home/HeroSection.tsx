import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brush, Crown, Sparkles } from "lucide-react";

import { photos } from "@/lib/photos";

const highlights = [
  { Icon: Sparkles, label: "Personalised beauty experiences" },
  { Icon: Brush, label: "Professional makeup artistry" },
  { Icon: Crown, label: "Bridal & occasion styling" },
];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream">
      {/* soft light + flowing gold line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_40%,#fffdf8_0%,rgba(255,253,248,0)_70%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full text-gold/60"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 170C260 120 420 210 720 150S1180 40 1440 90" stroke="currentColor" strokeWidth="1" />
        <path d="M0 196C300 150 470 226 760 178S1200 80 1440 122" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>

      <div className="container-luxe relative grid items-center gap-12 pb-20 pt-10 md:pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-28 lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">INJ Makeup Studio &amp; Academy</p>
          <h1
            id="hero-heading"
            className="mt-5 text-[3.1rem] uppercase leading-[0.98] tracking-[0.02em] text-ink sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.2rem]"
          >
            Beauty,
            <br />
            elevated
            <br />
            <span className="font-normal normal-case italic text-gold-deep">to art.</span>
          </h1>
          <div className="mt-7 h-px w-24 bg-gold" aria-hidden="true" />
          <p className="mt-7 max-w-[34rem] text-[1.05rem] leading-[1.8] text-muted">
            Discover the art of timeless beauty with personalised bridal makeup, sophisticated party looks, and
            professional hairstyling. Every look is thoughtfully created to celebrate your features, your personality,
            and your special moments.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/book-appointment" className="btn btn-gold">
              Book Your Bridal Look <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/gallery" className="btn btn-outline">
              Explore Our Portfolio
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-3 gap-4 border-t border-gold/30 pt-7 sm:max-w-lg">
            {highlights.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 text-gold-deep">
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.12em] text-brown">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[34rem] lg:order-2 lg:max-w-none lg:pl-10">
          <div className="frame-gold relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-beige shadow-[0_40px_80px_-50px_rgba(48,38,31,0.7)] lg:aspect-[5/6]">
            <Image
              src={photos.heroBridal.src}
              alt={photos.heroBridal.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, (min-width: 640px) 34rem, 92vw"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <div className="absolute -bottom-8 -left-2 w-[38%] sm:-left-8 lg:-left-4">
            <div className="frame-gold relative aspect-square overflow-hidden rounded-full border-[6px] border-cream bg-beige shadow-[0_24px_50px_-28px_rgba(48,38,31,0.8)]">
              <Image
                src={photos.glitterEye.src}
                alt={photos.glitterEye.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 230px, 36vw"
                className="object-cover object-[45%_35%]"
              />
            </div>
          </div>
          <p className="absolute -right-1 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 text-[0.66rem] font-semibold uppercase tracking-[0.4em] text-gold-text lg:block">
            Banjara Hills · Hyderabad
          </p>
        </div>
      </div>
    </section>
  );
}
