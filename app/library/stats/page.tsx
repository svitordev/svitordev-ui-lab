// app/library/stats/page.tsx
import type { Metadata } from "next";
import {
  StatsGrid,
  type StatsGridProps,
} from "@/components/sections/stats/stats-grid";

export const metadata: Metadata = {
  title: "Library · Stats",
  description: "Números de destaque e métricas de credibilidade para landings.",
};

type StatsItem = {
  id: string;
  name: string;
  description: string;
  props: StatsGridProps;
};

const stats: StatsItem[] = [
  {
    id: "stats-grid",
    name: "Stats grid",
    description:
      "Grade de números de destaque com badge de contexto. Ideal entre hero e serviços, ou como prova social de resultados.",
    props: {
      eyebrow: "Resultados",
      title: "Números que mostram o impacto do trabalho.",
      description:
        "Troque os valores abaixo pelas métricas do seu projeto — o layout se ajusta a partir de 4 itens.",
      items: [
        { value: "+120", label: "clientes atendidos" },
        { value: "98%", label: "satisfação" },
        { value: "24h", label: "tempo de resposta" },
        { value: "R$ 2 mi", label: "em projetos gerados" },
      ],
    },
  },
];

export default function StatsLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Stats / Métricas
          </h1>
          <p className="text-sm text-muted-foreground">
            Números de destaque para reforçar credibilidade. Os valores são de
            exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {stats.map(({ id, name, description, props }) => (
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
                <StatsGrid {...props} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
