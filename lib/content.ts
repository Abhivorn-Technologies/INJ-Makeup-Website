/**
 * Website copy and structured content, kept separate from presentation.
 * Service names, testimonials, brand list and studio facts come from the
 * existing injmakeup.com website. Items marked `confirm` in comments need the
 * owner's sign-off before launch (see CONTENT-CHECKLIST.md).
 */
import { photos, type PhotoKey } from "@/lib/photos";

/* ------------------------------------------------------------------ */
/* Makeup services                                                     */
/* ------------------------------------------------------------------ */

export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  bookingValue: string; // value used in the booking form's service field
  short: string;
  headline: string;
  intro: string[];
  idealFor: string[];
  highlights: { title: string; text: string }[];
  photo: PhotoKey;
  gallery: PhotoKey[];
  faqs: FAQ[];
  seo: { title: string; description: string };
};

const enquiryFaqs: FAQ[] = [
  {
    q: "How do I check if my date is available?",
    a: "Send an enquiry through the booking form or WhatsApp with your event date, timings and location. Availability is confirmed directly by the INJ team — an enquiry on its own does not reserve a date.",
  },
  {
    q: "How is pricing shared?",
    a: "Pricing depends on the service, the number of looks and people, and the event location. The team will share the details with you once they understand your requirements.",
  },
];

export const services: Service[] = [
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup",
    bookingValue: "Bridal Makeup",
    short:
      "Beautifully personalised bridal looks designed to complement your features, outfit, and wedding celebrations.",
    headline: "Bridal makeup designed around you, your outfit and your celebrations.",
    intro: [
      "INJ Makeup Studio began as a bridal makeup studio in Hyderabad, and bridal work remains at the heart of what we do. Every bride arrives with a different vision — a traditional look that honours family customs, a soft and classy finish, or something more glamorous for the evening.",
      "We start by understanding your ceremony, your attire and jewellery, the lighting you will be photographed in, and the way you like to see yourself. The look is then built to complement your features, skin tone and hairstyle, so that it feels like you on your most photographed day.",
    ],
    idealFor: [
      "Wedding ceremonies and muhurtham",
      "Nikah, walima and reception",
      "Church weddings and white-gown looks",
      "Traditional South Indian and North Indian bridal styling",
      "Bridesmaid and family makeup, on request",
    ],
    highlights: [
      {
        title: "A look for every function",
        text: "Haldi, mehendi, sangeet, wedding and reception looks can each be planned to suit the outfit and the mood of the event.",
      },
      {
        title: "HD and airbrush options",
        text: "Choose the application technique that suits your skin, your preferences and the way your day will be photographed.",
      },
      {
        title: "Hair and draping, coordinated",
        text: "Bridal hairstyling and saree or dupatta draping can be arranged alongside your makeup, subject to availability.",
      },
    ],
    photo: "redLehengaPortrait",
    gallery: ["heroBridal", "maangTikka", "redJewellery", "glitterEye", "whiteVeil", "pinkLehenga"],
    faqs: [
      ...enquiryFaqs,
      {
        q: "Can you do makeup for my bridesmaids and family as well?",
        a: "Yes, group bookings can be discussed. Mention the number of people who need makeup and hair in your enquiry so the team can plan timings and confirm availability.",
      },
      {
        q: "What should I share before the consultation?",
        a: "Photos of your outfit and jewellery, the event timings and venue, and any reference looks you love. It also helps to mention any skin sensitivities or products you prefer to avoid.",
      },
    ],
    seo: {
      title: "Bridal Makeup Artist in Hyderabad",
      description:
        "Personalised bridal makeup in Banjara Hills, Hyderabad — traditional, soft-glam, HD and airbrush bridal looks with coordinated hairstyling and draping. Enquire for availability.",
    },
  },
  {
    slug: "hd-makeup",
    name: "HD Makeup",
    bookingValue: "HD Makeup",
    short:
      "A refined makeup finish designed for a polished appearance in photography and special-event lighting.",
    headline: "A refined, camera-ready finish for photographs and event lighting.",
    intro: [
      "HD makeup uses finely milled products and careful layering to create a smooth, natural-looking finish that holds up under close-up photography, video and bright event lights.",
      "It is a popular choice for brides, engagement ceremonies and receptions where professional photographers and videographers are present. Coverage can be adjusted from light and skin-like to more polished, depending on the look you want.",
    ],
    idealFor: [
      "Weddings and receptions with photo and video coverage",
      "Engagement ceremonies",
      "Pre-wedding shoots",
      "Evening events under strong lighting",
    ],
    highlights: [
      {
        title: "Built for the camera",
        text: "Textures and shades are chosen to look natural in person and in high-resolution photographs.",
      },
      {
        title: "Adjustable coverage",
        text: "From a light, skin-like finish to fuller coverage — discussed with you during the consultation.",
      },
      {
        title: "Matched to your look",
        text: "Eyes, lips and contour are planned around your outfit, jewellery and hairstyle.",
      },
    ],
    photo: "glitterEye",
    gallery: ["glitterEye", "receptionSoftGlam", "nathCloseup", "glamGreen"],
    faqs: [
      ...enquiryFaqs,
      {
        q: "Should I choose HD or airbrush makeup?",
        a: "Both can give a beautiful result. The right choice depends on your skin, the finish you prefer and your event. The INJ team can talk you through the options during your consultation.",
      },
    ],
    seo: {
      title: "HD Makeup in Hyderabad",
      description:
        "HD makeup for weddings, engagements and receptions in Hyderabad — a refined, camera-ready finish for photography and event lighting. Enquire with INJ Makeup Studio.",
    },
  },
  {
    slug: "airbrush-makeup",
    name: "Airbrush Makeup",
    bookingValue: "Airbrush Makeup",
    short:
      "A lightweight application technique for a smooth, even-looking finish tailored to your preferred bridal style.",
    headline: "A lightweight technique for a smooth, even-looking finish.",
    intro: [
      "Airbrush makeup is applied as a fine mist using an airbrush system, rather than by brush or sponge. The thin, buildable layers create an even-looking base that many brides find feels light on the skin.",
      "It works well for bridal looks ranging from soft and luminous to full glam. Whether airbrush is the right technique for you depends on your skin and the finish you want — something we discuss during your consultation.",
    ],
    idealFor: [
      "Brides who prefer a lightweight feel",
      "Long wedding days with multiple functions",
      "Soft-glam and luminous bridal looks",
      "Receptions and evening celebrations",
    ],
    highlights: [
      {
        title: "Fine, buildable layers",
        text: "Coverage is built gradually so the base looks even without appearing heavy.",
      },
      {
        title: "Tailored to your style",
        text: "From dewy and soft to fully defined bridal glam, the technique adapts to the look you choose.",
      },
      {
        title: "Consultation first",
        text: "We look at your skin, outfit and event before recommending airbrush or HD application.",
      },
    ],
    photo: "whiteVeilRinglight",
    gallery: ["whiteVeilRinglight", "pinkSareeBlossoms", "receptionSoftGlam", "whiteGownGarden"],
    faqs: [
      ...enquiryFaqs,
      {
        q: "Is airbrush makeup suitable for everyone?",
        a: "Most people can wear airbrush makeup, but the best technique depends on your skin and preferences. Share any skin concerns in your enquiry and the team will advise you during the consultation.",
      },
    ],
    seo: {
      title: "Airbrush Bridal Makeup in Hyderabad",
      description:
        "Airbrush bridal makeup in Banjara Hills, Hyderabad — a lightweight technique for a smooth, even-looking finish. Book a consultation with INJ Makeup Studio.",
    },
  },
  {
    slug: "engagement-makeup",
    name: "Engagement Makeup",
    bookingValue: "Engagement Makeup",
    short:
      "Elegant and radiant looks for engagement ceremonies, pre-wedding celebrations, and intimate occasions.",
    headline: "Elegant, radiant looks for engagements and pre-wedding celebrations.",
    intro: [
      "Your engagement is often the first big celebration of the wedding journey — and the first time many guests will see you dressed for the occasion. Engagement looks tend to be lighter and fresher than the wedding-day look, while still photographing beautifully.",
      "We plan the makeup and hair around your outfit, jewellery and venue, whether that is an intimate ring ceremony at home or a larger evening function.",
    ],
    idealFor: [
      "Engagement and ring ceremonies",
      "Haldi, mehendi and sangeet",
      "Pre-wedding shoots",
      "Intimate family celebrations",
    ],
    highlights: [
      {
        title: "Fresh and radiant",
        text: "Glowing skin, soft definition and colours chosen to suit your outfit.",
      },
      {
        title: "Planned alongside your wedding look",
        text: "Keep your engagement look distinct from your bridal look while staying true to your style.",
      },
      {
        title: "Hair and draping",
        text: "Coordinated hairstyling and saree draping can be arranged, subject to availability.",
      },
    ],
    photo: "pinkSareeBlossoms",
    gallery: ["pinkSareeBlossoms", "goldSaree", "receptionSoftGlam", "redSaree"],
    faqs: enquiryFaqs,
    seo: {
      title: "Engagement Makeup in Hyderabad",
      description:
        "Engagement and pre-wedding makeup in Hyderabad — elegant, radiant looks for ring ceremonies, haldi, mehendi and sangeet. Enquire with INJ Makeup Studio.",
    },
  },
  {
    slug: "party-makeup",
    name: "Party & Occasion Makeup",
    bookingValue: "Party & Occasion Makeup",
    short:
      "Sophisticated glam for receptions, parties, family celebrations, and special evenings.",
    headline: "Sophisticated glam for receptions, parties and special evenings.",
    intro: [
      "Got a reception, a family celebration or a special night out planned? Our party and occasion makeup is designed to help you look and feel your best — whether you want a soft, polished finish or a bolder evening look.",
      "Party looks are planned around your outfit and the setting, from daytime family functions to evening receptions. Hairstyling and saree draping can be added to complete the look.",
    ],
    idealFor: [
      "Receptions and wedding guests",
      "Family functions and festivals",
      "Birthdays, anniversaries and evening events",
      "Bridesmaids and family of the bride or groom",
    ],
    highlights: [
      {
        title: "Soft to statement",
        text: "From a natural, polished finish to defined eyes and a bold lip.",
      },
      {
        title: "Groups welcome",
        text: "Planning makeup for several people? Share the number in your enquiry so timings can be arranged.",
      },
      {
        title: "Complete the look",
        text: "Add hairstyling or saree draping for a coordinated finish.",
      },
    ],
    photo: "glamGreen",
    gallery: ["glamGreen", "receptionSoftGlam", "goldSaree", "hairSleekBun"],
    faqs: enquiryFaqs,
    seo: {
      title: "Party Makeup Artist in Hyderabad",
      description:
        "Party and occasion makeup in Hyderabad — sophisticated glam for receptions, family celebrations and evening events. Enquire with INJ Makeup Studio, Banjara Hills.",
    },
  },
  {
    slug: "high-fashion",
    name: "High-Fashion & Photoshoot Makeup",
    bookingValue: "High-Fashion & Photoshoot Makeup",
    short:
      "Creative beauty looks for editorial concepts, professional photography, and fashion-focused projects.",
    headline: "Creative beauty looks for editorial, fashion and photoshoot projects.",
    intro: [
      "Beyond bridal work, INJ creates high-fashion and editorial makeup for photographers, designers and creative shoots. These looks allow for more artistic freedom — sculpted colour, graphic eyes, textured details and concept-led styling.",
      "Share your moodboard, wardrobe and lighting plan with us. We will work with you and your team to translate the concept into a look that reads well on camera.",
    ],
    idealFor: [
      "Fashion and editorial shoots",
      "Designer lookbooks and campaigns",
      "Portfolio shoots for models",
      "Creative and concept photography",
    ],
    highlights: [
      {
        title: "Concept-led",
        text: "Looks are developed from your moodboard, styling and creative direction.",
      },
      {
        title: "Made for the lens",
        text: "Colour, texture and contour are planned for the lighting and the final images.",
      },
      {
        title: "Hair included on request",
        text: "Editorial hairstyling can be planned alongside the makeup.",
      },
    ],
    photo: "pinkRuffles",
    gallery: ["pinkRuffles", "floralCrown", "glamGreen", "hairSleekBun"],
    faqs: enquiryFaqs,
    seo: {
      title: "High-Fashion & Photoshoot Makeup in Hyderabad",
      description:
        "Editorial, high-fashion and photoshoot makeup in Hyderabad for photographers, designers and creative projects. Enquire with INJ Makeup Studio.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Other services offered on the existing website (not given their own page). */
export const additionalMakeupServices = [
  {
    name: "Basic Makeup",
    text: "A light, polished everyday look for smaller occasions, meetings and celebrations.",
  },
];

/* ------------------------------------------------------------------ */
/* Bridal experience                                                   */
/* ------------------------------------------------------------------ */

export const bridalStyles = [
  "Traditional South Indian bridal looks",
  "North Indian bridal looks",
  "Soft-glam bridal makeup",
  "HD and airbrush bridal options",
  "Engagement and reception looks",
  "Bridal hairstyling",
  "Saree draping and coordinated finishing, subject to availability",
];

/* ------------------------------------------------------------------ */
/* Hair & styling                                                      */
/* ------------------------------------------------------------------ */

export const hairStyles = [
  {
    title: "Traditional bridal hairstyles",
    text: "Classic buns, braids and jada styles finished with fresh flowers, jada billa or hair jewellery.",
  },
  {
    title: "Contemporary bridal hairstyles",
    text: "Sculpted low buns, soft waves and textured updos for modern brides.",
  },
  {
    title: "Engagement & reception hairstyles",
    text: "Polished styles that suit evening outfits, veils and statement earrings.",
  },
  {
    title: "Party hairstyling",
    text: "Blow-outs, curls and elegant updos for celebrations and special evenings.",
  },
  {
    title: "Saree draping",
    text: "Neat, secure draping for weddings, functions and events.",
  },
  {
    title: "Makeup & hair together",
    text: "Coordinated makeup and hair for a complete, cohesive look, where available.",
  },
];

/* ------------------------------------------------------------------ */
/* Why INJ                                                             */
/* ------------------------------------------------------------------ */

export const whyInj = [
  {
    icon: "MessagesSquare",
    title: "Personalised consultations",
    text: "Every look begins with a conversation about your features, outfit, occasion and preferences.",
  },
  {
    icon: "Brush",
    title: "Experienced makeup professionals",
    text: "A studio built on bridal artistry in Hyderabad, led by founder Nazneen Hussain.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Techniques tailored to your look",
    text: "HD, airbrush or traditional application — chosen to suit your skin and your event.",
  },
  {
    icon: "Gem",
    title: "Professional beauty products",
    text: "High-end, branded makeup selected for the finish each look needs.",
  },
  {
    icon: "ScanEye",
    title: "Attention to detail",
    text: "From brow shape to jewellery placement, the small details are part of the art.",
  },
  {
    icon: "Layers",
    title: "Makeup & styling coordination",
    text: "Makeup, hairstyling and draping planned together so the whole look works as one.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Academy — confirm course names, topics and levels with the owner.    */
/* Fees, durations, certification and batch dates are deliberately     */
/* NOT published until confirmed.                                       */
/* ------------------------------------------------------------------ */

export type Course = {
  name: string;
  level: string;
  overview: string;
  topics: string[];
};

export const courses: Course[] = [
  {
    name: "Beginner Makeup Training",
    level: "Beginners and beauty enthusiasts",
    overview:
      "A guided introduction to makeup for anyone starting out — learn the foundations through demonstration and hands-on practice.",
    topics: ["Tools and hygiene", "Skin preparation", "Base and complexion", "Everyday eyes, brows and lips"],
  },
  {
    name: "Professional Makeup Techniques",
    level: "Aspiring makeup artists",
    overview:
      "Build the skills needed to work on different faces, skin tones and occasions with confidence.",
    topics: ["Colour theory and shade matching", "Contouring and highlighting", "Eye looks", "Party and occasion makeup"],
  },
  {
    name: "Bridal Makeup Techniques",
    level: "Artists ready to specialise",
    overview:
      "Learn how bridal looks are planned and built — from traditional to soft-glam — around outfits, jewellery and long event days.",
    topics: ["Bridal consultation", "Traditional and contemporary looks", "Working with jewellery", "Photography-ready finishes"],
  },
  {
    name: "HD and Airbrush Techniques",
    level: "Working or advanced students",
    overview:
      "Understand the differences between HD and airbrush application and when to use each.",
    topics: ["HD product layering", "Airbrush equipment basics", "Coverage control", "Finishes for camera"],
  },
  {
    name: "Hairstyling Fundamentals",
    level: "Beginners to intermediate",
    overview: "Learn the core techniques behind the hairstyles that complete a makeup look.",
    topics: ["Preparation and sectioning", "Curls and waves", "Buns and updos", "Securing accessories"],
  },
  {
    name: "Advanced Beauty Workshops",
    level: "Experienced artists",
    overview: "Focused sessions on specific looks, trends and techniques, announced from time to time.",
    topics: ["Trend-led looks", "Editorial makeup", "Speed and efficiency", "Portfolio building"],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials — genuine reviews published on injmakeup.com.           */
/* Only names already shown publicly are used. Emoji removed only.      */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    name: "Arshia Jabeen",
    context: "Bridal makeup",
    quote:
      "Thank you so much Nazneen for my bridal makeup. It was damn good. Everybody liked the look. I wanted a soft and classy look for my two events and the makeover was as I requested. You made my big day more beautiful.",
  },
  {
    name: "Vaishnavi Vaishu",
    context: "Wedding events",
    quote:
      "INJ makeup studio & academy by Nazneen made my fairytale moment come true on my wedding events. They made me look so special and I loved the style of makeup they did on me. Nazneen did a really wonderful and professional job — she took care of all my requirements and she was quick at her job.",
  },
  {
    name: "Mounika Pinnamaneni",
    context: "Engagement & wedding",
    quote:
      "Firstly big thank you Nazneen for making me look gorgeous on my big day! Have never seen any other makeup artist who would be super empathetic and work according to the client’s interests. I love the engagement look Nazneen gave me — I felt like a princess throughout. Not only did she make me look elegant and beautiful, she perfectly took care of the bridesmaid makeup too.",
  },
];

/* ------------------------------------------------------------------ */
/* Brands — as listed on the existing website. Plain names only; no     */
/* logos and no implied partnership.                                    */
/* ------------------------------------------------------------------ */

export const brands = [
  "MAC",
  "Huda Beauty",
  "NARS",
  "Dior",
  "Fenty Beauty",
  "Urban Decay",
  "Sephora",
  "Morphe",
  "Make Up For Ever",
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "occasion", label: "Reception & Occasion" },
  { id: "editorial", label: "Editorial" },
  { id: "hair", label: "Hairstyling" },
] as const;

export type GalleryCategory = Exclude<(typeof galleryCategories)[number]["id"], "all">;

export const galleryItems: { photo: PhotoKey; category: GalleryCategory }[] = [
  { photo: "heroBridal", category: "bridal" },
  { photo: "maangTikka", category: "bridal" },
  { photo: "receptionSoftGlam", category: "occasion" },
  { photo: "pinkRuffles", category: "editorial" },
  { photo: "redJewellery", category: "bridal" },
  { photo: "hairPearls", category: "hair" },
  { photo: "glitterEye", category: "bridal" },
  { photo: "whiteVeil", category: "bridal" },
  { photo: "glamGreen", category: "occasion" },
  { photo: "pinkSareeBlossoms", category: "bridal" },
  { photo: "floralCrown", category: "editorial" },
  { photo: "redLehengaPortrait", category: "bridal" },
  { photo: "hairSleekBun", category: "hair" },
  { photo: "whiteGownGarden", category: "bridal" },
  { photo: "nathCloseup", category: "bridal" },
  { photo: "goldSaree", category: "occasion" },
  { photo: "whiteVeilRinglight", category: "bridal" },
  { photo: "redSaree", category: "bridal" },
  { photo: "pinkLehenga", category: "bridal" },
  { photo: "redDupatta", category: "bridal" },
  // Latest Gallery Additions (from assets/GALLERY/)
  { photo: "gallery03_3", category: "occasion" },
  { photo: "gallery0632", category: "bridal" },
  { photo: "gallery0633", category: "bridal" },
  { photo: "gallery1329", category: "editorial" },
  { photo: "gallery1366", category: "editorial" },
  { photo: "gallery6528", category: "bridal" },
  { photo: "gallery6980", category: "occasion" },
  { photo: "gallery7035_1", category: "bridal" },
  { photo: "galleryPhotoOutput3", category: "occasion" },
  { photo: "galleryVai09726", category: "editorial" },
];

/**
 * Before-and-after pairs. Intentionally empty: no approved before/after
 * photographs were available. Add pairs here (with client consent) and the
 * comparison section appears automatically on the homepage and gallery.
 */
export const beforeAfterPairs: {
  before: { src: string; width: number; height: number };
  after: { src: string; width: number; height: number };
  label: string;
}[] = [];

export function photoFor(key: PhotoKey) {
  return photos[key];
}
