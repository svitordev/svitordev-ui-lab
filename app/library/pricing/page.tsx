// app/library/pricing/page.tsx
import type { Metadata } from "next";
import {
  PricingThreeTiers,
  type PricingThreeTiersProps,
} from "@/components/sections/pricing/pricing-three-tiers";
import { PricingHighlight } from "@/components/sections/pricing/pricing-highlight";
import { PricingSimpleCards } from "@/components/sections/pricing/pricing-simple-cards";

export const metadata: Metadata = {
  title: "Library · Pricing",
  description:
    "Planos e preços — três tiers, plano destacado e comparação simples.",
};

// Página heterogênea (three tiers tem contrato próprio) — preview ReactNode
// preserva a tipagem real no local do JSX.
type PricingItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

// Demo data-driven da Evolução 016 — dados serializáveis (page Server → section Client).
const pricingDemo: PricingThreeTiersProps = {
  title: "Planos para cada fase do seu projeto",
  description:
    "Comece no essencial e evolua quando fizer sentido — os valores de cada período são definidos por quem consome a section.",
  billingLabel: "Período de cobrança",
  monthlyLabel: "Mensal",
  yearlyLabel: "Anual",
  plans: [
    {
      name: "Essencial",
      description: "Para quem está começando e precisa do básico bem feito.",
      prices: { monthly: "R$ 49/mês", yearly: "R$ 490/ano" },
      features: [
        "Loja com até 20 produtos",
        "Página de contato e formulário simples",
        "Suporte por e-mail",
      ],
      action: {
        label: "Falar com a equipe",
        href: "mailto:contato@suaempresa.com",
        variant: "outline",
      },
    },
    {
      name: "Profissional",
      featured: true,
      description: "Para operações que já rodaram e precisam de mais ritmo e alcance.",
      prices: { monthly: "R$ 99/mês", yearly: "R$ 990/ano" },
      features: [
        "Catálogo completo com variações",
        "Integração com meios de pagamento",
        "Painel para acompanhar pedidos",
        "Suporte prioritário",
      ],
      action: {
        label: "Falar com a equipe",
        href: "mailto:contato@suaempresa.com",
        variant: "default",
      },
    },
    {
      name: "Completo",
      description: "Para operações que exigem atenção dedicada.",
      prices: { monthly: "Sob consulta", yearly: "Sob consulta" },
      features: [
        "Tudo do Profissional",
        "Atendimento personalizado",
        "Acompanhamento contínuo",
      ],
      action: {
        label: "Falar com a equipe",
        href: "mailto:contato@suaempresa.com",
        variant: "outline",
      },
    },
  ],
};

const pricings: PricingItem[] = [
  {
    id: "pricing-three-tiers",
    name: "Três planos",
    description:
      "Planos com toggle mensal/anual acessível — preços e ações vêm do consumer.",
    preview: <PricingThreeTiers {...pricingDemo} />,
  },
  {
    id: "pricing-highlight",
    name: "Plano sob medida destacado",
    description: "Um plano em destaque com os demais como alternativas.",
    preview: <PricingHighlight />,
  },
  {
    id: "pricing-simple-cards",
    name: "Projeto x Projeto + manutenção",
    description: "Comparação simples de formatos de trabalho lado a lado.",
    preview: <PricingSimpleCards />,
  },
];

export default function PricingLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Pricing / Planos
          </h1>
          <p className="text-sm text-muted-foreground">
            Modelos de planos e preços. Os valores são de exemplo — troque pelos
            dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {pricings.map(({ id, name, description, preview }) => (
            <div
              key={id}
              className="space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-base font-semibold">{name}</h2>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Componente: <code className="font-mono text-[10px]">{id}</code>
                </p>
              </div>

              {/* Preview */}
              <div className="overflow-hidden rounded-xl border bg-background">
                {preview}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
