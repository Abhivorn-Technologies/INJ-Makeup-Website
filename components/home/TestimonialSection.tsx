import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/content";

export function TestimonialSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind words"
          title={
            <>
              Words that <span className="italic text-gold-deep">make us smile</span>
            </>
          }
        />
        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              className="card-hover-lift relative flex flex-col border border-gold/35 bg-cream p-8 md:p-10"
            >
              <span aria-hidden="true" className="font-display text-7xl leading-none text-gold/70">
                “
              </span>
              <blockquote className="-mt-4 flex-1">
                <p className="font-display text-[1.28rem] leading-[1.55] text-ink">{t.quote}</p>
              </blockquote>
              <div className="mt-8 border-t border-gold/30 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brown">{t.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold-text">{t.context}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
