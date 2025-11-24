// app/library/pricing/page.tsx
import { PricingThreeTiers } from "@/components/sections/pricing/pricing-three-tiers";
import { PricingHighlight } from "@/components/sections/pricing/pricing-highlight";
import { PricingSimpleCards } from "@/components/sections/pricing/pricing-simple-cards";

export default function PricingSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · Três planos
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingThreeTiers />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · Plano sob medida destacado
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingHighlight />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Projeto x Projeto + manutenção
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <PricingSimpleCards />
          </div>
        </div>
      </section>
    </div>
  );
}
