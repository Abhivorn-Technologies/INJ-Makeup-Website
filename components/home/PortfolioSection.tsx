import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { beforeAfterPairs, galleryCategories, galleryItems } from "@/lib/content";
import { photos } from "@/lib/photos";

export function portfolioItems() {
  return galleryItems.map((g) => ({ ...photos[g.photo], category: g.category }));
}

/** Shown only when approved before/after photographs have been added. */
export function TransformationsSection() {
  if (beforeAfterPairs.length === 0) return null;
  return (
    <section aria-labelledby="transformations-heading" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading id="transformations-heading" eyebrow="Transformations" title="Every transformation tells a story" />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {beforeAfterPairs.map((p) => (
            <BeforeAfter key={p.label} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  return (
    <section aria-labelledby="portfolio-heading" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="portfolio-heading"
          eyebrow="Featured portfolio"
          title={
            <>
              A collection of <span className="italic text-gold-deep">beautiful moments</span>
            </>
          }
          description="Bridal, reception, editorial and hairstyling work by the INJ team. Select any photograph to view it in full."
        />
        <div className="mt-12">
          <PortfolioGrid items={portfolioItems()} categories={galleryCategories} limit={12} label="portfolio" />
        </div>
        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn btn-outline">
            View Complete Portfolio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
