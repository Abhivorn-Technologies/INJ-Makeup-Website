import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ornament } from "@/components/shared/Ornament";
import { courses } from "@/lib/content";
import { photos } from "@/lib/photos";

export function AcademySection() {
  return (
    <section aria-labelledby="academy-heading" className="relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-gold/20"
      />
      <div className="container-luxe relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow !text-gold-light">INJ Makeup Academy</p>
          <h2 id="academy-heading" className="mt-4 text-[2.1rem] leading-[1.08] sm:text-[2.7rem] lg:text-[3.1rem]">
            Turn your passion for beauty <span className="italic text-gold-light">into your art.</span>
          </h2>
          <Ornament className="mt-5" light />
          <p className="mt-6 max-w-xl text-[1.03rem] leading-[1.85] text-cream/80">
            Learn the art of makeup through guided practice, professional techniques, and personalised instruction.
            Explore training opportunities designed for aspiring artists and beauty enthusiasts.
          </p>
          <ul className="mt-9 grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {courses.map((c) => (
              <li key={c.name} className="bg-ink p-5">
                <p className="font-display text-xl text-cream">{c.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold-light/90">{c.level}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-cream/70">
            Course content, duration, fees and batch dates are shared on enquiry.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/academy#course-enquiry" className="btn btn-gold">
              Enquire About Courses <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/academy" className="link-gold self-center !text-gold-light">
              Visit the academy
            </Link>
          </div>
        </div>
        <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="frame-gold float-gentle relative aspect-[4/5] min-h-[340px] overflow-hidden rounded-t-[999px] bg-brown sm:min-h-[420px]">
            <Image
              src={photos.academyClass.src}
              alt={photos.academyClass.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
