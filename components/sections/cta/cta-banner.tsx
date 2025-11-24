// components/sections/cta/cta-banner.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="w-full bg-linear-to-r from-background via-muted to-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start gap-4 rounded-2xl border bg-background/80 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Próximo passo
            </p>
            <h2 className="text-sm font-semibold md:text-base">
              Entre em contato e veja qual é a melhor forma de atendimento para o seu caso.
            </h2>
            <p className="text-xs text-muted-foreground">
              Com algumas informações básicas já é possível entender sua necessidade e indicar
              o melhor serviço, prazos e forma de acompanhamento.
            </p>
          </div>

          <Button size="sm" className="mt-1 md:mt-0">
            Falar com a equipe
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
