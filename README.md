# INJ Makeup Studio & Academy — website

Production website for **INJ Makeup Studio & Academy**, Banjara Hills, Hyderabad (injmakeup.com).

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, React Hook Form + Zod, and PostgreSQL for enquiries.

- `DEPLOYMENT.md` — Vercel, database, domain and launch checklist
- `CONTENT-CHECKLIST.md` — content migrated from the old site and what the owner must confirm before launch

---

## Quick start

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Without `DATABASE_URL`, local development stores enquiries in `.data/enquiries.json` so every form can be tested end to end. Production never uses this file store.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types and runs `tsc` |
| `npm run check` | Lint + typecheck + production build |
| `npm run db:migrate` | Creates the `enquiries` table (reads `DATABASE_URL`, also from `.env.local`) |

## Project structure

```
app/                     Routes (one folder per page), API route handlers, sitemap, robots, icons
  api/enquiries          POST endpoint for booking, contact and course forms
  api/admin/*            Admin sign-in/out and enquiry status updates
  admin/                 Password-protected enquiry inbox (noindex)
  makeup/<service>/      Six service pages sharing components/services/ServicePage.tsx
components/
  layout/                Header (sticky, mobile menu) and Footer
  home/                  Homepage sections
  gallery/               PortfolioGrid, Lightbox (native <dialog>), BeforeAfter
  booking/               BookingForm, ContactForm, CourseEnquiryForm, shared form kit
  shared/                SectionHeading, CTASection, PageHero, JsonLd, Breadcrumbs, …
lib/
  site.ts                Business details: phones, email, address, hours, socials, nav
  content.ts             Services, hair, academy courses, testimonials, brands, gallery
  journal.ts             Beauty Journal articles (draft/published workflow)
  photos.ts              Photo library with alt text
  validations.ts         Zod schemas shared by client and server
  seo.ts                 Metadata + JSON-LD helpers
  server/                Enquiry store (Postgres/dev file), admin auth, rate limit, email notify
assets/photos/           Optimised INJ photographs (migrated from injmakeup.com)
public/brand/            INJ logo and mark
db/schema.sql            Database schema
proxy.ts                 Returns a real 404 for unknown/unpublished journal URLs
```

## Editing content

All copy and data live in `lib/` — no component changes are needed for routine updates.

- **Contact details, hours, social links:** `lib/site.ts`
- **Services, FAQs, hair styles, courses, testimonials, brands:** `lib/content.ts`
- **Gallery:** add a photo to `assets/photos/`, import it in `lib/photos.ts` with descriptive alt text, then add it to `galleryItems` in `lib/content.ts` with a category.
- **Before/after transformations:** add approved pairs to `beforeAfterPairs` in `lib/content.ts`; the section appears automatically on the homepage and gallery.

### Beauty Journal

Eight articles are written as **drafts** in `lib/journal.ts`. Drafts appear (with a “Draft” badge) only in `npm run dev` or when `SHOW_DRAFT_ARTICLES=true`. In production they are hidden from the listing, sitemap and search, and their URLs return 404. The homepage journal section stays hidden until at least one article is published.

To publish after INJ has reviewed the text: set `status: "published"` and `publishedAt: "YYYY-MM-DD"` (the real date).

## Enquiries and the admin inbox

1. Forms validate in the browser and again on the server (`lib/validations.ts`).
2. Spam protection: hidden honeypot field, minimum fill time (3 s), and per-IP rate limiting (8 per 10 minutes, per server instance).
3. The enquiry is saved to PostgreSQL and the visitor gets a reference number (e.g. `INJ-3F9A2C`). The success message states clearly that the appointment is **not confirmed** until the team responds.
4. If the database is unavailable, the visitor sees an error with phone/WhatsApp alternatives — a success message is never shown unless the enquiry was saved.
5. Optional email notification via Resend (`RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM`). Email failures are logged and never lose the enquiry.

Staff manage enquiries at **`/admin`** (password from `ADMIN_PASSWORD`; session cookie signed with `ADMIN_SESSION_SECRET`, HttpOnly, SameSite=Strict, 12-hour expiry). The inbox lists booking, contact and course enquiries with filters, click-to-call/WhatsApp links, status (`new → contacted → confirmed → closed / spam`) and internal notes.

The storage layer (`lib/server/enquiry-store.ts`) implements an `EnquiryStore` interface, so it can be pointed at a CRM or separate API later without touching forms or routes.

## SEO

- Unique titles, descriptions and canonical URLs per page (`lib/seo.ts`)
- Open Graph/Twitter image (`app/opengraph-image.jpg`), favicon and Apple icon
- `sitemap.xml` and `robots.txt` generated from content (admin and API disallowed)
- JSON-LD: `BeautySalon` (LocalBusiness), `Service`, `FAQPage`, `BreadcrumbList`, `EducationalOrganization`, and `BlogPosting` for published articles. No ratings, review markup or prices are emitted.
- Legacy URLs redirect permanently: `/hair` → `/hair-styling`, `/makeup-school` → `/academy`

## Accessibility & performance

- Semantic landmarks, skip link, one `h1` per page, visible focus states, keyboard-operable menu (focus trap, Esc), gallery filters and lightbox (native `<dialog>`, arrow keys, swipe)
- Colour contrast checked with axe-core (WCAG 2.1 AA) on all public pages
- `prefers-reduced-motion` disables reveal animations and transitions
- Next/Image with responsive `sizes`, AVIF/WebP and blur placeholders; fonts self-hosted with `next/font/local` (no Google request at runtime)
- Almost every page is statically prerendered

## Licences

Fonts: Cormorant Garamond and Inter, both under the SIL Open Font License 1.1. Icons: Lucide (ISC). Photographs and logo: © INJ Makeup Studio.
