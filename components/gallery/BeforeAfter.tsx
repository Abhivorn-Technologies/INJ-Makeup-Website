"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Img = { src: string; width: number; height: number };

/**
 * Before/after comparison slider. Used only when approved before-and-after
 * photographs exist in `beforeAfterPairs` (lib/content.ts).
 * Keyboard accessible through the native range input.
 */
export function BeforeAfter({ before, after, label }: { before: Img; after: Img; label: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className="frame-gold relative overflow-hidden bg-beige">
      <div className="relative" style={{ aspectRatio: `${after.width} / ${after.height}` }}>
        <Image src={after.src} alt={`After: ${label}`} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={`Before: ${label}`} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${pos}%` }} aria-hidden="true" />
        <span className="absolute left-3 top-3 bg-ink/70 px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream">Before</span>
        <span className="absolute right-3 top-3 bg-ink/70 px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream">After</span>
      </div>
      <label htmlFor={id} className="sr-only">
        Comparison slider for {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-3 mx-auto w-[85%] accent-[#c9a45c]"
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
