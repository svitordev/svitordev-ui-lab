// app/library/services/page.tsx
import type { Metadata } from "next";
import { ServicesGridSimple } from "@/components/sections/services/services-grid-simple";
import { ServicesWithIcons } from "@/components/sections/services/services-with-icons";
import { ServicesSplitWithHighlight } from "@/components/sections/services/services-split-with-highlight";

export const metadata: Metadata = {
  title: "Library · Services",
  description:
    "Seções de serviços — grid, cards com ícones e destaque com lista.",
};

type ServicesItem = {
  id: string;
  name: string;
  description: string;
  Component: React.ComponentType;
};

const services: ServicesItem[] = [
  {
    id: "services-grid-simple",
    name: "Grid simples",
    description: "Grade de serviços em cards iguais.",
    Component: ServicesGridSimple,
  },
  {
    id: "services-with-icons",
    name: "Cards com ícones",
    description: "Cards de serviço com ícone de destaque.",
    Component: ServicesWithIcons,
  },
  {
    id: "services-split-with-highlight",
    name: "Serviço principal + lista",
    description: "Um serviço em destaque com os demais listados ao lado.",
    Component: ServicesSplitWithHighlight,
  },
];

export default function ServicesLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Services / Serviços
          </h1>
          <p className="text-sm text-muted-foreground">
            Seções de serviços para landings e sites institucionais. Os textos
            são de exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {services.map(({ id, name, description, Component }) => (
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
