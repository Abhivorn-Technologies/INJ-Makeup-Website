import Link from "next/link";
import { Car, Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/booking/ContactForm";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/shared/BrandIcons";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { Ornament } from "@/components/shared/Ornament";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Visit INJ Makeup Studio at Banjara Hills Road No. 1, beside Karachi Bakery, Hyderabad. Call +91 90304 97272, WhatsApp us, or send an enquiry online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <section className="bg-cream pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="container-luxe">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <div className="mt-8 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.4rem]">
                We’d love to <span className="italic text-gold-deep">hear from you</span>
              </h1>
              <Ornament className="mt-6" />
              <p className="mt-6 max-w-lg leading-relaxed text-muted">
                Feel beautiful, confident and radiant on your big day. Call, WhatsApp or send us a message — or{" "}
                <Link href="/book-appointment" className="text-gold-text underline underline-offset-4">
                  request an appointment
                </Link>{" "}
                with your event details.
              </p>

              <address className="mt-10 space-y-6 not-italic">
                <div className="flex gap-4">
                  <MapPin size={20} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Studio</h2>
                    <p className="mt-1.5 leading-relaxed text-ink">
                      {site.address.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                    <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="link-gold mt-2">
                      Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={20} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Phone</h2>
                    <p className="mt-1.5 flex flex-col gap-1">
                      {site.phones.map((p) => (
                        <a key={p.tel} href={`tel:${p.tel}`} className="text-ink hover:text-gold-text">
                          {p.display}
                        </a>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail size={20} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Email</h2>
                    <a href={`mailto:${site.email}`} className="mt-1.5 block break-all text-ink hover:text-gold-text">
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock size={20} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Studio hours</h2>
                    <p className="mt-1.5 text-ink">{site.hours.display}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Car size={20} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Parking</h2>
                    <p className="mt-1.5 text-ink">{site.parking}</p>
                  </div>
                </div>
              </address>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <WhatsAppButton />
              </div>

              <div className="mt-8 border-t border-gold/30 pt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Follow our work</h2>
                <div className="mt-3 flex items-center gap-3" aria-label="Social media">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn social-btn-instagram grid h-10 w-10 place-items-center rounded-full"
                    aria-label="Instagram (opens in a new tab)"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn social-btn-facebook grid h-10 w-10 place-items-center rounded-full"
                    aria-label="Facebook (opens in a new tab)"
                  >
                    <FacebookIcon size={18} />
                  </a>
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn social-btn-youtube grid h-10 w-10 place-items-center rounded-full"
                    aria-label="YouTube (opens in a new tab)"
                  >
                    <YouTubeIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="card-hover-lift border border-gold/30 bg-white p-6 md:p-10">
              <h2 className="font-display text-[2rem] text-ink">Send us a message</h2>
              <p className="mb-8 mt-2 text-sm text-muted">
                For appointments, the{" "}
                <Link href="/book-appointment" className="text-gold-text underline underline-offset-4">
                  booking enquiry form
                </Link>{" "}
                helps us respond faster.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section data-reveal aria-label="Map" className="bg-ivory">
        <div className="relative h-[420px] w-full border-y border-gold/30 bg-sand">
          <iframe
            title="Map showing INJ Makeup Studio, Banjara Hills, Hyderabad"
            src={mapsEmbedUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
