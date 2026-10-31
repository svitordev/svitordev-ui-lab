// app/library/features/page.tsx
import type { Metadata } from "next";
import {
  FeatureComparison,
  type FeatureComparisonProps,
} from "@/components/sections/features/feature-comparison";

export const metadata: Metadata = {
  title: "Library · Features",
  description:
    "Tabela comparativa de recursos entre opções (planos, pacotes, modalidades).",
};

type FeaturesItem = {
  id: string;
  name: string;
  description: string;
  props: FeatureComparisonProps;
};

const features: FeaturesItem[] = [
  {
    id: "feature-comparison",
    name: "Feature comparison",
    description:
      "Matriz de recursos entre opções. Cada linha é um recurso, cada coluna uma opção; valores booleanos viram ícones acessíveis e valores textuais aparecem como dados.",
    props: {
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
    },
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
          {features.map(({ id, name, description, props }) => (
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
                <FeatureComparison {...props} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
