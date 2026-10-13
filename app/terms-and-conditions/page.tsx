import Link from "next/link";

import { LegalPage } from "@/components/shared/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms covering enquiries, appointments and use of the INJ Makeup Studio & Academy website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions" updated="13 October 2026">
      <p>
        These terms apply to your use of this website and to enquiries made through it with {site.name} (“INJ”,
        “we”, “us”). By using the website you agree to them.
      </p>

      <h2>Enquiries are not bookings</h2>
      <p>
        Submitting a booking, contact or course enquiry form — or messaging us on WhatsApp — sends a request only. It
        does not reserve a date, time, artist or course place. An appointment is confirmed only when our team confirms
        it to you directly by phone, WhatsApp or email.
      </p>

      <h2>Availability</h2>
      <p>
        All services, including specific artists, hairstyling, saree draping and on-location work, are subject to
        availability on the requested date and time.
      </p>

      <h2>Pricing, payments and cancellations</h2>
      <p>
        Prices are not published on this website. Pricing, any advance payment, and the rescheduling and cancellation
        terms for your appointment or course will be communicated to you before confirmation. Those confirmed terms
        apply to your booking.
      </p>

      <h2>Your information and preparation</h2>
      <ul>
        <li>Please give accurate details so we can plan your appointment, including event timings and location.</li>
        <li>
          Tell us about any known allergies, skin sensitivities or products you prefer to avoid before your
          appointment.
        </li>
        <li>Results depend on individual features, skin and conditions on the day, and preferences discussed with you.</li>
      </ul>

      <h2>Makeup academy</h2>
      <p>
        Course descriptions on this website are an overview. Course content, schedules, fees and any other terms will
        be confirmed to you at the time of enrolment.
      </p>

      <h2>Photographs and website content</h2>
      <p>
        The photographs, text, logo and design of this website belong to INJ or are used with permission. Please do not
        copy or reuse them without our written consent. Brand names mentioned on this website belong to their
        respective owners; their mention does not imply any affiliation or endorsement.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website links to services such as WhatsApp, Instagram, Facebook, Pinterest, YouTube and Google Maps. We
        are not responsible for their content or practices.
      </p>

      <h2>Liability</h2>
      <p>
        We make reasonable efforts to keep the information on this website accurate and up to date, but it is
        provided for general information. To the extent permitted by law, INJ is not liable for any loss arising from
        use of the website.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle your personal data is explained in our <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in Hyderabad, Telangana, will have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
      </p>
    </LegalPage>
  );
}
