// app/(site)/page.tsx
import { AboutSplit } from "@/components/sections/about/about-split";
import { ContactSplit } from "@/components/sections/contact/contact-split";
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { HeroSteps } from "@/components/sections/hero/hero-steps";
import { PricingThreeTiers } from "@/components/sections/pricing/pricing-three-tiers";
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
