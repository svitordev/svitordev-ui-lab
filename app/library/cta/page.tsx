// app/library/cta/page.tsx
import type { Metadata } from "next";
import { CtaSimple } from "@/components/sections/cta/cta-simple";
import { CtaSplit } from "@/components/sections/cta/cta-split";
import { CtaBanner } from "@/components/sections/cta/cta-banner";
import {
  CtaSplitActions,
  type CtaSplitActionsProps,
} from "@/components/sections/cta/cta-split-actions";
import {
  StickyCtaBar,
  type StickyCtaBarProps,
} from "@/components/sections/cta/sticky-cta-bar";

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

const stickyCtaBarDemo: StickyCtaBarProps = {
  title: "Pronto para usar no próximo projeto?",
  description:
    "Combine as seções da biblioteca e adapte o conteúdo ao seu produto.",
  actions: [
    {
      label: "Explorar componentes",
      href: "/library/headers",
      variant: "default",
    },
    {
      label: "Falar com a equipe",
      href: "mailto:contato@suaempresa.com",
      variant: "outline",
    },
  ],
};

// Filler da demo — gera scroll real no container para observar o comportamento
// sticky. Vive só na página; não faz parte do contrato do componente.
const stickyBarDemoFiller = [
  "Conteúdo de exemplo — role este container para ver a barra permanecer presa ao fundo.",
  "O espaço acima representa a página real onde a barra seria usada.",
  "A barra acompanha o scroll e sai de cena quando este container termina.",
  "Nenhuma linha aqui pertence ao componente — é apenas contexto de demonstração.",
  "Role mais um pouco e observe a geometria da barra em relação ao container.",
  "O comportamento sticky é CSS puro, sem JavaScript.",
  "Em um projeto real, este seria o conteúdo editorial da página.",
  "Continue rolando — a barra continua visível no fundo do container.",
  "Quase no final do container de demonstração.",
  "Mais uma linha de contexto — em desktop o texto não quebra, então o filler precisa de volume suficiente para gerar scroll real em qualquer viewport.",
  "Cada linha é apenas espaço ocupado: o objetivo é garantir scrollHeight maior que a altura visível do container.",
  "A barra continua no fundo do container enquanto houver conteúdo abaixo dela.",
  "Nenhum spacer artificial foi adicionado ao componente — a altura é da demo.",
  "Continue rolando — o comportamento observado aqui é o mesmo de uma página real.",
  "Ao chegar aqui, a barra atinge sua posição natural no fim do conteúdo.",
];

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
  {
    id: "sticky-cta-bar",
    name: "Sticky CTA bar (barra persistente)",
    description:
      "Barra compacta que permanece presa ao fundo do seu scroll container — CSS puro, sem JS.",
    preview: (
      <div className="h-[420px] overflow-y-auto">
        <div className="space-y-3 px-4 py-6 text-xs text-muted-foreground">
          {stickyBarDemoFiller.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <StickyCtaBar {...stickyCtaBarDemo} />
      </div>
    ),
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
