import type { Metadata } from "next";

import { site } from "@/lib/site";

const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "INJ Makeup Studio & Academy — bridal makeup in Hyderabad",
};

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is (homepage) instead of applying the template. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  noIndex,
  publishedTime,
}: MetaInput): Metadata {
  const url = path === "/" ? "/" : path;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: "en_IN",
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function absoluteUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: "INJ Makeup Studio",
    url: site.url,
    logo: absoluteUrl("/brand/LOGO ING.png"),
    image: absoluteUrl("/opengraph-image.jpg"),
    description: site.description,
    founder: { "@type": "Person", name: site.founder },
    telephone: site.phones[0].tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: "Hyderabad" },
    openingHours: site.hours.schema,
    sameAs: Object.values(site.social),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    areaServed: { "@type": "City", name: "Hyderabad" },
    provider: { "@id": `${site.url}/#business` },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
