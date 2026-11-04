// app/library/about/page.tsx
import type { Metadata } from "next";
import { AboutSimple } from "@/components/sections/about/about-simple";
import { AboutSplit } from "@/components/sections/about/about-split";
import { AboutTimeline } from "@/components/sections/about/about-timeline";

export const metadata: Metadata = {
  title: "Library · About",
  description: "Seções sobre a empresa — simples, em duas colunas e timeline.",
};

type AboutItem = {
  id: string;
  name: string;
  description: string;
  Component: React.ComponentType;
};

const abouts: AboutItem[] = [
  {
    id: "about-simple",
    name: "About simples",
    description: "Bloco direto sobre a empresa, sem distrações.",
    Component: AboutSimple,
  },
  {
    id: "about-split",
    name: "About em duas colunas",
    description: "Texto e destaque lado a lado em telas grandes.",
    Component: AboutSplit,
  },
  {
    id: "about-timeline",
    name: "Timeline / trajetória",
    description: "Linha do tempo da empresa em etapas.",
    Component: AboutTimeline,
  },
];

export default function AboutLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            About / Sobre
          </h1>
          <p className="text-sm text-muted-foreground">
            Seções sobre a empresa para páginas institucionais. Os textos são de
            exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {abouts.map(({ id, name, description, Component }) => (
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
                <Component />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
