import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { additionalMakeupServices, services } from "@/lib/content";
import { photos } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Makeup Services in Hyderabad",
  description:
    "Bridal, HD, airbrush, engagement, party and high-fashion makeup by INJ Makeup Studio in Banjara Hills, Hyderabad. Explore our services and enquire for availability.",
  path: "/makeup",
});

export default function MakeupPage() {
  return (
    <>
      <PageHero
        eyebrow="Makeup services"
        title={
          <>
            Your perfect look <span className="italic text-gold-deep">starts here</span>
          </>
        }
        intro={
          <>
            <p>
              Whether you want to look great for a party, feel radiant at your engagement, or walk into your wedding
              feeling like yourself at your most beautiful — we’re here for you.
            </p>
            <p className="mt-4">
              Our artists use top-quality, branded products and stay up to date with the latest techniques, so every
              look is customised with precision and care, from subtle elegance to bold glam.
            </p>
          </>
        }
        crumbs={[{ name: "Makeup Services", href: "/makeup" }]}
        photo={photos.redJewellery}
        focus="center 20%"
      />

      <section aria-labelledby="all-services" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading id="all-services" eyebrow="Our services" title="Choose your experience" />
          <ul className="mt-14 space-y-6">
            {services.map((s, i) => (
              <li key={s.slug} data-reveal>
                <article className={`grid items-center gap-8 border-b border-gold/25 pb-10 md:grid-cols-[0.75fr_1.25fr] md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <Link href={`/makeup/${s.slug}`} tabIndex={-1} aria-hidden="true" className="frame-gold img-zoom card-hover-lift relative block aspect-[4/3] overflow-hidden bg-beige md:aspect-[5/4]">
                    <Image
                      src={photos[s.photo].src}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 36vw, 92vw"
                      className="object-cover object-[50%_25%]"
                    />
                  </Link>
                  <div>
                    <p className="font-display text-lg italic text-gold-text">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-1 text-[2rem] leading-tight text-ink md:text-[2.4rem]">
                      <Link href={`/makeup/${s.slug}`} className="hover:text-gold-text">
                        {s.name}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-xl text-[1.03rem] leading-relaxed text-muted">{s.short}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                      <Link href={`/makeup/${s.slug}`} className="btn btn-outline">
                        Learn More<span className="sr-only"> about {s.name}</span>
                      </Link>
                      <Link href={`/book-appointment?service=${encodeURIComponent(s.bookingValue)}`} className="link-gold">
                        Book this service<span className="sr-only">: {s.name}</span> <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div data-reveal className="card-hover-lift mt-14 grid gap-6 border border-gold/35 bg-cream p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            {additionalMakeupServices.map((a) => (
              <div key={a.name}>
                <h2 className="text-[1.7rem] text-ink">{a.name}</h2>
                <p className="mt-2 text-muted">{a.text}</p>
              </div>
            ))}
            <Link href="/book-appointment?service=Basic%20Makeup" className="btn btn-gold">
              Enquire
            </Link>
          </div>
        </div>
      </section>

      <ProcessSteps />
      <CTASection />
    </>
  );
}
