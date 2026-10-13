import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Share your plans",
    text: "Send an enquiry through our booking form or WhatsApp with your date, event, location and the look you have in mind.",
  },
  {
    title: "Consultation",
    text: "We discuss your outfit, jewellery, skin, preferences and references, and recommend the right services and technique.",
  },
  {
    title: "Confirmation",
    text: "The INJ team confirms availability, timings and pricing with you directly. Your appointment is confirmed only at this stage.",
  },
  {
    title: "Your day",
    text: "We create your look with care and attention to detail, so you can relax and enjoy the occasion.",
  },
];

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-heading" className="bg-ivory py-20 md:py-24">
      <div className="container-luxe">
        <SectionHeading id="process-heading" eyebrow="How it works" title="From enquiry to your moment" />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="relative"
            >
              <span className="font-display text-[3.2rem] italic leading-none text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.5rem] text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
