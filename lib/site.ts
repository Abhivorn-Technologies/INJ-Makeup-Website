/**
 * Central business details. Every value here was taken from the existing
 * injmakeup.com website (October 2026). Confirm with the owner before launch —
 * see CONTENT-CHECKLIST.md.
 */

export const site = {
  name: "INJ Makeup Studio & Academy",
  shortName: "INJ Makeup",
  founder: "Nazneen Hussain",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://injmakeup.com").replace(/\/$/, ""),
  description:
    "Bridal, HD, airbrush, engagement and party makeup, bridal hairstyling and saree draping in Banjara Hills, Hyderabad — plus professional makeup training at the INJ Academy.",
  phones: [
    { display: "+91 90304 97272", tel: "+919030497272" },
    { display: "+91 76598 49937", tel: "+917659849937" },
  ],
  whatsapp: {
    number: "919030497272",
    display: "+91 90304 97272",
  },
  email: "injmakeupstudio@gmail.com",
  address: {
    lines: [
      "6-3-200/B/6, Banjara Hills Road No. 1",
      "3rd Floor, Suite A, beside Karachi Bakery",
      "Hyderabad, Telangana 500034",
    ],
    street: "6-3-200/B/6, Banjara Hills Road No. 1, 3rd Floor, Suite A, beside Karachi Bakery",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500034",
    country: "IN",
  },
  hours: {
    display: "Monday to Sunday, 11:00 AM – 8:00 PM",
    schema: "Mo-Su 11:00-20:00",
  },
  parking: "Parking available for 3 cars",
  social: {
    instagram: "https://www.instagram.com/injmakeup/",
    facebook: "https://www.facebook.com/people/INJ-Makeup-Studio/61576755473314/",
    pinterest: "https://in.pinterest.com/injmakeupstudio/",
    youtube: "https://www.youtube.com/@injmakeupstudio5142",
  },
} as const;

export const mapsQuery = encodeURIComponent(
  "INJ Makeup Studio, 6-3-200/B/6, Banjara Hills Road No. 1, beside Karachi Bakery, Hyderabad 500034",
);
export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export function whatsappUrl(message?: string) {
  const text =
    message ??
    "Hello INJ Makeup Studio, I would like to enquire about a makeup appointment.";
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Makeup Services", href: "/makeup" },
  { label: "Hair & Styling", href: "/hair-styling" },
  { label: "Makeup Academy", href: "/academy" },
  { label: "Bridal Gallery", href: "/gallery" },
  { label: "Beauty Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
