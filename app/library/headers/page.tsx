// app/library/headers/page.tsx
import type { Metadata } from "next";
import { HeaderBasic } from "@/components/site/headers/header-basic";
import { HeaderCentered } from "@/components/site/headers/header-centered";
import { HeaderWithTopbar } from "@/components/site/headers/header-with-topbar";

export const metadata: Metadata = {
  title: "Library · Headers",
  description: "Variações de cabeçalho para sites institucionais.",
};

type HeaderItem = {
  id: string;
  name: string;
  description: string;
  Component: React.ComponentType;
};

const headers: HeaderItem[] = [
  {
    id: "header-basic",
    name: "Header básico",
    description:
      "Logo à esquerda, navegação à direita e um botão de contato. Funciona bem para a maioria dos sites institucionais.",
    Component: HeaderBasic,
  },
  {
    id: "header-centered",
    name: "Header centralizado",
    description:
      "Marca centralizada e menu logo abaixo. Ideal para sites mais minimalistas ou com foco institucional.",
    Component: HeaderCentered,
  },
  {
    id: "header-with-topbar",
    name: "Header com topbar",
    description:
      "Faixa superior com telefone e e-mail, seguida do cabeçalho principal com navegação. Ótimo para escritórios e clínicas.",
    Component: HeaderWithTopbar,
  },
];

export default function HeadersLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Headers / Cabeçalhos
          </h1>
          <p className="text-sm text-muted-foreground">
            Exemplos de cabeçalhos prontos para reutilizar em sites institucionais.
            Você pode trocar apenas o logo, textos e links para adaptar a cada cliente.
          </p>
        </header>

        <section className="space-y-4">
          {headers.map(({ id, name, description, Component }) => (
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
                <Component />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
