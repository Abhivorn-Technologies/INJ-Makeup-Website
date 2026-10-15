import { SectionHeading } from "@/components/shared/SectionHeading";
import { brands } from "@/lib/content";

export function BrandsSection() {
  return (
    <section aria-labelledby="brands-heading" className="border-y border-gold/25 bg-cream py-16 md:py-20">
      <div className="container-luxe">
        <SectionHeading
          id="brands-heading"
          eyebrow="In our kit"
          title="The artist’s beauty essentials"
          description="High-end, branded makeup chosen for the finish each look needs. Some of the professional brands you’ll find in our kit:"
        />
        <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-4" aria-label="Makeup brands">
          {brands.map((b, i) => (
            <li
              key={b}
              data-reveal
              style={{ "--reveal-delay": `${(i % 5) * 80}ms` } as React.CSSProperties}
              className="flex items-center gap-3"
            >
              <span className="font-display text-[1.45rem] tracking-[0.06em] text-brown md:text-[1.75rem]">{b}</span>
              {i < brands.length - 1 && (
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 border border-gold-deep" />
              )}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted">
          Brand names are trademarks of their respective owners. INJ Makeup Studio is not affiliated with, endorsed by
          or an authorised seller of these brands, and does not sell cosmetics online.
        </p>
      </div>
    </section>
  );
}
