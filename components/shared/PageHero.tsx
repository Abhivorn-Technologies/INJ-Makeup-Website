import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/shared/Breadcrumbs";
import { Ornament } from "@/components/shared/Ornament";
import type { Photo } from "@/lib/photos";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  photo?: Photo;
  /** CSS object-position for the photo crop. */
  focus?: string;
  children?: ReactNode;
};

/** Editorial page header used by inner pages: text left, arched portrait right. */
export function PageHero({ eyebrow, title, intro, crumbs, photo, focus = "center 30%", children }: Props) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-gold/25"
      />
      <div className="container-luxe grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div data-reveal>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-8">{eyebrow}</p>
          <h1 className="mt-4 text-[2.5rem] leading-[1.04] text-ink sm:text-[3.2rem] lg:text-[3.9rem]">{title}</h1>
          <Ornament className="mt-6" />
          {intro && <div className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">{intro}</div>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {photo && (
          <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="frame-gold float-gentle relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-beige">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover"
                style={{ objectPosition: focus }}
              />
            </div>
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-0 h-24 w-24 border-b border-l border-gold/60" />
          </div>
        )}
      </div>
    </section>
  );
}
