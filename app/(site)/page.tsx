// app/(site)/page.tsx
import type { Metadata } from "next";
import { AboutSplit } from "@/components/sections/about/about-split";
import { ContactSplit } from "@/components/sections/contact/contact-split";
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { HeroSteps } from "@/components/sections/hero/hero-steps";
import {
  PricingThreeTiers,
  type PricingThreeTiersProps,
} from "@/components/sections/pricing/pricing-three-tiers";
import { ServicesWithIcons } from "@/components/sections/services/services-with-icons";
import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";

// Copy original da pricing da home, movida para o consumer (Evolução 016).
// Anual é dado explícito do consumer (12x o mensal, sem cálculo no componente).
// CTA usa o anchor real #contact — a própria home renderiza ContactSplit (id="contact").
const pricingHomeData: PricingThreeTiersProps = {
  title: "Formas de trabalhar",
  description:
    "Os formatos podem ser ajustados de acordo com a realidade do seu negócio e o tipo de acompanhamento que você precisa.",
  billingLabel: "Período de cobrança",
  monthlyLabel: "Mensal",
  yearlyLabel: "Anual",
  plans: [
    {
      name: "Atendimento pontual",
      description: "Para quem precisa resolver uma demanda específica em um único atendimento ou pacote fechado.",
      prices: { monthly: "A partir de R$ 1.200", yearly: "A partir de R$ 1.200" },
      features: [
        "Escopo bem definido desde o início",
        "Foco em uma necessidade principal",
        "Prazos combinados previamente",
        "Ideal para ajustes, revisões ou casos isolados",
      ],
      action: { label: "Falar sobre este formato", href: "#contact", variant: "outline" },
    },
    {
      name: "Acompanhamento recorrente",
      featured: true,
      description: "Para negócios que precisam de suporte contínuo e acompanhamento mais próximo.",
      prices: { monthly: "A partir de R$ 2.400/mês", yearly: "A partir de R$ 28.800/ano" },
      features: [
        "Atendimentos mensais dentro do escopo contratado",
        "Acompanhamento periódico da sua situação ou do seu negócio",
        "Canal direto para dúvidas recorrentes",
        "Indicado para quem quer previsibilidade e suporte constante",
      ],
      action: { label: "Falar sobre este formato", href: "#contact", variant: "default" },
    },
    {
      name: "Plano sob medida",
      description: "Para casos específicos que exigem um formato de atendimento personalizado.",
      prices: { monthly: "Valores sob consulta", yearly: "Valores sob consulta" },
      features: [
        "Análise detalhada da necessidade",
        "Definição conjunta do formato de trabalho",
        "Flexibilidade para ajustar o escopo",
        "Opção de combinar demandas pontuais e acompanhamento",
      ],
      action: { label: "Falar sobre este formato", href: "#contact", variant: "outline" },
    },
  ],
};

// Description herda conscientemente do root (descreve o projeto como um todo).
export const metadata: Metadata = {
  title: "Início",
};

export default function SiteHomePage() {
  return (
    <>
      <HeroSteps />
      {/* Âncoras da navegação da home (Evolução 026): os IDs são alvos dos links
          /#services e /#about dos headers/footers e pertencem à composição da home,
          não aos componentes reutilizáveis. */}
      <div id="services">
        <ServicesWithIcons />
      </div>
      <div id="about">
        <AboutSplit />
      </div>
      <TestimonialsGrid/>
      <PricingThreeTiers {...pricingHomeData} />
      <ContactSplit/>
      <CtaSimple/>

      {/* depois você adiciona outras sections: sobre, depoimentos, contato etc. */}
    </>
  );
}
