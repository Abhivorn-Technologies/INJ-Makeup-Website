import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { photos } from "@/lib/photos";

type Props = {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  whatsappMessage?: string;
};

/** Wide booking banner with bridal photography. */
export function CTASection({
  title = "Let’s create your signature look.",
  text = "Planning your wedding, engagement, or next special occasion? Tell us about your event and let our team help you explore the right beauty experience.",
  primaryLabel = "Book an Appointment",
  primaryHref = "/book-appointment",
  whatsappMessage,
}: Props) {
  return (
    <section aria-labelledby="cta-heading" className="bg-ivory py-16 md:py-24">
      <div className="container-luxe">
        <div style={{ position: "relative" }} className="relative isolate overflow-hidden bg-ink">
          <Image
            src={photos.redDupatta.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="-z-10 object-cover object-[60%_45%] opacity-55"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          <div className="absolute inset-4 -z-10 border border-gold/40 md:inset-6" aria-hidden="true" />
          <div data-reveal className="max-w-2xl px-8 py-14 md:px-16 md:py-20">
            <p className="eyebrow !text-gold-light">Appointments &amp; enquiries</p>
            <h2 id="cta-heading" className="mt-4 text-[2.2rem] leading-[1.08] text-cream md:text-[3.2rem]">
              {title}
            </h2>
            <Ornament className="mt-5" light />
            <p className="mt-5 max-w-xl leading-relaxed text-cream/85">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={primaryHref} className="btn btn-gold">
                {primaryLabel} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <WhatsAppButton variant="light" message={whatsappMessage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
