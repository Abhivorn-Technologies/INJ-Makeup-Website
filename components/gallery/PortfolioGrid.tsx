"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";

export type PortfolioItem = LightboxItem & { category: string };

type Props = {
  items: PortfolioItem[];
  categories: readonly { id: string; label: string }[];
  /** Show at most this many items (homepage teaser). */
  limit?: number;
  label: string;
  /** Column layout: masonry (default) or a compact strip. */
  columnsClass?: string;
};

export function PortfolioGrid({ items, categories, limit, label, columnsClass = "columns-2 md:columns-3 lg:columns-4" }: Props) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(() => {
    const list = filter === "all" ? items : items.filter((i) => i.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [items, filter, limit]);

  const available = categories.filter((c) => c.id === "all" || items.some((i) => i.category === c.id));

  return (
    <div>
      {available.length > 2 && (
      <div role="group" aria-label={`Filter ${label}`} className="mb-10 flex flex-wrap justify-center gap-2">
        {available.map((c) => {
          const selected = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(c.id)}
              className={`min-h-11 border px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                selected
                  ? "border-ink bg-ink text-cream"
                  : "border-gold/50 bg-transparent text-brown hover:border-ink hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "photo" : "photos"}
      </p>

      <ul className={`${columnsClass} gap-3 sm:gap-4`}>
        {visible.map((item, i) => (
          <li
            key={item.src.src}
            data-reveal
            style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="frame-gold img-zoom card-hover-lift group relative block w-full overflow-hidden bg-beige"
              aria-label={`View larger: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                placeholder={item.src.blurDataURL ? "blur" : "empty"}
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                className="h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={visible} index={active} onClose={() => setActive(null)} onIndexChange={setActive} />
    </div>
  );
}
