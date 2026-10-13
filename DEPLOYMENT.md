# Deployment guide (Vercel)

## 1. Database (required for enquiries)

Create a PostgreSQL database with any managed provider (for example Neon, Supabase, or Vercel's Postgres marketplace integration). Choose a region close to India (e.g. Mumbai/Singapore) if available.

1. Copy the connection string (with `sslmode=require`).
2. Optionally create the table ahead of time: `DATABASE_URL="…" npm run db:migrate` (the app also creates it on first use).

## 2. Vercel project

1. Push this folder to a private Git repository (GitHub/GitLab/Bitbucket). `.env*` files and `.data/` are ignored.
2. In Vercel: **Add New → Project**, import the repository. Framework preset: Next.js. Build command `next build`, output default.
3. Add environment variables (Production **and** Preview):

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://injmakeup.com` |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes | Long, unique password for `/admin` |
| `ADMIN_SESSION_SECRET` | Yes | ≥ 32 random characters (`openssl rand -base64 48`) |
| `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` | Optional | Email alerts for new enquiries |
| `SHOW_DRAFT_ARTICLES` | Preview only | `true` to review journal drafts on a preview URL |

4. Deploy, then open the preview URL and run the launch checklist below.

## 3. Custom domain (injmakeup.com)

The domain currently points at the old WordPress site. Before switching:

1. Confirm all photos you want to keep are in this project (they are already migrated into `assets/photos/`; originals are in `_legacy-assets/` in the delivery folder).
2. In Vercel → Project → **Settings → Domains**, add `injmakeup.com` and `www.injmakeup.com`. Set `injmakeup.com` as primary and let `www` redirect to it.
3. At your domain registrar/DNS provider, set the records Vercel shows (typically an `A` record for the apex and a `CNAME` for `www`). Lower the TTL a day before to speed up the switch.
4. Vercel issues the HTTPS certificate automatically once DNS resolves. Wait until the domain shows **Valid Configuration**.
5. Keep the WordPress hosting until the new site has been live and checked for a few days.

## 4. Launch checklist

- [ ] Owner has confirmed every item in `CONTENT-CHECKLIST.md`
- [ ] Privacy Policy and Terms reviewed (ideally by a legal adviser)
- [ ] `npm run check` passes (lint, typecheck, production build)
- [ ] All environment variables set in Vercel Production
- [ ] Submit a test booking, contact and course enquiry on the live domain → each shows a reference number and appears in `/admin/enquiries`; delete or mark them `spam` afterwards
- [ ] If email alerts are enabled, the test enquiries arrived in the inbox
- [ ] WhatsApp buttons open a chat with +91 90304 97272 with the pre-filled message
- [ ] `tel:` and `mailto:` links work on a phone
- [ ] `/hair` and `/makeup-school` redirect to the new pages
- [ ] `https://injmakeup.com/sitemap.xml` and `/robots.txt` load
- [ ] Submit the sitemap in Google Search Console; request indexing for the homepage
- [ ] Update the website link on the Google Business Profile, Instagram, Facebook and other listings if needed
- [ ] Run Lighthouse (mobile) on the homepage, a service page and the gallery; record the scores
- [ ] Check the site on a real Android phone and an iPhone

## 5. Operating notes

- **Rate limiting** is in memory per server instance; on Vercel it limits bursts but is not a global guarantee. If spam increases, add a CAPTCHA service such as Cloudflare Turnstile.
- **Backups:** enable automatic backups/point-in-time recovery with your database provider.
- **Admin password rotation:** change `ADMIN_PASSWORD` (and `ADMIN_SESSION_SECRET` to sign everyone out) in Vercel, then redeploy.
- **Content updates:** edit files in `lib/`, commit, and Vercel redeploys automatically.
