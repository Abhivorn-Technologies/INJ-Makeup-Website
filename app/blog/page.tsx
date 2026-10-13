import Link from "next/link";

import { JournalList } from "@/components/blog/JournalList";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Ornament } from "@/components/shared/Ornament";
import { InstagramIcon } from "@/components/shared/BrandIcons";
import { journalCategories, publishedArticles, visibleArticles } from "@/lib/journal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Beauty Journal",
  description:
    "Notes on bridal makeup, hairstyling and beauty from INJ Makeup Studio & Academy, Hyderabad.",
  path: "/blog",
});

export default function BlogPage() {
  const list = visibleArticles();
  const hasDrafts = list.length > publishedArticles().length;

  return (
    <>
      <section className="bg-cream pb-8 pt-12 md:pt-16">
        <div className="container-luxe text-center">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ name: "Beauty Journal", href: "/blog" }]} />
          </div>
          <p className="eyebrow mt-8">Beauty journal</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Notes on beauty <span className="italic text-gold-deep">&amp; bridal style</span>
          </h1>
          <Ornament className="mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            Bridal inspiration, styling ideas and guidance on preparing for your makeup appointment.
          </p>
        </div>
      </section>

      <section aria-label="Articles" className="bg-cream pb-20 pt-8 md:pb-28">
        <div className="container-luxe">
          {hasDrafts && (
            <p role="note" className="mx-auto mb-10 max-w-2xl border border-gold/50 bg-ivory p-4 text-center text-sm text-brown">
              Preview mode: draft articles are shown for review only. Drafts are hidden on the live website until they
              are approved and published.
            </p>
          )}
          {list.length > 0 ? (
            <JournalList articles={list} categories={journalCategories} />
          ) : (
            <div className="mx-auto max-w-xl border border-gold/35 bg-ivory p-10 text-center">
              <h2 className="text-[1.9rem] text-ink">New articles are on their way</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Our first journal entries are being prepared. Meanwhile, explore our latest looks in the gallery or on
                Instagram.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/gallery" className="btn btn-outline">
                  View the Gallery
                </Link>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <InstagramIcon size={17} /> Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
