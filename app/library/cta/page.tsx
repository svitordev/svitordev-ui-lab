// app/library/cta/page.tsx
import type { Metadata } from "next";
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { CtaSplit } from "@/components/sections/cta/cta-split";
import { CtaBanner } from "@/components/sections/cta/cta-banner";
import {
  CtaSplitActions,
  type CtaSplitActionsProps,
} from "@/components/sections/cta/cta-split-actions";

export const metadata: Metadata = {
  title: "Library · CTAs",
  description:
    "Chamadas para ação — simples, split, banner e painel de conversão.",
};

// Página heterogênea (split actions tem contrato próprio) — preview ReactNode
// preserva a tipagem real no local do JSX.
type CtaItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

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

const ctas: CtaItem[] = [
  {
    id: "cta-simple",
    name: "CTA simples centralizado",
    description: "Chamada direta ao centro, com botão de contato.",
    preview: <CtaSimple />,
  },
  {
    id: "cta-split",
    name: "CTA split (texto + explicação)",
    description: "Chamada e explicação lado a lado.",
    preview: <CtaSplit />,
  },
  {
    id: "cta-banner",
    name: "CTA banner",
    description: "Faixa de chamada para ação em largura total.",
    preview: <CtaBanner />,
  },
  {
    id: "cta-split-actions",
    name: "CTA split actions (painel de conversão)",
    description:
      "Coluna editorial + painel de conversão — contrato data-driven do Lab.",
    preview: <CtaSplitActions {...ctaSplitActionsDemo} />,
  },
];

export default function CtaLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            CTAs / Chamadas para ação
          </h1>
          <p className="text-sm text-muted-foreground">
            Chamadas para ação para landings. Os textos são de exemplo — troque
            pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {ctas.map(({ id, name, description, preview }) => (
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
