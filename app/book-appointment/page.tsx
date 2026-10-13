import Image from "next/image";
import { Suspense } from "react";
import { Clock, Phone } from "lucide-react";

import { BookingForm } from "@/components/booking/BookingForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Ornament } from "@/components/shared/Ornament";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { photos } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Book an Appointment",
  description:
    "Request a bridal, engagement, party or HD/airbrush makeup appointment with INJ Makeup Studio, Hyderabad. Share your date and event — our team will confirm availability.",
  path: "/book-appointment",
});

const steps = [
  "Send your enquiry with your date, event and preferred look.",
  "Our team contacts you to discuss details and confirm availability, timings and pricing.",
  "Your appointment is confirmed once you hear back from us.",
];

export default function BookAppointmentPage() {
  return (
    <section className="bg-cream pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="container-luxe">
        <Breadcrumbs items={[{ name: "Book an Appointment", href: "/book-appointment" }]} />
        <div className="mt-8 grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow">Appointments</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.3rem]">
              Let’s create your <span className="italic text-gold-deep">signature look</span>
            </h1>
            <Ornament className="mt-6" />
            <p className="mt-6 leading-relaxed text-muted">
              Planning your wedding, engagement, or next special occasion? Tell us about your event and our team will
              help you explore the right beauty experience.
            </p>

            <h2 className="eyebrow mt-10">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-display text-2xl italic leading-none text-gold-deep">{i + 1}</span>
                  <span className="leading-relaxed text-brown">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-3 border-t border-gold/30 pt-8 text-sm text-brown">
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-gold-deep" aria-hidden="true" />
                Prefer to talk?{" "}
                <a href={`tel:${site.phones[0].tel}`} className="underline underline-offset-4">
                  {site.phones[0].display}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={16} className="text-gold-deep" aria-hidden="true" />
                Studio hours: {site.hours.display}
              </p>
              <div className="pt-3">
                <WhatsAppButton />
              </div>
            </div>

            <div className="frame-gold relative mt-12 hidden aspect-[4/5] overflow-hidden bg-beige lg:block">
              <Image
                src={photos.whiteVeil.src}
                alt={photos.whiteVeil.alt}
                fill
                placeholder="blur"
                sizes="28vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>

          <div className="border border-gold/30 bg-white p-6 md:p-10">
            <Suspense fallback={<p className="text-muted">Loading the booking form…</p>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
