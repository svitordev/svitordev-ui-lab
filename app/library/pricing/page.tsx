// app/library/pricing/page.tsx
import {
  PricingThreeTiers,
  type PricingThreeTiersProps,
} from "@/components/sections/pricing/pricing-three-tiers";
import { PricingHighlight } from "@/components/sections/pricing/pricing-highlight";
import { PricingSimpleCards } from "@/components/sections/pricing/pricing-simple-cards";

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

export default function PricingSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · Três planos
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingThreeTiers {...pricingDemo} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · Plano sob medida destacado
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingHighlight />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Projeto x Projeto + manutenção
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingSimpleCards />
          </div>
        </div>
      </section>
    </div>
  );
}
