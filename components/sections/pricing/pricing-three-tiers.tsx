// components/sections/pricing/pricing-three-tiers.tsx
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Atendimento pontual",
    price: "A partir de R$ 1.200",
    description: "Para quem precisa resolver uma demanda específica em um único atendimento ou pacote fechado.",
    features: [
      "Escopo bem definido desde o início",
      "Foco em uma necessidade principal",
      "Prazos combinados previamente",
      "Ideal para ajustes, revisões ou casos isolados",
    ],
  },
  {
    name: "Acompanhamento recorrente",
    price: "A partir de R$ 2.400/mês",
    description: "Para negócios que precisam de suporte contínuo e acompanhamento mais próximo.",
    featured: true,
    features: [
      "Atendimentos mensais dentro do escopo contratado",
      "Acompanhamento periódico da sua situação ou do seu negócio",
      "Canal direto para dúvidas recorrentes",
      "Indicado para quem quer previsibilidade e suporte constante",
    ],
  },
  {
    name: "Plano sob medida",
    price: "Valores sob consulta",
    description: "Para casos específicos que exigem um formato de atendimento personalizado.",
    features: [
      "Análise detalhada da necessidade",
      "Definição conjunta do formato de trabalho",
      "Flexibilidade para ajustar o escopo",
      "Opção de combinar demandas pontuais e acompanhamento",
    ],
  },
];

export function PricingThreeTiers() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Formas de trabalhar
          </h2>
          <p className="text-sm text-muted-foreground">
            Os formatos podem ser ajustados de acordo com a realidade do seu negócio
            e o tipo de acompanhamento que você precisa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm ${
                plan.featured ? "border-foreground" : ""
              }`}
            >
              <div className="mb-3 space-y-1">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                <p className="text-lg font-bold">{plan.price}</p>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mb-4 flex-1 space-y-1.5 text-xs text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button size="sm" variant={plan.featured ? "default" : "outline"}>
                Falar sobre este formato
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
