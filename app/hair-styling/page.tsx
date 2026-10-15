import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { hairStyles } from "@/lib/content";
import { photos } from "@/lib/photos";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bridal Hairstyling in Hyderabad",
  description:
    "Bridal, engagement, reception and party hairstyling plus saree draping by INJ Makeup Studio in Banjara Hills, Hyderabad. Indian and international hairstyles.",
  path: "/hair-styling",
});

export default function HairStylingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema(
          "Bridal and occasion hairstyling",
          "Indian and international hairstyles for brides, engagements, receptions and parties.",
          "/hair-styling",
        )}
      />
      <PageHero
        eyebrow="Hair & styling"
        title={
          <>
            The perfect finish <span className="italic text-gold-deep">to your look</span>
          </>
        }
        intro={
          <p>
            A great hairstyle completes your look — the right hairdo doesn’t just match your makeup, it can take the
            whole look to the next level.
          </p>
        }
        crumbs={[{ name: "Hair & Styling", href: "/hair-styling" }]}
        photo={photos.hairPearls}
      >
        <Link href="/book-appointment?service=Hairstyling" className="btn btn-gold">
          Book Hairstyling <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <WhatsAppButton message="Hello INJ, I'd like to enquire about hairstyling." />
      </PageHero>

      <section aria-labelledby="hair-intro" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 id="hair-intro" className="text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
              Hair that says something about you
            </h2>
            <div className="mt-6 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
              <p>
                Hair has always been a way to show personality and style. With extensions, colour and accessories,
                your hair can say a lot about who you are.
              </p>
              <p>
                Trends are always changing, and our stylists stay up to date. With professional training and
                experience, they create Indian and international styles to suit any occasion — from traditional
                bridal buns with fresh flowers to soft reception waves.
              </p>
              <p>Get in touch to learn more about our hairstyling services and pricing.</p>
            </div>
          </div>
          <div data-reveal className="frame-gold float-gentle relative aspect-[4/5] overflow-hidden bg-beige lg:aspect-auto">
            <Image
              src={photos.hairSleekBun.src}
              alt={photos.hairSleekBun.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover object-[60%_30%]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="styles-heading" className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading id="styles-heading" eyebrow="Services" title="Hair & styling services" />
          <ul className="mt-14 grid border-l border-t border-gold/25 sm:grid-cols-2 lg:grid-cols-3">
            {hairStyles.map((h, i) => (
              <li key={h.title} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties} className="border-b border-r border-gold/25 p-8 md:p-10">
                <p className="font-display text-lg italic text-gold-text">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[1.55rem] leading-tight text-ink">{h.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{h.text}</p>
                {h.title === "Saree draping" && (
                  <Link href="/saree-draping" className="link-gold mt-5">
                    Saree draping details <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="hair-gallery" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading id="hair-gallery" eyebrow="Portfolio" title="Hairstyles by INJ" />
          <div className="mt-12">
            <PortfolioGrid
              label="hairstyling portfolio"
              categories={[]}
              columnsClass="columns-2 md:columns-4"
              items={(["hairPearls", "hairSleekBun", "pinkLehenga", "goldSaree"] as const).map((k) => ({ ...photos[k], category: "all" }))}
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Complete your look."
        text="Add hairstyling and draping to your makeup appointment, or book them on their own. Tell us about your event and we’ll take it from there."
        primaryLabel="Book Hairstyling"
        primaryHref="/book-appointment?service=Hairstyling"
        whatsappMessage="Hello INJ, I'd like to enquire about hairstyling."
      />
    </>
  );
}
