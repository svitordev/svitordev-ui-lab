// app/library/landing/page.tsx
// Evolução 022 — demonstração viva do conceito do template: landing completa
// montada exclusivamente com peças existentes do laboratório (sem component novo).
// Server Component — as Client boundaries vivem nos próprios components (Pricing,
// FAQ/Accordion, MobileNav via HeaderBasic). Demo data pertence ao consumer (page).
import type { Metadata } from "next";

import { FooterColumns } from "@/components/site/footers/footer-columns";
import { HeroMediaShowcase } from "@/components/sections/hero/hero-media-showcase";
import { LogosStrip } from "@/components/sections/logos/logos-strip";
import { StatsGrid } from "@/components/sections/stats/stats-grid";
import { FeatureComparison } from "@/components/sections/features/feature-comparison";
import { TestimonialsRatingCards } from "@/components/sections/testimonials/testimonials-rating-cards";
import { PricingThreeTiers } from "@/components/sections/pricing/pricing-three-tiers";
import { FaqAccordion } from "@/components/sections/faq/faq-accordion";
import { CtaSplitActions } from "@/components/sections/cta/cta-split-actions";
import { StickyCtaBar } from "@/components/sections/cta/sticky-cta-bar";

export const metadata: Metadata = {
  title: "Library · Landing",
  description:
    "Landing completa montada com componentes existentes da biblioteca.",
};

// Narrativa única brand-neutral (produto digital genérico para negócios de
// serviço), coerente com o placeholder "Sua Empresa" dos templates hardcoded.
// Sem marca própria: a landing demonstra o template, não um produto fictício.

// Âncoras locais (fragmento puro: #services, #contact) têm consumers reais na
// própria página (actions dos dados). Links root+fragment (/#...) dos templates
// são navegação real para a home — não são âncoras desta rota; os templates
// continuam intocados (fora de escopo).

const logosItems = [
  { name: "Nortis" },
  { name: "Vetra" },
  { name: "Kairo" },
  { name: "Orbio" },
  { name: "Lumina" },
];

const statsItems = [
  { value: "120+", label: "projetos entregues", description: "dado ilustrativo" },
  { value: "98%", label: "clientes satisfeitos", description: "dado ilustrativo" },
  { value: "24h", label: "tempo médio de resposta", description: "dado ilustrativo" },
  { value: "15", label: "integrações disponíveis", description: "dado ilustrativo" },
];

// Mesmos planos do Pricing (Essencial / Profissional / Completo) — comparação e
// preços precisam corresponder semanticamente (mesma narrativa).
const comparisonOptions = [
  { id: "essencial", label: "Essencial" },
  { id: "profissional", label: "Profissional" },
  { id: "completo", label: "Completo" },
];

const comparisonFeatures = [
  { label: "Agendamentos online", values: { essencial: true, profissional: true, completo: true } },
  { label: "Painel para clientes", values: { essencial: false, profissional: true, completo: true } },
  { label: "Relatórios mensais", values: { essencial: false, profissional: true, completo: true } },
  { label: "Integrações", values: { essencial: "3", profissional: "8", completo: "15" } },
  { label: "Suporte prioritário", values: { essencial: false, profissional: false, completo: true } },
];

const reviewItems = [
  {
    quote:
      "Organizar agendamentos e atendimento no mesmo lugar reduziu o tempo perdido em planilha e mensagens soltas.",
    author: "Marina Costa",
    role: "dado ilustrativo",
    rating: 5,
    avatar: { fallback: "MC" },
  },
  {
    quote:
      "O painel simples deu visibilidade do mês inteiro sem planilha paralela. Foi o suficiente para a operação inteira.",
    author: "Rafael Nunes",
    role: "dado ilustrativo",
    rating: 4,
    avatar: { fallback: "RN" },
  },
  {
    quote:
      "Começamos no plano menor e migramos quando a equipe cresceu. A estrutura acompanhou sem retrabalho.",
    author: "Bruna Prado",
    role: "dado ilustrativo",
    rating: 5,
    avatar: { fallback: "BP" },
  },
];

// Anual é dado explícito do consumer (12x o mensal, sem cálculo no componente).
const pricingPlans = [
  {
    name: "Essencial",
    description: "Para quem está começando a organizar a operação agora.",
    prices: { monthly: "R$ 99/mês", yearly: "R$ 990/ano" },
    features: [
      "Agendamentos online",
      "3 integrações essenciais",
      "Suporte por e-mail",
      "1 usuário administrador",
    ],
    action: { label: "Começar com o Essencial", href: "#contact", variant: "outline" as const },
  },
  {
    name: "Profissional",
    featured: true,
    description: "Para negócios com equipe pequena e rotina semanal.",
    prices: { monthly: "R$ 249/mês", yearly: "R$ 2.490/ano" },
    features: [
      "Tudo do Essencial",
      "Painel para clientes",
      "Relatórios mensais",
      "8 integrações disponíveis",
    ],
    action: { label: "Começar com o Profissional", href: "#contact", variant: "default" as const },
  },
  {
    name: "Completo",
    description: "Para operações que precisam de controle total e suporte rápido.",
    prices: { monthly: "R$ 499/mês", yearly: "R$ 4.990/ano" },
    features: [
      "Tudo do Profissional",
      "15 integrações disponíveis",
      "Suporte prioritário",
      "Usuários ilimitados",
    ],
    action: { label: "Começar com o Completo", href: "#contact", variant: "outline" as const },
  },
];

const faqItems = [
  {
    question: "Posso adaptar a plataforma ao meu negócio?",
    answer:
      "Sim. A estrutura é configurável: você define serviços, horários e campos conforme a rotina do seu atendimento.",
  },
  {
    question: "Como funciona a implantação?",
    answer:
      "A configuração inicial é guiada: cadastre serviços, horários e equipe, convide os clientes e comece a usar no mesmo dia.",
  },
  {
    question: "Posso mudar de plano depois de contratar?",
    answer:
      "Sim. O upgrade pode ser feito a qualquer momento e passa a valer no ciclo seguinte de cobrança.",
  },
  {
    question: "O plano anual tem fidelidade?",
    answer:
      "Não há multa de fidelidade — o plano anual é apenas a opção com desconto equivalente a dois meses.",
  },
  {
    question: "Como funciona o suporte em cada plano?",
    answer:
      "Nos planos menores o suporte é por e-mail; no Completo há fila prioritária com resposta mais rápida.",
  },
];

export default function LibraryLandingPage() {
  return (
    <>
      {/* Header omitido: todos os headers existentes têm links root+fragment
          (/#...) que navegam para a home — seriam enganosos nesta rota. */}

      {/* Containing block da StickyCtaBar — sticky vive no document scroll real
          (sem overflow no caminho) e termina antes do footer. */}
      <div>
        <HeroMediaShowcase
          eyebrow="Plataforma digital para negócios de serviço"
          title="Organize sua operação e entregue uma experiência melhor aos seus clientes."
          description="Agendamentos, atendimento e acompanhamento no mesmo lugar — sem planilha paralela, sem mensagem perdida."
          actions={[
            { label: "Falar com a equipe", href: "mailto:contato@suaempresa.com", variant: "default" },
            { label: "Ver recursos", href: "#services", variant: "outline" },
          ]}
          mediaCaption="Painel ilustrativo da plataforma — dado demonstrativo do template."
        />

        <LogosStrip title="Empresas que confiam no nosso trabalho" items={logosItems} />
        <StatsGrid
          eyebrow="Resultados"
          title="Números que mostram a operação"
          description="Dados ilustrativos da demonstração — troque pelos números reais do seu projeto."
          items={statsItems}
        />

        {/* Âncora local #services — consumers reais: action da hero e action da sticky bar. */}
        <div id="services">
          <FeatureComparison
            eyebrow="Recursos"
            title="Compare os recursos disponíveis em cada plano"
            description="Os mesmos planos da seção de preços, lado a lado."
            options={comparisonOptions}
            features={comparisonFeatures}
          />
        </div>

        <TestimonialsRatingCards
          eyebrow="Depoimentos"
          title="O que dizem os clientes"
          description="Depoimentos ilustrativos da demonstração — troque pelos depoimentos reais do seu projeto."
          items={reviewItems}
        />

        <PricingThreeTiers
          eyebrow="Planos"
          title="Planos para cada fase do negócio"
          description="Comece no essencial e evolua quando a operação pedir."
          billingLabel="Período de cobrança"
          monthlyLabel="Mensal"
          yearlyLabel="Anual"
          plans={pricingPlans}
        />

        <FaqAccordion
          eyebrow="Dúvidas"
          title="Perguntas frequentes"
          description="O que costumam perguntar antes de começar."
          items={faqItems}
        />

        {/* Âncora local #contact — consumer real: actions dos planos do pricing. */}
        <div id="contact">
          <CtaSplitActions
            eyebrow="Comece agora"
            title="Pronto para simplificar sua operação?"
            description="Fale com a equipe e monte o formato ideal para o momento do seu negócio."
            supportingText="Resposta em até 1 dia útil. Sem compromisso e sem enrolação."
            actions={[
              { label: "Falar com um especialista", href: "mailto:contato@suaempresa.com", variant: "default" },
              { label: "Ver o blog", href: "/blog", variant: "outline" },
            ]}
          />
        </div>

        <StickyCtaBar
          title="Comece a organizar sua operação hoje"
          description="Barra persistente — pertence ao conteúdo da landing e termina antes do footer."
          actions={[
            { label: "Falar com a equipe", href: "mailto:contato@suaempresa.com", variant: "default" },
            { label: "Ver planos", href: "#services", variant: "outline" },
          ]}
        />
      </div>

      <FooterColumns />
    </>
  );
}
