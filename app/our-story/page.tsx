import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { Ornament } from "@/components/shared/Ornament";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { photos } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Our Story",
  description:
    "INJ Makeup Studio & Academy was founded by Nazneen Hussain in Hyderabad with a passion for enhancing natural beauty through the art of makeup.",
  path: "/our-story",
});

const values = [
  {
    title: "Makeup as self-expression",
    text: "We believe makeup is more than a beauty tool — it is a form of self-expression. Our looks highlight your best features without going over the top.",
  },
  {
    title: "Artistry with precision",
    text: "Faces are composed of lines, symmetry and a spectrum of tones. Like painters, we use colour and brushes to even out, accentuate and define.",
  },
  {
    title: "Confidence, first",
    text: "Instilling confidence is our priority. Whether it’s your big day or a special event, we want you to look and feel your best.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Makeup is more than <span className="italic text-gold-deep">products on your skin</span>
          </>
        }
        intro={
          <p>
            INJ Makeup Studio was founded by {site.founder} with a passion for enhancing natural beauty through the
            art of makeup.
          </p>
        }
        crumbs={[{ name: "Our Story", href: "/our-story" }]}
        photo={photos.artistAtWork}
        focus="center 35%"
      />

      <section aria-labelledby="story-heading" className="bg-ivory py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">A studio built on bridal artistry</p>
            <h2 id="story-heading" className="mt-4 text-[2.1rem] leading-tight text-ink md:text-[2.7rem]">
              From bridal specialist to studio &amp; academy
            </h2>
            <Ornament className="mt-5" />
            <div className="mt-7 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
              <p>
                {site.founder} started out as a bridal makeup specialist in Hyderabad, and quickly gained recognition
                for her talent and artistic eye. Demand for her work led INJ to expand into airbrush, HD, party and
                high-fashion makeup, along with a wide range of Indian and international hairstyles.
              </p>
              <p>
                At INJ, we use high-end, branded products and the latest techniques to create glowing, sophisticated
                looks — adding drama where you want it, without making it look overdone. We stay on top of hair and
                makeup trends so every look feels current while staying true to you.
              </p>
              <p>
                Known in the bridal industry for our attention to detail and competitive pricing, we aim to instil
                confidence in every client. Alongside the studio, the INJ Academy teaches makeup to aspiring artists
                and beauty enthusiasts.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href="/book-appointment" className="btn btn-gold">
                Book Your Session <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/academy" className="link-gold self-center">
                About the academy
              </Link>
            </div>
          </div>
          <div data-reveal className="relative">
            <div className="frame-gold float-gentle relative aspect-[4/5] overflow-hidden bg-beige">
              <Image
                src={photos.receptionSoftGlam.src}
                alt={photos.receptionSoftGlam.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
            <figure className="mt-8 border-l border-gold pl-6">
              <blockquote className="font-display text-[1.6rem] italic leading-snug text-ink">
                “True artistry lies in the beauty of makeup.”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-gold-text">INJ Makeup Studio</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading id="values-heading" eyebrow="What guides us" title="Our philosophy" />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties} className="border-t border-gold/50 pt-6">
                <h3 className="text-[1.6rem] text-ink">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="founder-heading" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe grid items-center gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
          <div data-reveal className="mx-auto grid aspect-square w-full max-w-xs place-items-center rounded-full border border-gold/50 bg-cream p-12">
            {/* Replace with an approved portrait of the founder when available. */}
            <Image src="/brand/LOGO ING.png" alt="INJ Makeup logo" width={400} height={400} className="logo-spin h-auto w-3/4 object-contain" />
          </div>
          <div data-reveal>
            <p className="eyebrow">Founder</p>
            <h2 id="founder-heading" className="mt-4 text-[2.3rem] text-ink md:text-[2.8rem]">
              {site.founder}
            </h2>
            <Ornament className="mt-5" />
            <p className="mt-6 max-w-xl text-[1.03rem] leading-[1.85] text-muted">
              Nazneen founded INJ to cater to individuals who want to experience the power of makeup. Her clients
              often mention the same things: that she listens, works according to their wishes, and takes care of
              every requirement on the big day.
            </p>
            <Link href="/gallery" className="link-gold mt-8">
              See the portfolio <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
