// app/library/tabs/page.tsx
// Evolução 029 — primitive Tabs (Radix). Página Server Component; o client
// boundary fica apenas no primitive. Demo com conteúdo neutro e estável
// (3 tabs suficientes para provar o primitive); a Gallery (034) não é
// antecipada aqui.
import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Library · Tabs",
  description:
    "Abas acessíveis via Radix: teclado, foco e estados ARIA nativos, estilizadas com os tokens do projeto.",
};

type TabsEntry = {
  id: string;
  name: string;
  description: string;
  tabs: { value: string; label: string; content: string }[];
};

const tabsDemo: TabsEntry[] = [
  {
    id: "tabs",
    name: "Tabs com conteúdo neutro",
    description:
      "Abas com seleção por clique e teclado (setas, Home, End). O painel acompanha a seleção; a semântica ARIA é a nativa do Radix.",
    tabs: [
      {
        value: "visao-geral",
        label: "Visão geral",
        content: "Resumo do conteúdo em destaque nesta área do template.",
      },
      {
        value: "recursos",
        label: "Recursos",
        content: "Lista neutra de recursos disponíveis para o seu projeto.",
      },
      {
        value: "detalhes",
        label: "Detalhes",
        content: "Informações complementares, estáveis e independentes de dados.",
      },
    ],
  },
];

export default function TabsLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Tabs / Abas
          </h1>
          <p className="text-sm text-muted-foreground">
            Abas acessíveis baseadas em Radix: navegação por teclado, foco e
            estados ARIA nativos, com visual construído apenas sobre os tokens
            do projeto.
          </p>
        </header>

        <section className="space-y-4">
          {tabsDemo.map(({ id, name, description, tabs }) => (
            <div
              key={name}
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
              <div className="overflow-hidden rounded-xl border bg-background p-4">
                <Tabs defaultValue={tabs[0].value}>
                  <TabsList>
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                      {tab.content}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
