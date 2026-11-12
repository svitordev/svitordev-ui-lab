// app/library/breadcrumbs/page.tsx
// Evolução 033 — primitive Breadcrumbs. Página Server Component (sem estado,
// sem motion). Demonstração da semântica aprovada na T1: nav com aria-label,
// ol/li, aria-current="page" no item atual e separadores decorativos.
import type { Metadata } from "next";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Library · Breadcrumbs",
  description:
    "Navegação hierárquica semântica: landmark nav, lista ordenada, aria-current na página atual e separadores decorativos.",
};

type BreadcrumbsEntry = {
  id: string;
  name: string;
  description: string;
};

const breadcrumbsDemo: BreadcrumbsEntry[] = [
  {
    id: "breadcrumb",
    name: "Hierarquia simples (link + página atual)",
    description:
      "Caminho com um nível raiz como link e a página atual como texto com aria-current=\"page\". Separador decorativo, fora da árvore de acessibilidade.",
  },
  {
    id: "breadcrumb-aschild",
    name: "Hierarquia com três níveis (asChild + next/link)",
    description:
      "Mesmo primitive com asChild renderizando links nativos do App Router, provando o contrato de composição aprovado.",
  },
];

export default function BreadcrumbsLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Breadcrumbs / Migalhas
          </h1>
          <p className="text-sm text-muted-foreground">
            Navegação hierárquica semântica: landmark de navegação, lista
            ordenada, página atual marcada com aria-current e separadores
            decorativos.
          </p>
        </header>

        <section className="space-y-4">
          {breadcrumbsDemo.map(({ id, name, description }) => (
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
              <div className="overflow-hidden rounded-xl border bg-background p-4">
                {id === "breadcrumb" ? (
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/library">Library</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                ) : (
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/library">Library</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/blog">Blog</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
