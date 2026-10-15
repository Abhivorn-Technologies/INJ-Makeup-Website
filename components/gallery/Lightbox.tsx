"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: StaticImageData; alt: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Accessible full-screen viewer built on the native <dialog> element, which
 * provides focus trapping, Escape-to-close and an inert background.
 */
export function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null && items.length > 0;
  const current = open ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <dialog
      ref={ref}
      aria-label="Portfolio image viewer"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/95 backdrop:backdrop-blur-sm open:animate-[fadeIn_.35s_ease]"
    >
      {current && (
        <div className="relative flex h-full w-full items-center justify-center px-4 pb-20 pt-16 sm:px-20">
          <div className="relative h-full w-full">
            <Image
              key={index}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              placeholder={current.src.blurDataURL ? "blur" : "empty"}
              className="object-contain"
            />
          </div>

          <p className="absolute inset-x-0 bottom-5 mx-auto max-w-2xl px-6 text-center text-sm text-cream/85" aria-live="polite">
            <span className="mr-3 font-display text-gold-light">
              {index! + 1} / {items.length}
            </span>
            {current.alt}
          </p>

          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute right-3 top-3 grid h-12 w-12 place-items-center text-cream/90 hover:text-gold-light sm:right-6 sm:top-5"
            aria-label="Close viewer"
          >
            <X size={28} aria-hidden="true" />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-1 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream hover:border-gold-light hover:text-gold-light sm:left-5"
                aria-label="Previous image"
              >
                <ChevronLeft size={26} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-1 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream hover:border-gold-light hover:text-gold-light sm:right-5"
                aria-label="Next image"
              >
                <ChevronRight size={26} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
