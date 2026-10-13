import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CourseEnquiryForm } from "@/components/booking/CourseEnquiryForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { Ornament } from "@/components/shared/Ornament";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { courses } from "@/lib/content";
import { photos } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Makeup Academy in Hyderabad",
  description:
    "Learn makeup at the INJ Makeup Academy in Banjara Hills, Hyderabad — guided training from beginner techniques to bridal, HD and airbrush makeup. Enquire about courses.",
  path: "/academy",
});

export default function AcademyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "INJ Makeup Academy",
          parentOrganization: { "@id": `${site.url}/#business` },
          url: `${site.url}/academy`,
        }}
      />
      <PageHero
        eyebrow="INJ Makeup Academy"
        title={
          <>
            Turn your passion for beauty <span className="italic text-gold-deep">into your art</span>
          </>
        }
        intro={
          <p>
            Makeup is a skill that takes time and practice to master — but with the right guidance, anyone can learn
            it. Our experienced teachers are here to help you start your journey to becoming a professional makeup
            artist.
          </p>
        }
        crumbs={[{ name: "Makeup Academy", href: "/academy" }]}
        photo={photos.academyClass}
        focus="center 25%"
      >
        <Link href="#course-enquiry" className="btn btn-gold">
          Enquire About Courses <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <WhatsAppButton message="Hello INJ, I'd like to know more about your makeup courses." />
      </PageHero>

      <section aria-labelledby="learn-heading" className="bg-ivory py-20 md:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div data-reveal>
            <h2 id="learn-heading" className="text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
              Learn by doing, with guidance at every step
            </h2>
            <Ornament className="mt-5" />
            <div className="mt-6 space-y-5 text-[1.03rem] leading-[1.85] text-muted">
              <p>
                Makeup has been around since ancient times. The tools and products have changed, but the goal is
                still the same: to feel confident and beautiful.
              </p>
              <p>
                Whether you are just starting out or want to improve your skills, our artists — with years of
                hands-on experience — teach everything from basic to advanced makeup looks. You’ll learn to create
                beautiful styles for every occasion: bridal, party and everyday wear.
              </p>
              <p>
                With practice and support, you’ll be able to recreate even detailed looks. We use high-quality,
                branded products so you can achieve the best results.
              </p>
            </div>
          </div>
          <aside data-reveal className="self-start border border-gold/35 bg-cream p-8 md:p-10">
            <h2 className="eyebrow">Good to know</h2>
            <ul className="mt-5 space-y-4 text-brown">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-deep" />
                Course content, timings, duration, fees and upcoming batch dates are shared on enquiry.
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-deep" />
                Not sure which course suits you? Tell us your experience and goals and we’ll advise you.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="courses-heading" className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading
            id="courses-heading"
            eyebrow="Course categories"
            title="Find your starting point"
            description="An overview of the training areas we offer. Speak to us for the current course structure and schedule."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <li
                key={c.name}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
                className="flex flex-col border border-gold/35 bg-ivory p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-text">{c.level}</p>
                <h3 className="mt-3 text-[1.65rem] leading-tight text-ink">{c.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.overview}</p>
                <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brown">Learning topics</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.topics.map((t) => (
                    <li key={t} className="border border-gold/40 px-3 py-1 text-sm text-brown">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="course-enquiry" aria-labelledby="enquiry-heading" className="scroll-mt-32 bg-ivory py-20 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              id="enquiry-heading"
              eyebrow="Course enquiry"
              title="Start your makeup journey"
              align="left"
              description="Send us a few details and our academy team will contact you with course information, timings and fees."
            />
            <div className="frame-gold relative mt-10 hidden aspect-[4/5] overflow-hidden bg-beige lg:block">
              <Image
                src={photos.artistAtWork.src}
                alt={photos.artistAtWork.alt}
                fill
                placeholder="blur"
                sizes="30vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
          <div className="border border-gold/30 bg-white p-6 md:p-10">
            <CourseEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
