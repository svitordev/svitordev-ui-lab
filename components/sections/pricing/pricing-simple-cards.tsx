// components/sections/pricing/pricing-simple-cards.tsx
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Serviço pontual",
    desc: "Você contrata um serviço específico e realiza o pagamento apenas por essa demanda.",
    points: [
      "Ideal para quem precisa resolver uma necessidade pontual.",
      "Bom para ajustes, revisões ou atendimentos isolados.",
    ],
  },
  {
    title: "Serviço + acompanhamento",
    desc: "Além do atendimento inicial, combinamos um valor recorrente de acompanhamento.",
    points: [
      "Inclui acompanhamento periódico e pequenos ajustes dentro do escopo combinado.",
      "Indicado para quem precisa de suporte contínuo ao longo do tempo.",
    ],
  },
];

export function PricingSimpleCards() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Formas de contratação
          </h2>
          <p className="text-sm text-muted-foreground">
            É possível contratar apenas um serviço pontual ou manter um acompanhamento recorrente,
            de acordo com a sua necessidade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>

              <ul className="mt-3 flex-1 space-y-1.5 text-xs text-muted-foreground">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <Button size="sm" variant="outline">
                  Ver qual faz sentido para mim
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
