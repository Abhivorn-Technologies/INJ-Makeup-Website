import { Plus } from "lucide-react";

import type { FAQ } from "@/lib/content";

/** Native <details> accordion — keyboard and screen-reader friendly without JS. */
export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div data-reveal className="divide-y divide-gold/30 border-y border-gold/30">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[1.35rem] leading-snug text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              size={20}
              aria-hidden="true"
              className="shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 pr-10 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
