import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { portfolioItems, TransformationsSection } from "@/components/home/PortfolioSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { Ornament } from "@/components/shared/Ornament";
import { InstagramIcon } from "@/components/shared/BrandIcons";
import { galleryCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Bridal Makeup Gallery",
  description:
    "Browse bridal, reception, editorial and hairstyling work by INJ Makeup Studio, Hyderabad. Filter the portfolio and view every look in full screen.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="bg-cream pb-6 pt-12 md:pt-16">
        <div data-reveal className="container-luxe text-center">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ name: "Bridal Gallery", href: "/gallery" }]} />
          </div>
          <p className="eyebrow mt-8">Portfolio</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            A collection of <span className="italic text-gold-deep">beautiful moments</span>
          </h1>
          <Ornament className="mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            Bridal, reception, editorial and hairstyling work by the INJ team. Use the filters to browse, and select
            any photograph to view it in full screen.
          </p>
        </div>
      </section>

      <section aria-label="Portfolio" className="bg-cream pb-20 pt-8 md:pb-28">
        <div className="container-luxe">
          <PortfolioGrid items={portfolioItems()} categories={galleryCategories} label="portfolio" />
          <p className="mt-12 text-center text-sm text-muted">
            See our latest work on{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-ink transition-transform hover:scale-105">
              <span className="social-btn social-btn-instagram grid h-6 w-6 place-items-center rounded-md">
                <InstagramIcon size={14} />
              </span>
              <span className="text-gold-text underline underline-offset-4">Instagram</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      <TransformationsSection />
      <CTASection />
    </>
  );
}
