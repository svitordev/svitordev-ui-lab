// components/sections/hero/hero-steps.tsx
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "1. Conversa rápida",
    desc: "Você me explica o que precisa e o tipo de negócio que tem.",
  },
  {
    title: "2. Proposta clara",
    desc: "Resumo em texto o que vou fazer, prazos e valor, sem enrolação.",
  },
  {
    title: "3. Entrega + suporte",
    desc: "Implementação, ajustes finos e suporte para você usar no dia a dia.",
  },
];

export function HeroSteps() {
  return (
    <section className="w-full bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* Coluna texto */}
          <div className="space-y-6">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Transformando ideia em sistema web em poucos passos.
            </h1>

            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Nada de processos gigantes e burocráticos. Aqui você fala diretamente com o dev,
              sem intermediários, e acompanha o projeto de perto.
            </p>

            <Button size="lg">Quero conversar sobre um projeto</Button>
          </div>

          {/* Coluna steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border bg-background/80 p-4 shadow-sm"
              >
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
            <p className="text-[11px] text-muted-foreground">
              Esses mesmos blocos você pode reaproveitar em qualquer landing comercial,
              trocando só o contexto e os textos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
