import { Brush, Gem, Layers, MessagesSquare, ScanEye, SlidersHorizontal } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { whyInj } from "@/lib/content";

const ICONS = { MessagesSquare, Brush, SlidersHorizontal, Gem, ScanEye, Layers };

export function WhyInj() {
  return (
    <section aria-labelledby="why-heading" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="why-heading"
          eyebrow="Why INJ"
          title={
            <>
              Your beauty deserves <span className="italic text-gold-deep">a thoughtful touch</span>
            </>
          }
        />
        <ul className="mt-16 grid border-l border-t border-gold/25 sm:grid-cols-2 lg:grid-cols-3">
          {whyInj.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
                className="border-b border-r border-gold/25 p-8 md:p-10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/60 text-gold-deep">
                  <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.55rem] leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
