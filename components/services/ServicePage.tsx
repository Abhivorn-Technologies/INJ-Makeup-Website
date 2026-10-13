import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";

import { BookingForm } from "@/components/booking/BookingForm";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { CTASection } from "@/components/shared/CTASection";
import { FAQList } from "@/components/shared/FAQList";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { services, type Service } from "@/lib/content";
import { photos } from "@/lib/photos";
import { faqSchema, serviceSchema } from "@/lib/seo";

export function ServicePage({ service, withBookingForm = false }: { service: Service; withBookingForm?: boolean }) {
  const photo = photos[service.photo];
  const path = `/makeup/${service.slug}`;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const bookHref = `/book-appointment?service=${encodeURIComponent(service.bookingValue)}`;

  return (
    <>
      <JsonLd data={[serviceSchema(service.name, service.short, path), faqSchema(service.faqs)]} />
      <PageHero
        eyebrow="Makeup services"
        title={service.name}
        intro={<p>{service.headline}</p>}
        crumbs={[
          { name: "Makeup Services", href: "/makeup" },
          { name: service.name, href: path },
        ]}
        photo={photo}
      >
        <Link href={withBookingForm ? "#book" : bookHref} className="btn btn-gold">
          Book This Service <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <WhatsAppButton message={`Hello INJ, I'd like to enquire about ${service.name}.`} />
      </PageHero>

      <section aria-labelledby="overview-heading" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div data-reveal>
            <h2 id="overview-heading" className="text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
              About {service.name.toLowerCase()}
            </h2>
            <div className="mt-6 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside data-reveal aria-labelledby="ideal-heading" className="border border-gold/35 bg-cream p-8 md:p-10">
            <h2 id="ideal-heading" className="eyebrow">
              Ideal for
            </h2>
            <ul className="mt-5 space-y-3.5">
              {service.idealFor.map((i) => (
                <li key={i} className="flex gap-3 text-brown">
                  <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-deep" />
                  {i}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <ul className="container-luxe mt-16 grid gap-6 md:grid-cols-3">
          {service.highlights.map((h, i) => (
            <li
              key={h.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="border-t border-gold/50 pt-6"
            >
              <h3 className="text-[1.5rem] leading-tight text-ink">{h.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="looks-heading" className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading
            id="looks-heading"
            eyebrow="From our portfolio"
            title="Looks by INJ"
            description="Select a photograph to view it in full."
          />
          <div className="mt-12">
            <PortfolioGrid
              label={`${service.name} portfolio`}
              categories={[]}
              columnsClass="columns-2 md:columns-3 lg:columns-4"
              items={service.gallery.map((k) => ({ ...photos[k], category: "all" }))}
            />
          </div>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="link-gold">
              View the full gallery <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ProcessSteps />

      <section aria-labelledby="faq-heading" className="bg-cream py-20 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="faq-heading" eyebrow="Questions" title="Frequently asked" align="left" />
          <FAQList faqs={service.faqs} />
        </div>
      </section>

      {withBookingForm ? (
        <section id="book" aria-labelledby="book-heading" className="scroll-mt-32 bg-ivory py-20 md:py-24">
          <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                id="book-heading"
                eyebrow="Enquire"
                title="Plan your bridal look"
                align="left"
                description="Tell us about your wedding and the INJ team will be in touch to discuss your look and confirm availability."
              />
              <div className="frame-gold relative mt-10 hidden aspect-[4/5] overflow-hidden bg-beige lg:block">
                <Image
                  src={photos.pinkLehenga.src}
                  alt={photos.pinkLehenga.alt}
                  fill
                  placeholder="blur"
                  sizes="30vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
            <div className="border border-gold/30 bg-white p-6 md:p-10">
              <Suspense fallback={<p className="text-muted">Loading the booking form…</p>}>
                <BookingForm defaultService={service.bookingValue} />
              </Suspense>
            </div>
          </div>
        </section>
      ) : (
        <CTASection
          title={`Book your ${service.name.toLowerCase()}.`}
          text="Share your date, event and preferred look, and the INJ team will get back to you to discuss the details and confirm availability."
          primaryLabel="Book This Service"
          primaryHref={bookHref}
          whatsappMessage={`Hello INJ, I'd like to enquire about ${service.name}.`}
        />
      )}

      <section aria-labelledby="related-heading" className="bg-ivory pb-20 md:pb-24">
        <div className="container-luxe border-t border-gold/30 pt-14">
          <h2 id="related-heading" className="eyebrow text-center">
            Explore more services
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/makeup/${r.slug}`} className="group flex items-center gap-5">
                  <span className="relative block h-24 w-20 shrink-0 overflow-hidden bg-beige">
                    <Image src={photos[r.photo].src} alt="" fill sizes="80px" className="object-cover object-[50%_25%]" />
                  </span>
                  <span>
                    <span className="block font-display text-[1.45rem] leading-tight text-ink group-hover:text-gold-text">
                      {r.name}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gold-text">
                      Learn more <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
