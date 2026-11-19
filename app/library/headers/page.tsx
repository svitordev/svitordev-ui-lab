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
  preview: React.ReactNode;
};

const headers: HeaderItem[] = [
  {
    id: "header-basic",
    name: "Header básico",
    description:
      "Logo à esquerda, navegação à direita e um botão de contato. Funciona bem para a maioria dos sites institucionais.",
    preview: (
      <HeaderBasic
        brand={{ prefix: "Sua", suffix: "Empresa" }}
        navItems={[
          { href: "/", label: "Início" },
          { href: "/#services", label: "Serviços" },
          { href: "/#about", label: "Sobre" },
          { href: "/#contact", label: "Contato" },
        ]}
        action={{ label: "Entrar em contato", href: "/#contact" }}
      />
    ),
  },
  {
    id: "header-centered",
    name: "Header centralizado",
    description:
      "Marca centralizada e menu logo abaixo. Ideal para sites mais minimalistas ou com foco institucional.",
    preview: (
      <HeaderCentered
        brand={{ prefix: "Sua", suffix: "Empresa" }}
        navItems={[
          { href: "/", label: "Início" },
          { href: "/#services", label: "Serviços" },
          { href: "/#about", label: "Sobre" },
          { href: "/blog", label: "Blog" },
          { href: "/#contact", label: "Contato" },
        ]}
      />
    ),
  },
  {
    id: "header-with-topbar",
    name: "Header com topbar",
    description:
      "Faixa superior com telefone e e-mail, seguida do cabeçalho principal com navegação. Ótimo para escritórios e clínicas.",
    preview: (
      <HeaderWithTopbar
        brand={{ prefix: "Sua", suffix: "Empresa" }}
        navItems={[
          { href: "/", label: "Início" },
          { href: "/#services", label: "Serviços" },
          { href: "/#about", label: "Sobre" },
          { href: "/blog", label: "Blog" },
          { href: "/#contact", label: "Contato" },
        ]}
        topbar={{
          phone: "(00) 00000-0000",
          email: "contato@suaempresa.com",
          note: "Atendimento em horário comercial ou conforme a política da empresa.",
        }}
      />
    ),
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
          {headers.map(({ id, name, description, preview }) => (
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
