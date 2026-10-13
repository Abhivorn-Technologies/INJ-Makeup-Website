import Link from "next/link";

import { LegalPage } from "@/components/shared/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How INJ Makeup Studio & Academy collects, uses and protects the personal data you share through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="13 October 2026">
      <p>
        This policy explains how {site.name} (“INJ”, “we”, “us”) handles personal data collected through this website,
        {` ${site.url.replace(/^https?:\/\//, "")}`}. We collect only what we need to respond to your enquiries and
        arrange appointments.
      </p>

      <h2>What we collect</h2>
      <p>When you use our booking, contact or academy enquiry forms, we collect the information you choose to give us:</p>
      <ul>
        <li>your name and mobile number, and your email address if you provide it;</li>
        <li>
          details about your enquiry — for example the service, preferred date and time, event type and location,
          number of people, preferred makeup style, course of interest, experience level and any message you write;
        </li>
        <li>the date and time of your submission.</li>
      </ul>
      <p>
        To protect the forms from abuse, our server briefly processes your IP address to limit repeated submissions.
        It is not stored with your enquiry.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>to reply to your enquiry and discuss your requirements;</li>
        <li>to check availability and arrange, confirm or change appointments and course enrolments;</li>
        <li>to keep a record of our communication with you.</li>
      </ul>
      <p>We do not sell your personal data and we do not use it for advertising.</p>

      <h2>Legal basis and consent</h2>
      <p>
        We process your data on the basis of the consent you give when you submit a form, in line with India’s Digital
        Personal Data Protection Act, 2023. You can withdraw your consent at any time by contacting us; this will not
        affect processing that took place before you withdrew it.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Your enquiry is stored with the service providers that host this website and its database, and — if enabled —
        the email service that notifies our team of new enquiries. These providers process data on our behalf only.
        We may disclose information where required by law.
      </p>
      <p>
        If you contact us through WhatsApp, phone or email, those conversations are also subject to the privacy
        policies of the respective service providers.
      </p>

      <h2>Cookies and third-party content</h2>
      <p>
        This website does not use analytics, advertising or tracking cookies. Fonts are served from our own website.
        The map on our <Link href="/contact">contact page</Link> is provided by Google Maps, which may set its own
        cookies when it loads; see Google’s privacy policy for details. A strictly necessary cookie is used only
        when our staff sign in to manage enquiries.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details only for as long as needed to respond to you, provide our services and maintain
        reasonable business records, after which they are deleted.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us to access, correct, update or erase your personal data, or raise a grievance about how it has
        been handled. Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>. We will respond within a reasonable time.
      </p>

      <h2>Security</h2>
      <p>
        The website is served over HTTPS and enquiries are stored in an access-controlled database. No method of
        transmission or storage is completely secure, but we take reasonable steps to protect your information.
      </p>

      <h2>Children</h2>
      <p>
        Our forms are intended for adults. If you are booking for someone under 18, please submit the enquiry as
        their parent or guardian.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>

      <h2>Contact</h2>
      <p>
        {site.name}
        <br />
        {site.address.lines.join(", ")}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
