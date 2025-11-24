// components/site/footers/footer-cta.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FooterCta() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* CTA blocão */}
        <div className="mb-6 rounded-2xl border bg-background/90 p-4 shadow-sm md:flex md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Pronto para o próximo passo?
            </p>
            <h2 className="text-sm font-semibold md:text-base">
              Entre em contato e veja qual solução faz mais sentido para a sua necessidade.
            </h2>
            <p className="text-xs text-muted-foreground">
              Com algumas informações básicas, já é possível entender o seu cenário e indicar
              caminhos, prazos e formas de atendimento.
            </p>
          </div>

          <Button size="sm" className="mt-3 md:mt-0">
            Falar com a equipe
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        {/* linha final */}
        <div className="flex flex-col items-center justify-between gap-2 border-t pt-4 text-[11px] text-muted-foreground md:flex-row">
          <p>© {year} Sua Empresa. Todos os direitos reservados.</p>
          <p>
            Este rodapé pode ser adaptado para escritórios, clínicas, consultorias e outros
            negócios de serviços.
          </p>
        </div>
      </div>
    </footer>
  );
}
