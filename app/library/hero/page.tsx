// app/sections/hero/page.tsx
import { HeroPrimary } from "@/components/sections/hero/hero-primary";
import { HeroCenterCta } from "@/components/sections/hero/hero-center-cta";
import { HeroSteps } from "@/components/sections/hero/hero-steps";

export default function HeroSectionsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Cabeçalho da página de catálogo */}
      <div className="border-b bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Hero sections</h1>
            <p className="text-xs text-muted-foreground">
              Biblioteca de heros para suas landings. Importe o componente direto na página
              do cliente ou copie a estrutura e adapte.
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground">
            components/sections/hero/*.tsx
          </p>
        </div>
      </div>

      {/* Lista de variações */}
      <div className="space-y-10 pb-12">
        {/* Variante 01 */}
        <section>
          <div className="mx-auto max-w-6xl px-4 pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Variante 01 · Split layout (texto + preview)
            </p>
            <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
              <HeroPrimary />
            </div>
          </div>
        </section>

        {/* Variante 02 */}
        <section>
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Variante 02 · Centralizado com CTA
            </p>
            <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
              <HeroCenterCta />
            </div>
          </div>
        </section>

        {/* Variante 03 */}
        <section>
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Variante 03 · Hero com etapas do processo
            </p>
            <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
              <HeroSteps />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
