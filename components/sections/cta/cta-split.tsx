// components/sections/cta/cta-split.tsx
import { Button } from "@/components/ui/button";

const steps = [
  "Você descreve em poucas linhas sua situação ou necessidade.",
  "Nossa equipe analisa e indica o tipo de atendimento ou serviço mais adequado.",
  "Se fizer sentido para você, alinhamos proposta, valores e próximos passos.",
];

export function CtaSplit() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* lado texto */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Quer conversar com nossa equipe?
            </h2>
            <p className="text-sm text-muted-foreground">
              Sem compromisso. O objetivo é entender o seu cenário, sugerir caminhos possíveis
              e ver se faz sentido avançar com algum dos serviços oferecidos.
            </p>
            <Button size="lg">
              Entrar em contato
            </Button>
          </div>

          {/* lado "como funciona" */}
          <div className="space-y-3 rounded-2xl border bg-muted/30 p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Como funciona esse primeiro contato
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {steps.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-1 text-[11px] text-muted-foreground">
              Essa estrutura funciona bem para escritórios, clínicas, consultorias e outras
              empresas que trabalham com atendimento sob demanda ou orçamento personalizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
