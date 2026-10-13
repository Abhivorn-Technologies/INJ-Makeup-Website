/**
 * Beauty Journal.
 *
 * Articles start as `status: "draft"`. Drafts are visible only in local
 * development (with a "Draft" badge) or when SHOW_DRAFT_ARTICLES=true, and
 * are never listed in production, the sitemap or search results.
 *
 * To publish an article after INJ has reviewed and approved the text:
 *   1. set `status: "published"`
 *   2. set `publishedAt` to the real publication date (YYYY-MM-DD)
 */
import type { PhotoKey } from "@/lib/photos";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Bridal" | "Techniques" | "Hair" | "Guides";
  photo: PhotoKey;
  status: "draft" | "published";
  publishedAt?: string;
  body: ArticleBlock[];
};

export const journalCategories = ["Bridal", "Techniques", "Hair", "Guides"] as const;

export const articles: Article[] = [
  {
    slug: "bridal-makeup-inspiration",
    title: "Finding your bridal makeup inspiration",
    excerpt:
      "How to gather references, read your own style and arrive at a bridal look that still feels like you.",
    category: "Bridal",
    photo: "maangTikka",
    status: "draft",
    body: [
      { type: "p", text: "Most brides begin with a folder of screenshots. That is a wonderful starting point — but the most useful inspiration is the kind that tells your artist why you love a look, not just what it looks like." },
      { type: "h2", text: "Look for patterns in what you save" },
      { type: "p", text: "Scroll through your saved images and notice what repeats. Is it a soft, glowing base? A defined eye? A particular lip colour? These patterns say more about your taste than any single photo." },
      { type: "h2", text: "Start from your outfit and jewellery" },
      { type: "p", text: "Your lehenga, saree or gown and the jewellery you will wear set the palette for the whole look. Bring photos of both to your consultation so colours and intensity can be balanced." },
      { type: "h2", text: "Think about every function" },
      { type: "ul", items: ["Haldi and mehendi often suit fresher, lighter looks.", "Ceremonies may call for a traditional finish.", "Receptions are a chance to try something more glamorous."] },
      { type: "p", text: "Share your references with the INJ team when you enquire. They will help you translate them into a look that complements your features." },
    ],
  },
  {
    slug: "south-indian-bridal-beauty",
    title: "South Indian bridal beauty: a guide to the classic look",
    excerpt:
      "Temple jewellery, silk sarees and fresh jasmine — the elements that shape a traditional South Indian bridal look.",
    category: "Bridal",
    photo: "redSaree",
    status: "draft",
    body: [
      { type: "p", text: "A traditional South Indian bridal look is built around rich silk sarees, temple jewellery and fresh flowers. The makeup is there to frame these elements, not compete with them." },
      { type: "h2", text: "The key elements" },
      { type: "ul", items: ["Defined eyes that hold their own against heavy jewellery", "A complexion that looks radiant in daylight ceremonies", "Brows and lips balanced with the saree colour", "Hair styled to carry jasmine, jada billa or a traditional jada"] },
      { type: "h2", text: "Planning for the ceremony timing" },
      { type: "p", text: "Many ceremonies take place early in the day, so the look needs to suit natural light as well as photography. Mention your muhurtham time when you enquire so the team can plan the schedule." },
      { type: "p", text: "Every family has its own customs. Bring them into the conversation — the look should honour your traditions as much as your style." },
    ],
  },
  {
    slug: "north-indian-bridal-beauty",
    title: "North Indian bridal beauty: bold, regal and personal",
    excerpt:
      "Lehengas, statement jewellery and evening celebrations — what to consider for a North Indian bridal look.",
    category: "Bridal",
    photo: "heroBridal",
    status: "draft",
    body: [
      { type: "p", text: "North Indian bridal looks are often designed for vibrant lehengas, layered jewellery and celebrations that continue late into the evening." },
      { type: "h2", text: "Balancing jewellery and makeup" },
      { type: "p", text: "A maang tikka, passa, nath and choker all draw the eye to the face. The makeup should be planned around them so that the overall look feels balanced rather than busy." },
      { type: "h2", text: "Considering your dupatta" },
      { type: "p", text: "If your dupatta will be draped over your head, it frames your face and changes how light falls on it. Share how you plan to wear it so the hairstyle and draping can be planned together." },
      { type: "ul", items: ["Bring photos of your outfit in daylight", "Decide which jewellery pieces you will wear", "Share the timing of each function"] },
    ],
  },
  {
    slug: "hd-vs-airbrush-makeup",
    title: "HD vs. airbrush makeup: understanding the difference",
    excerpt:
      "Two popular bridal techniques, explained simply — so you can have a better conversation with your artist.",
    category: "Techniques",
    photo: "glitterEye",
    status: "draft",
    body: [
      { type: "p", text: "HD and airbrush are two of the most common questions brides ask about. Both can give beautiful results; the difference lies mainly in how the base is applied." },
      { type: "h2", text: "HD makeup" },
      { type: "p", text: "HD makeup uses finely milled products applied with brushes and sponges. It allows close control over coverage and is designed to look refined in high-resolution photography and video." },
      { type: "h2", text: "Airbrush makeup" },
      { type: "p", text: "Airbrush makeup is sprayed onto the skin as a fine mist using an airbrush system. The thin, buildable layers create an even-looking base that many people find feels light." },
      { type: "h2", text: "Which is right for you?" },
      { type: "p", text: "It depends on your skin, the finish you like and the event itself. Your makeup artist can advise you during a consultation once they have seen your skin and understood your plans." },
    ],
  },
  {
    slug: "choosing-your-wedding-makeup-look",
    title: "Choosing your wedding makeup look",
    excerpt:
      "Soft glam, traditional or statement? A simple way to decide what suits your day.",
    category: "Guides",
    photo: "receptionSoftGlam",
    status: "draft",
    body: [
      { type: "p", text: "There is no single right bridal look. The best choice is the one that suits your features, your outfit and how you want to feel when you look back at your photographs." },
      { type: "h2", text: "Three questions to ask yourself" },
      { type: "ul", items: ["Do I want to look like a polished version of myself, or try something transformative?", "Will my events be in daylight, in the evening, or both?", "Which matters more to me: a traditional finish or a contemporary one?"] },
      { type: "h2", text: "Soft glam" },
      { type: "p", text: "Glowing skin, gentle definition and softer colours. Often chosen by brides who want to feel like themselves." },
      { type: "h2", text: "Traditional" },
      { type: "p", text: "Defined eyes and richer colours that hold their own with heavy jewellery and silk." },
      { type: "h2", text: "Statement" },
      { type: "p", text: "Bolder eyes or lips, often chosen for receptions and evening functions." },
    ],
  },
  {
    slug: "bridal-hairstyling-inspiration",
    title: "Bridal hairstyling inspiration",
    excerpt:
      "From sculpted buns to flower-laden braids — how to choose a hairstyle that completes your bridal look.",
    category: "Hair",
    photo: "hairPearls",
    status: "draft",
    body: [
      { type: "p", text: "The right hairstyle completes your bridal look. It frames your face, carries your accessories and needs to suit the way your dupatta, veil or saree will be worn." },
      { type: "h2", text: "Popular bridal styles" },
      { type: "ul", items: ["Sculpted low buns with pearls or jewelled pins", "Traditional braids with fresh flowers", "Soft waves for receptions", "Textured updos that support a veil or dupatta"] },
      { type: "h2", text: "Think about your accessories" },
      { type: "p", text: "Maang tikkas, matha pattis, passas, veils and fresh flowers all need a secure base. Tell your stylist which pieces you will wear so the style can be built around them." },
      { type: "p", text: "Explore INJ's hair and styling services, or share your references when you enquire." },
    ],
  },
  {
    slug: "preparing-for-a-makeup-consultation",
    title: "How to prepare for your makeup consultation",
    excerpt:
      "What to bring and what to share so your consultation is as useful as possible.",
    category: "Guides",
    photo: "artistAtWork",
    status: "draft",
    body: [
      { type: "p", text: "A consultation is your chance to share your vision and for your artist to understand your features, preferences and plans. A little preparation makes it far more productive." },
      { type: "h2", text: "What to bring" },
      { type: "ul", items: ["Photos of your outfit and jewellery", "Reference looks you love — and any you don't", "Your event dates, timings and venues", "A note of any products you prefer to avoid or skin sensitivities you know of"] },
      { type: "h2", text: "Questions worth asking" },
      { type: "ul", items: ["Which technique would you recommend for my skin and event?", "How will timings work on the day?", "Can hairstyling and draping be arranged as well?"] },
      { type: "p", text: "You can start the conversation with INJ through the booking enquiry form or on WhatsApp." },
    ],
  },
  {
    slug: "makeup-tips-for-special-occasions",
    title: "Makeup tips for special occasions",
    excerpt:
      "Simple ideas for looking polished at receptions, family functions and evening events.",
    category: "Guides",
    photo: "glamGreen",
    status: "draft",
    body: [
      { type: "p", text: "Whether you are a guest at a wedding or attending a family celebration, a little planning helps your makeup suit the occasion." },
      { type: "h2", text: "Plan around your outfit" },
      { type: "p", text: "Let your outfit decide where the emphasis goes. A heavily embellished outfit often pairs well with softer makeup, while a simple outfit can carry a bolder eye or lip." },
      { type: "h2", text: "Consider the lighting" },
      { type: "p", text: "Daytime functions in natural light usually suit lighter, fresher looks. Evening events under artificial light can handle more definition." },
      { type: "h2", text: "Keep a small touch-up kit" },
      { type: "ul", items: ["Your lipstick or gloss", "Blotting papers", "A compact or pressed powder"] },
      { type: "p", text: "For a professional finish, explore INJ's party and occasion makeup." },
    ],
  },
];

export function showDrafts() {
  return process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFT_ARTICLES === "true";
}

export function visibleArticles(): Article[] {
  const list = articles.filter((a) => a.status === "published" || showDrafts());
  return list.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function publishedArticles(): Article[] {
  return articles.filter((a) => a.status === "published" && a.publishedAt);
}

export function getArticle(slug: string) {
  return visibleArticles().find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
