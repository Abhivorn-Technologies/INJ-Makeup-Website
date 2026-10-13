# Content migration & owner sign-off

Source: the existing injmakeup.com website, reviewed on 13 October 2026.

## Migrated

| Item | Old site | New site | Status |
| --- | --- | --- | --- |
| Logo | `INJ-logo.png` (and client-supplied file) | `public/brand/`, favicon, Open Graph image | Done |
| Photographs | 22 portfolio, service, hair, academy and story photos | `assets/photos/` (optimised, black borders cropped) | Done |
| Home / Our Story copy | Founder, history, philosophy | Home intro, `/our-story` | Rewritten from original text |
| Makeup services | Air Brush, HD, Party, Bridal, High Fashion, Basic | Six service pages + Basic Makeup on `/makeup` | Done |
| Hair page | Hairstyling text | `/hair-styling` | Done |
| Saree draping | Home page service block | `/saree-draping` | Done |
| Makeup School | Course text | `/academy` | Done |
| Testimonials | Arshia Jabeen, Vaishnavi Vaishu, Mounika Pinnamaneni | Homepage | Verbatim (emoji removed) |
| Brands list | MAC, Huda Beauty, NARS, Dior, Fenty Beauty, Urban Decay, Sephora, Morphe, Make Up For Ever | “The artist’s beauty essentials” (names only, no logos) | Done |
| Contact details | Phones, email, address, hours, parking | `lib/site.ts`, footer, contact page, structured data | Done |
| Social links | Instagram, Facebook, Pinterest, YouTube | Footer, gallery | Done |
| Blog | Empty on the old site | Beauty Journal with 8 **draft** articles | Awaiting review |

### Not migrated (intentionally)

- Placeholder text on the old homepage (“Perceived end knowledge certainly day sweetness…”).
- Unverified statistics from Our Story (“Satisfied Clients 1000+”, “Procedures 25+”, “Experience 9”).
- The old footer logo and test images hosted on `emblixtestingserver.com` / `emblixstudentpractice.in`.
- “Exclusive discount” on the beginner course (no current offer details).
- Claims about staff certifications (not verified).

### Redirects

| Old URL | New URL |
| --- | --- |
| `/hair/` | `/hair-styling` (301/308) |
| `/makeup-school/` | `/academy` (301/308) |
| `/our-story/`, `/makeup/`, `/gallery/`, `/blog/`, `/contact/` | Same path without trailing slash |

## Please confirm before launch

**Business details**
- [ ] Phone numbers +91 90304 97272 and +91 76598 49937 are current
- [ ] WhatsApp number is +91 90304 97272
- [ ] Email injmakeupstudio@gmail.com
- [ ] Address: 6-3-200/B/6, Banjara Hills Road No. 1, 3rd Floor, Suite A, beside Karachi Bakery, Hyderabad 500034
- [ ] Hours: Monday–Sunday, 11 AM – 8 PM (also used in Google structured data)
- [ ] Parking for 3 cars
- [ ] Facebook, Instagram (@injmakeup), Pinterest and YouTube profile links are the correct, active accounts
- [ ] Founding year — the old site says both **2016** and **2018**, so the new site does not state a year. Tell us the correct one if you want it shown.

**Services**
- [ ] All six makeup services, Basic Makeup, hairstyling and saree draping are currently offered
- [ ] Wording on each service page (`lib/content.ts`) — especially the HD and airbrush descriptions
- [ ] Group/bridesmaid bookings and on-location (venue) work are offered — the site mentions them as “subject to availability”
- [ ] Brands listed are actually used in the kit

**Academy**
- [ ] Course names, levels and learning topics in `lib/content.ts`
- [ ] Fees, duration, batch dates and certificates are intentionally **not** published — add them only when confirmed

**Photos**
- [ ] Every client shown has agreed to their photos being used on the website
- [ ] Gallery categories (Bridal, Reception & Occasion, Editorial, Hairstyling) are correct for each photo; supply tags if you want Engagement/HD/Airbrush filters
- [ ] Provide an approved portrait of Nazneen Hussain for Our Story (currently shows the logo)
- [ ] Provide approved before/after pairs if you want the “Transformations” section
- [ ] Four photos (red saree, gold saree, floral crown, magenta lehenga) were only available at ~300 px wide on the old site — send higher-resolution originals to improve them

**Journal & legal**
- [ ] Review, edit and approve each draft article, then set its publish date
- [ ] Privacy Policy and Terms reflect how you actually work (deposits, cancellations, photo consent) — have them reviewed by a legal adviser
