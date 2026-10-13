import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/shared/BrandIcons";
import { services } from "@/lib/content";
import { mapsDirectionsUrl, site, whatsappUrl } from "@/lib/site";

const explore = [
  { label: "Our Story", href: "/our-story" },
  { label: "Hair & Styling", href: "/hair-styling" },
  { label: "Saree Draping", href: "/saree-draping" },
  { label: "Makeup Academy", href: "/academy" },
  { label: "Bridal Gallery", href: "/gallery" },
  { label: "Beauty Journal", href: "/blog" },
  { label: "Book an Appointment", href: "/book-appointment" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Pinterest", href: site.social.pinterest, Icon: PinterestIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
];

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream/80">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Image src="/brand/inj-mark.png" alt="" width={256} height={256} className="h-auto w-12" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.18em] text-cream">INJ</span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-gold-light">
                Makeup Studio &amp; Academy
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/70">
            Bridal and occasion makeup, hairstyling and makeup education in Banjara Hills, Hyderabad — founded by{" "}
            {site.founder}.
          </p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-gold-light hover:text-gold-light"
                  aria-label={`${label} (opens in a new tab)`}
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-gold-light">Makeup Services</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link href="/makeup" className="hover:text-gold-light">
                All makeup services
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/makeup/${s.slug}`} className="hover:text-gold-light">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-gold-light">Explore</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-gold-light">Visit &amp; Contact</h2>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold-light">
              <MapPin size={17} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </span>
            </a>
            <div className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-gold-light">
                    {p.display}
                  </a>
                ))}
              </span>
            </div>
            <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-gold-light">
              <Mail size={17} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              {site.email}
            </a>
            <p className="flex gap-3">
              <Clock size={17} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              {site.hours.display}
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:text-gold-light"
            >
              <WhatsAppIcon size={17} className="mt-0.5 shrink-0 text-gold-light" />
              WhatsApp enquiry<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe flex flex-col gap-3 py-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-gold-light">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-gold-light">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" prefetch={false} className="hover:text-gold-light">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
