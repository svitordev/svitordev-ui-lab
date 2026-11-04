// app/library/newsletter/page.tsx
import type { Metadata } from "next";
import { NewsletterDemo } from "./newsletter-demo";

export const metadata: Metadata = {
  title: "Library · Newsletter",
  description:
    "Formulário de inscrição com estados reais de envio, feedback acessível e retry.",
};

export default function NewsletterLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Newsletter / Inscrição
          </h1>
          <p className="text-sm text-muted-foreground">
            Formulário de captação com estados reais (envio, sucesso, erro) e
            feedback acessível. O envio é decidido pelo consumer via callback —
            a demo usa um handler local determinístico.
          </p>
        </header>

        <section className="space-y-4">
          <div className="space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold">Newsletter form</h2>
                <p className="text-xs text-muted-foreground">
                  Campo de e-mail com label real, validação nativa e região de
                  status para sucesso/erro. Para exercitar o estado de erro na
                  demo, use um e-mail iniciado por{" "}
                  <code className="font-mono text-[10px]">erro@exemplo.com</code>.
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Componente:{" "}
                <code className="font-mono text-[10px]">newsletter-form</code>
              </p>
            </div>

            {/* Preview */}
            <div className="overflow-hidden rounded-xl border bg-background">
              <NewsletterDemo />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
