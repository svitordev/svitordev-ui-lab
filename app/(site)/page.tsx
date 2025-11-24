// app/(site)/page.tsx
import { AboutSplit } from "@/components/sections/about/about-split";
import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { ContactSplit } from "@/components/sections/contact/contact-split";
import { CtaBanner } from "@/components/sections/cta/cta-banner";
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { HeroCenterCta } from "@/components/sections/hero/hero-center-cta";
import { HeroSteps } from "@/components/sections/hero/hero-steps";
import { PricingThreeTiers } from "@/components/sections/pricing/pricing-three-tiers";
import { ServicesSplitWithHighlight } from "@/components/sections/services/services-split-with-highlight";
import { ServicesWithIcons } from "@/components/sections/services/services-with-icons";
import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";

export default function SiteHomePage() {
  return (
    <>
      <HeroSteps />
      <ServicesWithIcons />
      <AboutSplit/>
      <TestimonialsGrid/>
      <PricingThreeTiers/>
      <ContactSplit/>
      <CtaSimple/>

      {/* depois você adiciona outras sections: sobre, depoimentos, contato etc. */}
    </>
  );
}
