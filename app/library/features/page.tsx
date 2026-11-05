// app/library/features/page.tsx
import type { Metadata } from "next";
import {
  FeatureComparison,
  type FeatureComparisonProps,
} from "@/components/sections/features/feature-comparison";
import {
  StickyColumnSplit,
  type StickyColumnSplitProps,
} from "@/components/sections/features/sticky-column-split";

export const metadata: Metadata = {
  title: "Library · Features",
  description:
    "Tabela comparativa de recursos entre opções (planos, pacotes, modalidades).",
};

// Página heterogênea (contratos diferentes por componente) — preview ReactNode
// preserva a tipagem real no local do JSX.
type FeaturesItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

const featureComparisonDemo: FeatureComparisonProps = {
      eyebrow: "Comparação",
      title: "Compare o que cada opção oferece.",
      description:
        "A mesma estrutura serve para planos, pacotes ou modalidades — os dados vêm de fora.",
  options: [
    { id: "essencial", label: "Essencial" },
    { id: "profissional", label: "Profissional" },
    { id: "completo", label: "Completo" },
  ],
  features: [
    {
      label: "Projetos ativos",
      values: { essencial: "3", profissional: "10", completo: "Ilimitado" },
    },
    {
      label: "Armazenamento",
      values: { essencial: "5 GB", profissional: "50 GB", completo: "500 GB" },
    },
    {
      label: "Suporte",
      values: { essencial: false, profissional: true, completo: true },
    },
    {
      // "essencial" ausente de propósito: demonstra o estado "Não informado".
      label: "Relatórios",
      values: { profissional: true, completo: true },
    },
    {
      label: "Relatórios mensais detalhados em PDF",
      values: { essencial: false, profissional: false, completo: true },
    },
  ],
};

const stickyColumnSplitDemo: StickyColumnSplitProps = {
  eyebrow: "Fluxo de trabalho",
  title: "Contexto sempre visível",
  description:
    "Mantenha a mensagem principal em vista enquanto os detalhes avançam ao lado.",
  items: [
    {
      title: "Planejamento",
      description:
        "Defina escopo, referências e o que precisa ser decidido antes de montar qualquer tela. É o passo que evita retrabalho depois.",
    },
    {
      title: "Componentes",
      description:
        "Monte a página a partir de peças independentes, cada uma com seu próprio contrato de dados — sem conteúdo preso dentro do componente.",
    },
    {
      title: "Responsividade",
      description:
        "A mesma composição precisa funcionar em viewport estreito e largo sem duplicar conteúdo nem esconder informação essencial.",
    },
    {
      title: "Acessibilidade",
      description:
        "HTML semântico, foco visível e navegação por teclado fazem parte da entrega, não são um extra opcional do template.",
    },
    {
      title: "Validação",
      description:
        "Cada evolução é verificada em browser real: layout, teclado, reduced motion e overflow, nas duas resoluções de referência.",
    },
    {
      title: "Entrega",
      description:
        "O resultado é um projeto base pronto para receber identidade visual e conteúdo reais, sem refatoração estrutural.",
    },
  ],
};

// Conteúdo demo-only — existe só para permitir rolar além da section e observar
// o fim do containing block do sticky. Não pertence ao componente nem ao contrato.
const stickyColumnDemoContinuation = [
  "Continuação da demonstração — conteúdo fora da section.",
  "A coluna sticky é liberada quando o containing block dela termina.",
  "A partir deste ponto, a coluna editorial acompanha o scroll normalmente.",
  "Este bloco não faz parte do componente — é apenas contexto de demonstração.",
  "Role até aqui para confirmar o comportamento de fim de section.",
  "Em um projeto real, este seria o conteúdo seguinte da página.",
  "O espaço abaixo garante margem de scroll além da section demonstrada.",
  "Sem ele, o fim do container coincidiria com o fim da section e o boundary",
  "não poderia ser observado separadamente do fim do scroll.",
  "Cada linha existe apenas para dar altura observável a esta demonstração.",
  "Nenhum componente novo foi criado para ocupar este espaço.",
  "Ao chegar aqui, a coluna editorial já deve ter sido empurrada para cima.",
];

const features: FeaturesItem[] = [
  {
    id: "feature-comparison",
    name: "Feature comparison",
    description:
      "Matriz de recursos entre opções. Cada linha é um recurso, cada coluna uma opção; valores booleanos viram ícones acessíveis e valores textuais aparecem como dados.",
    preview: <FeatureComparison {...featureComparisonDemo} />,
  },
  {
    id: "sticky-column-split",
    name: "Sticky column split (coluna fixa em desktop)",
    description:
      "Coluna editorial sticky em desktop ao lado de uma lista longa; no mobile empilha em fluxo normal. Scroll container próprio para demonstrar o comportamento.",
    preview: (
      <div className="h-[420px] overflow-y-auto">
        <StickyColumnSplit {...stickyColumnSplitDemo} />
        <div className="space-y-2 px-4 py-6 text-xs text-muted-foreground">
          {stickyColumnDemoContinuation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    ),
  },
];

export default function FeaturesLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Features / Comparação
          </h1>
          <p className="text-sm text-muted-foreground">
            Tabelas comparativas de recursos entre planos, pacotes ou
            modalidades. Os dados são de exemplo — troque pelos dados do seu
            projeto.
          </p>
        </header>

        <section className="space-y-4">
          {features.map(({ id, name, description, preview }) => (
            <div
              key={id}
              className="space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-base font-semibold">{name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {description}
                  </p>
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
