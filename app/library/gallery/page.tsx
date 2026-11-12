// app/library/gallery/page.tsx
// Evolução 034 — showcase oficial da section GalleryTabs. Server Component; o
// client boundary fica apenas no primitive Tabs consumido pela section.
// Conteúdo neutro e genérico; mídia são placeholders estruturais (padrão do
// projeto — nenhuma imagem real).
import type { Metadata } from "next";

import {
  GalleryTabs,
  type GallerySet,
} from "@/components/sections/gallery/gallery-tabs";

export const metadata: Metadata = {
  title: "Library · Gallery",
  description:
    "Grid de mídia data-driven com Tabs como parte funcional: conjuntos reais alternados pelo primitive da Evolução 029.",
};

type GalleryEntry = {
  id: string;
  name: string;
  description: string;
  sets: GallerySet[];
};

const galleryDemo: GalleryEntry[] = [
  {
    id: "gallery-tabs",
    name: "Gallery com três conjuntos (Tabs funcional)",
    description:
      "Cada aba alterna um conjunto real de itens do grid. Títulos e descrições vêm dos dados; a mídia é placeholder estrutural, coerente com a Library.",
    sets: [
      {
        id: "conjunto-a",
        label: "Conjunto A",
        items: [
          {
            id: "a-1",
            title: "Peça de destaque",
            description: "Primeiro item do conjunto, com título e descrição próprios.",
          },
          {
            id: "a-2",
            title: "Peça secundária",
            description: "Segundo item mantendo o mesmo grid e a mesma hierarquia.",
          },
          {
            id: "a-3",
            title: "Peça de apoio",
            description: "Terceiro item fechando o grid em três colunas no desktop.",
          },
        ],
      },
      {
        id: "conjunto-b",
        label: "Conjunto B",
        items: [
          {
            id: "b-1",
            title: "Outro conjunto, mesmos dados de contrato",
            description: "O conteúdo do painel acompanha a aba selecionada.",
          },
          {
            id: "b-2",
            title: "Item com descrição longa",
            description:
              "Texto maior para provar quebra de linha e espaçamento consistente entre cards.",
          },
        ],
      },
      {
        id: "conjunto-c",
        label: "Conjunto C",
        items: [
          {
            id: "c-1",
            title: "Item sem descrição",
          },
          {
            id: "c-2",
            title: "Item com descrição",
            description: "Renderização condicional de descrição conforme o contrato.",
          },
        ],
      },
    ],
  },
];

export default function GalleryLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Gallery / Galeria
          </h1>
          <p className="text-sm text-muted-foreground">
            Grid de mídia data-driven usando o primitive Tabs como parte
            funcional: cada aba alterna um conjunto real de itens.
          </p>
        </header>

        <section className="space-y-4">
          {galleryDemo.map(({ id, name, description, sets }) => (
            <div
              key={name}
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
                <GalleryTabs
                  eyebrow="Vitrine"
                  title="Projetos em destaque"
                  description="Conjuntos alternados por abas — teclado e clique pelo Radix."
                  sets={sets}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
