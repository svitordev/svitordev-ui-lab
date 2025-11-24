// app/library/footers/page.tsx
import type { Metadata } from "next";
import { FooterSimple } from "@/components/site/footers/footer-simple";
import { FooterColumns } from "@/components/site/footers/footer-columns";
import { FooterCta } from "@/components/site/footers/footer-cta";

export const metadata: Metadata = {
  title: "Library · Footers",
  description: "Variações de rodapé para sites institucionais.",
};

type FooterItem = {
  id: string;
  name: string;
  description: string;
  Component: React.ComponentType;
};

const footers: FooterItem[] = [
  {
    id: "footer-simple",
    name: "Footer simples",
    description:
      "Linha única com direitos reservados e uma frase complementar. Ideal para sites mais enxutos.",
    Component: FooterSimple,
  },
  {
    id: "footer-columns",
    name: "Footer em colunas",
    description:
      "Três colunas para sobre, navegação e contato. Ótimo para escritórios e empresas com mais informações fixas.",
    Component: FooterColumns,
  },
  {
    id: "footer-cta",
    name: "Footer com CTA",
    description:
      "Bloco de chamada para ação acima da linha de direitos reservados. Bom para incentivar contato direto.",
    Component: FooterCta,
  },
];

export default function FootersLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Footers / Rodapés
          </h1>
          <p className="text-sm text-muted-foreground">
            Exemplos de rodapés prontos para reutilizar em sites institucionais.
            Basta ajustar textos, dados de contato e links para cada projeto.
          </p>
        </header>

        <section className="space-y-4">
          {footers.map(({ id, name, description, Component }) => (
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
