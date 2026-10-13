import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { FAQList } from "@/components/shared/FAQList";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { photos } from "@/lib/photos";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Saree Draping in Hyderabad",
  description:
    "Elegant saree draping for weddings, engagements and special occasions by INJ Makeup Studio, Banjara Hills, Hyderabad — on its own or with makeup and hair.",
  path: "/saree-draping",
});

const occasions = [
  "Wedding ceremonies and muhurtham",
  "Engagements and receptions",
  "Haldi, mehendi and sangeet",
  "Family functions and festivals",
  "Photoshoots",
];

const faqs = [
  {
    q: "Can I book saree draping on its own?",
    a: "Yes — mention it in your enquiry. Draping can be booked on its own or together with makeup and hairstyling, subject to availability.",
  },
  {
    q: "What should I keep ready?",
    a: "Your saree, blouse and petticoat (and any pleating or shapewear you prefer), plus safety pins and the jewellery you plan to wear. If you’re unsure, ask when the team confirms your appointment.",
  },
  {
    q: "Do you drape for the whole family?",
    a: "Group requests can be discussed. Share how many people need draping in your enquiry so the team can plan timings.",
  },
];

export default function SareeDrapingPage() {
  return (
    <>
      <JsonLd data={serviceSchema("Saree draping", "Saree draping for weddings, events and special occasions.", "/saree-draping")} />
      <PageHero
        eyebrow="Styling"
        title={
          <>
            Saree draping, <span className="italic text-gold-deep">beautifully finished</span>
          </>
        }
        intro={<p>Elegant, secure saree draping for weddings, events and all special occasions.</p>}
        crumbs={[
          { name: "Hair & Styling", href: "/hair-styling" },
          { name: "Saree Draping", href: "/saree-draping" },
        ]}
        photo={photos.pinkSareeBlossoms}
        focus="center 30%"
      >
        <Link href="/book-appointment?service=Saree%20Draping" className="btn btn-gold">
          Enquire About Draping <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <WhatsAppButton message="Hello INJ, I'd like to enquire about saree draping." />
      </PageHero>

      <section aria-labelledby="drape-heading" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div data-reveal>
            <h2 id="drape-heading" className="text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
              The finishing touch to a coordinated look
            </h2>
            <div className="mt-6 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
              <p>
                A well-draped saree changes the way an outfit falls, moves and photographs. Draping can be arranged on
                its own or alongside your makeup and hairstyling, so the whole look is planned together.
              </p>
              <p>
                Tell us about your saree, the occasion and the style of drape you have in mind. Availability for each
                date is confirmed by our team after you enquire.
              </p>
            </div>
            <h3 className="eyebrow mt-10">Popular for</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {occasions.map((o) => (
                <li key={o} className="flex gap-3 text-brown">
                  <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-deep" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="grid grid-cols-2 gap-4">
            <div className="frame-gold relative mt-12 aspect-[3/4] overflow-hidden bg-beige">
              <Image src={photos.goldSaree.src} alt={photos.goldSaree.alt} fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </div>
            <div className="frame-gold relative aspect-[3/4] overflow-hidden bg-beige">
              <Image src={photos.redSaree.src} alt={photos.redSaree.alt} fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="drape-faq" className="bg-cream py-20 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="drape-faq" eyebrow="Questions" title="Saree draping FAQs" align="left" />
          <FAQList faqs={faqs} />
        </div>
      </section>

      <CTASection
        title="Drape it beautifully."
        text="Share your event details and the INJ team will get back to you to confirm availability and timings."
        primaryLabel="Enquire About Draping"
        primaryHref="/book-appointment?service=Saree%20Draping"
        whatsappMessage="Hello INJ, I'd like to enquire about saree draping."
      />
    </>
  );
}
