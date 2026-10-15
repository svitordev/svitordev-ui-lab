// app/sections/cta/page.tsx
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { CtaSplit } from "@/components/sections/cta/cta-split";
import { CtaBanner } from "@/components/sections/cta/cta-banner";
import {
  CtaSplitActions,
  type CtaSplitActionsProps,
} from "@/components/sections/cta/cta-split-actions";

const ctaSplitActionsDemo: CtaSplitActionsProps = {
  eyebrow: "Próximo passo",
  title: "Pronto para tirar o projeto do papel?",
  description:
    "Conte onde você está hoje e receba uma sugestão objetiva do caminho mais curto até um site funcionando.",
  supportingText:
    "Resposta em até 1 dia útil. Sem compromisso e sem enrolação.",
  actions: [
    {
      label: "Solicitar orçamento",
      href: "mailto:contato@suaempresa.com",
      variant: "default",
    },
    {
      label: "Ver exemplos no blog",
      href: "/blog",
      variant: "outline",
    },
  ],
};

export default function CtaSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · CTA simples centralizado
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <CtaSimple />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · CTA split (texto + explicação)
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <CtaSplit />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · CTA banner
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <CtaBanner />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 04 · CTA split actions (painel de conversão)
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <CtaSplitActions {...ctaSplitActionsDemo} />
          </div>
        </div>
      </section>
    </div>
  );
}
