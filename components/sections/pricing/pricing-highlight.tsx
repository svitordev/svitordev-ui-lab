// components/sections/pricing/pricing-highlight.tsx
import { Button } from "@/components/ui/button";

const bullets = [
  "Reunião inicial para entender o contexto e a necessidade do cliente.",
  "Análise do caso e definição do escopo do serviço a ser prestado.",
  "Apresentação de proposta com valores, prazos e forma de atendimento.",
  "Acompanhamento durante a execução, com espaço para ajustes quando necessário.",
];

export function PricingHighlight() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* texto principal */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Serviço sob medida com valor combinado
            </h2>
            <p className="text-sm text-muted-foreground">
              Para demandas mais específicas ou contínuas, o ideal é alinhar um serviço sob
              medida, ajustado à realidade do seu negócio e às expectativas de resultado.
            </p>
            <p className="text-sm text-muted-foreground">
              O investimento é definido de acordo com a complexidade, o tempo envolvido e o
              nível de acompanhamento necessário em cada situação.
            </p>
            <Button size="sm">
              Conversar sobre um serviço sob medida
            </Button>
          </div>

          {/* bullets explicando o formato */}
          <div className="space-y-3 rounded-2xl border bg-background p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Como funciona esse tipo de contratação
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
