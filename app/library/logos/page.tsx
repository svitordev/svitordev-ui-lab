// app/library/logos/page.tsx
import type { Metadata } from "next";
import {
  LogosStrip,
  type LogosStripProps,
} from "@/components/sections/logos/logos-strip";

export const metadata: Metadata = {
  title: "Library · Logos",
  description: "Faixa de logos e prova social para sites institucionais.",
};

type LogosItem = {
  id: string;
  name: string;
  description: string;
  props: LogosStripProps;
};

const logos: LogosItem[] = [
  {
    id: "logos-strip",
    name: "Logos strip",
    description:
      "Faixa centralizada de marcas em wordmark tipográfico. Ideal para logo após o hero ou entre seções de uma landing page.",
    props: {
      title: "Empresas que confiam no nosso trabalho",
      items: [
        { name: "Nortec" },
        { name: "Vetor Lab" },
        { name: "Aurora Contábil" },
        { name: "Pinheiro & Lima" },
        { name: "Base Digital" },
        { name: "Grupo Horizonte" },
      ],
    },
  },
];

export default function LogosLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Logos / Prova social
          </h1>
          <p className="text-sm text-muted-foreground">
            Faixas de marcas e parceiros para reforçar credibilidade. Os nomes
            são wordmarks tipográficos — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {logos.map(({ id, name, description, props }) => (
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
                <LogosStrip {...props} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
