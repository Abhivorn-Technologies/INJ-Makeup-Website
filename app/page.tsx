import { AcademySection } from "@/components/home/AcademySection";
import { BeautyJournal } from "@/components/home/BeautyJournal";
import { BrandsSection } from "@/components/home/BrandsSection";
import { BridalShowcase } from "@/components/home/BridalShowcase";
import { HairSection } from "@/components/home/HairSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { PortfolioSection, TransformationsSection } from "@/components/home/PortfolioSection";
import { ServiceHighlights } from "@/components/home/ServiceHighlights";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { WhyInj } from "@/components/home/WhyInj";
import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "INJ Makeup Studio & Academy | Bridal Makeup Artist in Hyderabad",
  description:
    "Bridal, HD, airbrush, engagement and party makeup, bridal hairstyling and saree draping in Banjara Hills, Hyderabad. Founded by Nazneen Hussain. Book your appointment.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <HeroSection />
      <IntroSection />
      <ServiceHighlights />
      <BridalShowcase />
      <TransformationsSection />
      <PortfolioSection />
      <HairSection />
      <WhyInj />
      <AcademySection />
      <BrandsSection />
      <TestimonialSection />
      <CTASection />
      <BeautyJournal />
    </>
  );
}
